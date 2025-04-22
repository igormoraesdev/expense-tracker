CREATE TABLE "plans" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"price" varchar NOT NULL,
	"price_id" varchar NOT NULL,
	"description" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
