-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('debito', 'credito', 'ambos');

-- CreateTable
CREATE TABLE "credentials" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "secure_notes" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "anotation" TEXT NOT NULL,

    CONSTRAINT "secure_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "number" VARCHAR(255) NOT NULL,
    "cvc" VARCHAR(255) NOT NULL,
    "expiration_date" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "is_virtual" BOOLEAN NOT NULL,
    "type" "CardType" NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wifis" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "network" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "wifis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_owner_id_name_key" ON "credentials"("owner_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "secure_notes_owner_id_title_key" ON "secure_notes"("owner_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "cards_owner_id_name_key" ON "cards"("owner_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "wifis_owner_id_name_key" ON "wifis"("owner_id", "name");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secure_notes" ADD CONSTRAINT "secure_notes_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wifis" ADD CONSTRAINT "wifis_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
