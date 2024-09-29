-- @block
show databases;

-- @block
CREATE TABLE Users(
    discordId BIGINT PRIMARY KEY,
    lastfmProfile varchar(255) NOT NULL UNIQUE
);


-- @block
INSERT INTO Users (discordId, lastfmProfile)
VALUES (
    248285489902256128,
    'Tylody'
);

-- @block
ALTER TABLE Users
MODIFY COLUMN discordId BIGINT;

-- @block
select * from users;