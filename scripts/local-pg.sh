#!/bin/bash
# Local Postgres lifecycle for staging tests.
#
# Setup is in .local-pg/ (gitignored). Listens on 127.0.0.1:5433 to avoid
# clashing with anything on the default 5432. The staging connection
# string is exported as STAGING_DATABASE_URL — paste it into .env.local
# (or pass it directly to scripts) when running webhook tests so they
# never touch prod Railway data.
#
# Usage:
#   ./scripts/local-pg.sh start     # start the server
#   ./scripts/local-pg.sh stop      # stop the server
#   ./scripts/local-pg.sh status    # is it running?
#   ./scripts/local-pg.sh url       # print the DATABASE_URL
#   ./scripts/local-pg.sh psql      # interactive psql shell
#   ./scripts/local-pg.sh reset     # drop + recreate schema (CAREFUL)

set -euo pipefail

PG_BIN=/opt/homebrew/opt/postgresql@16/bin
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DATA_DIR="$PROJECT_ROOT/.local-pg/data"
LOG_FILE="$PROJECT_ROOT/.local-pg/server.log"
PORT=5433
DB=prompta_staging
URL="postgresql://postgres@127.0.0.1:$PORT/$DB"

CMD=${1:-help}

case "$CMD" in
  start)
    if [ ! -d "$DATA_DIR" ]; then
      echo "Data dir missing — running initdb"
      LC_ALL=C "$PG_BIN/initdb" -D "$DATA_DIR" --auth-host=trust --auth-local=trust --username=postgres -E UTF8 --locale=C
    fi
    if LC_ALL=C "$PG_BIN/pg_isready" -h 127.0.0.1 -p $PORT >/dev/null 2>&1; then
      echo "Postgres already running on :$PORT"
    else
      LC_ALL=C "$PG_BIN/pg_ctl" -D "$DATA_DIR" -l "$LOG_FILE" -o "-p $PORT" start
      sleep 1
      if ! "$PG_BIN/psql" -h 127.0.0.1 -p $PORT -U postgres -lqt | cut -d '|' -f 1 | grep -qw "$DB"; then
        "$PG_BIN/createdb" -h 127.0.0.1 -p $PORT -U postgres "$DB"
        echo "Created database: $DB"
      fi
    fi
    echo "DATABASE_URL=$URL"
    ;;

  stop)
    LC_ALL=C "$PG_BIN/pg_ctl" -D "$DATA_DIR" stop -m fast 2>&1 | tail -3
    ;;

  status)
    LC_ALL=C "$PG_BIN/pg_isready" -h 127.0.0.1 -p $PORT
    ;;

  url)
    echo "$URL"
    ;;

  psql)
    "$PG_BIN/psql" -h 127.0.0.1 -p $PORT -U postgres -d "$DB"
    ;;

  reset)
    "$PG_BIN/psql" -h 127.0.0.1 -p $PORT -U postgres -d "$DB" \
      -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
    DATABASE_URL="$URL" npx prisma db push --accept-data-loss --skip-generate
    echo "Reset complete: $DB"
    ;;

  *)
    cat <<EOF
Local Postgres for staging tests (port $PORT, db $DB)

  $0 start      # start server, create db if missing
  $0 stop       # graceful shutdown
  $0 status     # health check
  $0 url        # print DATABASE_URL
  $0 psql       # interactive shell
  $0 reset      # drop + recreate schema (CAREFUL)

Connection string: $URL

Tip: paste this into .env.local as STAGING_DATABASE_URL=... so the dev
server can opt-in to the staging DB instead of prod when you set
DATABASE_URL=\$STAGING_DATABASE_URL before running 'next dev'.
EOF
    ;;
esac
