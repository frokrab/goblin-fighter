DROP SCHEMA IF EXISTS goblin_fighter CASCADE;

CREATE SCHEMA goblin_fighter
  CREATE TABLE leaderboard (
    id SERIAL PRIMARY KEY,
    name CHAR(3),
    score SMALLINT
  );

CREATE INDEX ON goblin_fighter.leaderboard (score);
ALTER ROLE palpaca SET search_path TO goblin_fighter;
