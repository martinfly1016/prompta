-- Add expiresAt to PaidCredits + backfill existing rows
ALTER TABLE "PaidCredits" ADD COLUMN "expiresAt" TIMESTAMP(3);

-- Backfill: every existing wallet gets fresh 12 months from rollout date
-- (rather than retroactive based on createdAt) — keeps existing users
-- whole and matches the user-facing "12 ヶ月有効" promise applied from now.
UPDATE "PaidCredits"
SET "expiresAt" = NOW() + INTERVAL '12 months'
WHERE "expiresAt" IS NULL AND "balance" > 0;
