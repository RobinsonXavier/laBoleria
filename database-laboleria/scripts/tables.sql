CREATE DATABASE "laBoleriadb";

----------------------------------------------------

CREATE TABLE "flavours" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE "cakes" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) UNIQUE NOT NULL,
	"price" NUMERIC NOT NULL,
	"image" VARCHAR(200) NOT NULL,
	"description" TEXT NOT NULL
);

-- update from table

ALTER TABLE "cakes"
ADD COLUMN "flavourId" INTEGER REFERENCES "flavours"("id") NOT NULL;

CREATE TABLE "clients" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"address" VARCHAR(150) NOT NULL,
	"phone" VARCHAR(11) UNIQUE NOT NULL
);

CREATE TABLE "orders" (
	"id" SERIAL PRIMARY KEY,
	"clientId" INTEGER NOT NULL,
	"cakeId" INTEGER NOT NULL,
	"quantity" INTEGER NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"totalPrice" NUMERIC NOT NULL
);
