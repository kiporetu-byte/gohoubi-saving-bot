/*
  Warnings:

  - Made the column `lineEventId` on table `Saving` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Saving" ALTER COLUMN "lineEventId" SET NOT NULL;
