-- Enable the pggen extension
CREATE EXTENSION IF NOT EXISTS pggen;

-- Generating 10 captions
WITH captions AS (
  SELECT 
    uuid_generate_v4() AS uuid,
    pggen.lorem(5, 'paragraphs') AS text,
    "Users".uuid AS user_id,
    "Photos".uuid AS photo_id,
    now() AS createdAt,
    now() AS updatedAt
  FROM "Users"
  JOIN "Photos" ON "Photos".user_id = "Users".uuid
  CROSS JOIN generate_series(1, 10)
)
-- Inserting captions into "Captions" table
INSERT INTO "Captions" (uuid, text, user_id, photo_id, createdAt, updatedAt)
SELECT uuid, text, user_id, photo_id, createdAt, updatedAt FROM captions;


SELECT * FROM "Captions";
