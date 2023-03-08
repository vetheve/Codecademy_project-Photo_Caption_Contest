INSERT INTO "Photos" (uuid, url, user_id, "createdAt", "updatedAt")
SELECT md5(random()::text || clock_timestamp()::text)::uuid, 'http://placeimg.com/640/480/' || (id + 1), (SELECT uuid FROM "Users" ORDER BY random() LIMIT 1), NOW(), NOW()
FROM generate_series(0, 9) AS id;

SELECT * FROM "Photos";