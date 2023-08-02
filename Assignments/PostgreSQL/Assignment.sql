DROP FUNCTION get_movie_details();
DROP VIEW IF EXISTS movie_details;

CREATE VIEW movie_details AS
SELECT f.film_id, f.title, f.release_year, f.rating, ct.name AS "category", 
CONCAT(ac.first_name, ' ' , ac.last_name) AS "actor"
FROM film f JOIN film_actor fa ON f.film_id = fa.film_id 
JOIN film_category fc ON f.film_id = fc.film_id
JOIN actor ac ON fa.actor_id = ac.actor_id
JOIN category ct ON fc.category_id = ct.category_id
ORDER BY f.film_id;

CREATE OR REPLACE FUNCTION get_movie_details()
RETURNS SETOF movie_details AS
$$
BEGIN
    RETURN QUERY SELECT * FROM movie_details;
END;
$$ LANGUAGE plpgsql;

select * from get_movie_details();

DROP FUNCTION feed_review(INTEGER, TEXT, NUMERIC);
DROP TABLE reviews;

CREATE TABLE reviews (
film_id INTEGER references film(film_id),
review TEXT,
rate_on_5 NUMERIC
)

CREATE OR REPLACE FUNCTION feed_review(film_id INTEGER, review TEXT, rate_on_5 NUMERIC)
RETURNS SETOF reviews AS
$$
BEGIN
    INSERT INTO reviews
	VALUES(film_id, review, rate_on_5);
	
	RETURN QUERY 
	SELECT * FROM reviews;
END;
$$ LANGUAGE plpgsql;

SELECT f.title, r.review, rate_on_5 
FROM feed_review(98, 'Good Movie', 4.5) r JOIN film f ON r.film_id = f.film_id;

DROP TRIGGER on_update ON reviews;
DROP FUNCTION update_trigger();

CREATE OR REPLACE FUNCTION update_trigger()
RETURNS TRIGGER AS
$$
BEGIN
    RAISE NOTICE 'Value updated!';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_update
AFTER UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_trigger();

UPDATE reviews
SET film_id = 2 WHERE film_id = 98;

SELECT f.title, r.review, rate_on_5 
FROM reviews r JOIN film f ON r.film_id = f.film_id;

DELETE FROM reviews;



