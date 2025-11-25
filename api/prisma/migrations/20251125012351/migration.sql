/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refresh_token]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `access_token` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_in` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Token_refreshToken_key";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "accessToken",
DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "ipAddress",
DROP COLUMN "refreshToken",
DROP COLUMN "userAgent",
ADD COLUMN     "access_token" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ip_address" TEXT,
ADD COLUMN     "refresh_token" TEXT NOT NULL,
ADD COLUMN     "user_agent" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Token_refresh_token_key" ON "Token"("refresh_token");
