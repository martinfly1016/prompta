-- AlterTable
ALTER TABLE "PromptImage" ADD COLUMN "imageType" TEXT NOT NULL DEFAULT 'effect',
ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "parentImageId" TEXT;

-- CreateIndex
CREATE INDEX "PromptImage_order_idx" ON "PromptImage"("order");

-- CreateIndex
CREATE INDEX "PromptImage_imageType_idx" ON "PromptImage"("imageType");

-- CreateIndex
CREATE INDEX "PromptImage_parentImageId_idx" ON "PromptImage"("parentImageId");

-- AddForeignKey
ALTER TABLE "PromptImage" ADD CONSTRAINT "PromptImage_parentImageId_fkey" FOREIGN KEY ("parentImageId") REFERENCES "PromptImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
