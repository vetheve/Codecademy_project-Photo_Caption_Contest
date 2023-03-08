


-- Generate and insert votes for each user and photo combination
INSERT INTO "Votes" (uuid, value, photo_id, user_id, "createdAt", "updatedAt")
SELECT
  md5(random()::text || clock_timestamp()::text)::uuid,  -- generate a random UUID for each vote
  floor(random() * 6),  -- generate a random vote value between 0 and 5
  "Photos".uuid,  -- reference the photo ID from the "Photos" table
  "Users".uuid,  -- reference the user ID from the "Users" table
  now(),  -- set the createdAt timestamp to the current time
  now()   -- set the updatedAt timestamp to the current time
FROM "Users", "Photos";  -- iterate over all combinations of users and photos3


SELECT * FROM "Votes";