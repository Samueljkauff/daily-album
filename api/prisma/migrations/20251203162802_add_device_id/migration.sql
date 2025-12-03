/*
  Warnings:

  - You are about to drop the column `userId` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[device_id]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `device_id` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "userId",
ADD COLUMN     "device_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Token_device_id_key" ON "Token"("device_id");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("spotify_id") ON DELETE RESTRICT ON UPDATE CASCADE;
