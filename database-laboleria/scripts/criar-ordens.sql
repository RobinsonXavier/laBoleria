CREATE TABLE "orders" (
	"id" SERIAL PRIMARY KEY,
	"clientId" INTEGER NOT NULL,
	"cakeId" INTEGER NOT NULL,
	"quantity" INTEGER NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"totalPrice" NUMERIC NOT NULL
);