-- VIEWS

CREATE VIEW film_master 
AS
SELECT 
	film_id, 
	title, 
	release_year, 
	length, 
	name category
FROM 
	film
INNER JOIN film_category 
	USING (film_id)
INNER JOIN category 
	USING(category_id);
	
CREATE VIEW horror_film 
AS
SELECT 
	film_id, 
	title, 
	release_year, 
	length 
FROM 
	film_master
WHERE 
	category = 'Horror';
	
select * from horror_film
	
drop view film_master;
drop view horror_film;