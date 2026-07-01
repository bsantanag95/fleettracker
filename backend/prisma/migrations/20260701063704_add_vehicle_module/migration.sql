/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `latitude` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Vehicle` table. All the data in the column will be lost.
  - The `status` column on the `Vehicle` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `Alert` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `brand` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastCommunication` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastLatitude` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastLongitude` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'OPERATOR');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('MOVING', 'STOPPED', 'OFFLINE');

-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('OVERSPEED', 'OFFLINE', 'GEOFENCE');

-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "type",
ADD COLUMN     "type" "AlertType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'OPERATOR';

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastCommunication" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastLatitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lastLongitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "year" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "VehicleStatus" NOT NULL DEFAULT 'STOPPED',
ALTER COLUMN "speed" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Telemetry" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "speed" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "Telemetry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telemetry" ADD CONSTRAINT "Telemetry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
