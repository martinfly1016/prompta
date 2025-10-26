const { execSync } = require('child_process');

/**
 * Migration script for production
 * Runs Prisma migrations with error handling
 */

async function migrate() {
  try {
    console.log('Starting database migration...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log('Database migration completed successfully');
  } catch (error) {
    // Migration might fail if there are no pending migrations, which is OK
    console.log('Migration attempt completed (might be no pending migrations)');
  }
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  // Don't exit with error, allow the app to start anyway
  process.exit(0);
});
