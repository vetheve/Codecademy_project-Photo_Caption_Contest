INSERT INTO "Users" (uuid, username, email, password, "createdAt", "updatedAt")
VALUES 
('3ad6cc70-147b-479e-84e3-34600a12746f', 'johndoe', 'johndoe@example.com', '$2b$10$IyYQ71eTzrSHo9Y5LRvZ.OBvG3W7ezNLka/f1qTqA65x.Ne7yuGsu', '2023-03-08 05:07:06.476+00', '2023-03-08 05:07:06.476+00'),
('0da788ee-4d02-4937-aeb0-3fd745e9b985', 'janedoe', 'janedoe@example.com', '$2b$10$LKm5E6Ovr0KzFpFG.xS9vejRGCwNqFR/aE/nDTFlFniQlmbHRln6.', '2023-03-08 05:07:06.48+00', '2023-03-08 05:07:06.48+00'),
('3ad6cc70-147b-479e-84e3-34600a12746f', 'billdoe', 'johndoe@example.com', '$2b$10$IyYQ71eTzrSHo9Y5LRvZ.OBvG3W8ezNLka/f1qTqA65x.Ne7yuGsu', '2023-03-08 05:07:06.476+00', '2023-03-08 05:07:06.476+00'),
('0da788ee-4d02-4937-aeb0-3fd745e9b985', 'billdoe', 'janedoe@example.com', '$2b$10$LKm5E6Ovr0KzFpFG.xS9vejRGCwNZFR/aE/nDTFlFniQlmbHRln6.', '2023-03-08 05:07:06.48+00', '2023-03-08 05:07:06.48+00');

SELECT * FROM "Users";