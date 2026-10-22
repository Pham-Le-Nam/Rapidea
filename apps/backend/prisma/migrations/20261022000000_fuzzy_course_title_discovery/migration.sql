-- Public course discovery must tolerate misspelled titles, including courses
-- that do not yet have a generated AI profile or embedding.
CREATE EXTENSION IF NOT EXISTS pg_trgm;
