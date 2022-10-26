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
