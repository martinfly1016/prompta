-- Restructure V2: Add Tool, Tag, ToolCategory, PromptImage, Guide models
-- and update Category/Prompt with new fields.
-- This migration was created after `prisma db push` already applied the changes.

-- CreateTable (if not exists)
CREATE TABLE IF NOT EXISTS "Tool" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameJa" TEXT,
    "description" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ToolCategory" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "ToolCategory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'blue',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "_PromptTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "PromptImage" (
    "id" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "blobKey" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "imageType" TEXT NOT NULL DEFAULT 'effect',
    "order" INTEGER NOT NULL DEFAULT 0,
    "altText" TEXT,
    "parentImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PromptImage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Guide" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL,
    "targetKeyword" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- Add new columns to Category (idempotent with DO blocks)
DO $$ BEGIN
  ALTER TABLE "Category" ADD COLUMN "nameEn" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Category" ADD COLUMN "description" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Category" ADD COLUMN "icon" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Category" ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Category" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- Add new columns to Prompt
DO $$ BEGIN
  ALTER TABLE "Prompt" ADD COLUMN "slug" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Prompt" ADD COLUMN "toolId" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Prompt" ADD COLUMN "seoTitle" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Prompt" ADD COLUMN "seoDescription" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Prompt" ADD COLUMN "author" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Prompt" ADD COLUMN "difficulty" TEXT DEFAULT 'beginner';
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Prompt" ADD COLUMN "isFeatured" BOOLEAN NOT NULL DEFAULT false;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Prompt" ADD COLUMN "sourceUrl" TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Prompt" ADD COLUMN "isAutoCollected" BOOLEAN NOT NULL DEFAULT false;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- Unique indexes (idempotent)
CREATE UNIQUE INDEX IF NOT EXISTS "Tool_slug_key" ON "Tool"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "ToolCategory_toolId_categoryId_key" ON "ToolCategory"("toolId", "categoryId");
CREATE UNIQUE INDEX IF NOT EXISTS "Tag_name_key" ON "Tag"("name");
CREATE UNIQUE INDEX IF NOT EXISTS "Tag_slug_key" ON "Tag"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Prompt_slug_key" ON "Prompt"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Guide_slug_key" ON "Guide"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "_PromptTags_AB_unique" ON "_PromptTags"("A", "B");

-- Regular indexes (idempotent)
CREATE INDEX IF NOT EXISTS "Tool_slug_idx" ON "Tool"("slug");
CREATE INDEX IF NOT EXISTS "ToolCategory_toolId_idx" ON "ToolCategory"("toolId");
CREATE INDEX IF NOT EXISTS "ToolCategory_categoryId_idx" ON "ToolCategory"("categoryId");
CREATE INDEX IF NOT EXISTS "Tag_slug_idx" ON "Tag"("slug");
CREATE INDEX IF NOT EXISTS "Category_slug_idx" ON "Category"("slug");
CREATE INDEX IF NOT EXISTS "Prompt_categoryId_idx" ON "Prompt"("categoryId");
CREATE INDEX IF NOT EXISTS "Prompt_toolId_idx" ON "Prompt"("toolId");
CREATE INDEX IF NOT EXISTS "Prompt_isPublished_idx" ON "Prompt"("isPublished");
CREATE INDEX IF NOT EXISTS "Prompt_isFeatured_idx" ON "Prompt"("isFeatured");
CREATE INDEX IF NOT EXISTS "Prompt_slug_idx" ON "Prompt"("slug");
CREATE INDEX IF NOT EXISTS "PromptImage_promptId_idx" ON "PromptImage"("promptId");
CREATE INDEX IF NOT EXISTS "PromptImage_order_idx" ON "PromptImage"("order");
CREATE INDEX IF NOT EXISTS "PromptImage_imageType_idx" ON "PromptImage"("imageType");
CREATE INDEX IF NOT EXISTS "PromptImage_parentImageId_idx" ON "PromptImage"("parentImageId");
CREATE INDEX IF NOT EXISTS "Guide_slug_idx" ON "Guide"("slug");
CREATE INDEX IF NOT EXISTS "Guide_isPublished_idx" ON "Guide"("isPublished");
CREATE INDEX IF NOT EXISTS "_PromptTags_B_index" ON "_PromptTags"("B");

-- Foreign keys (idempotent)
DO $$ BEGIN
  ALTER TABLE "ToolCategory" ADD CONSTRAINT "ToolCategory_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "ToolCategory" ADD CONSTRAINT "ToolCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "PromptImage" ADD CONSTRAINT "PromptImage_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "PromptImage" ADD CONSTRAINT "PromptImage_parentImageId_fkey" FOREIGN KEY ("parentImageId") REFERENCES "PromptImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "Guide" ADD CONSTRAINT "Guide_pkey" PRIMARY KEY ("id");
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "_PromptTags" ADD CONSTRAINT "_PromptTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "_PromptTags" ADD CONSTRAINT "_PromptTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
