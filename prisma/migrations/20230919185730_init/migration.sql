-- CreateEnum
CREATE TYPE "GearBoxes" AS ENUM ('MANUAL', 'AUTOMATIC', 'OTHER');

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "VIN" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model_details" TEXT NOT NULL,
    "gear_box_type" "GearBoxes" NOT NULL,
    "color" TEXT NOT NULL,
    "mielage" DOUBLE PRECISION NOT NULL,
    "first_registration_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_VIN_key" ON "Car"("VIN");
