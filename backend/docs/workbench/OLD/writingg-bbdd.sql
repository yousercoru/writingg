USE writingg_bbdd;
SELECT * FROM users;
SELECT * FROM concursos;
SELECT * FROM users_has_concursos;
DELETE FROM users_has_concursos WHERE concursos_idconcursos="11c6e5d7-33ae-4dd3-8ae3-d3a54d2a851c";
DELETE FROM users_has_concursos WHERE users_idusers="c9983d4b-42ed-481b-bf64-2d4ed8a4fae8";
SELECT c.nombreConcurso, c.categoria, u.nombre, c.primerPremio, c.fechaVencimiento, c.fechaPremiados
	FROM concursos c
	JOIN users u
	ON u.idusers = c.users_idusers
    WHERE c.deleted_at IS NULL
	AND c.nombreConcurso LIKE "%literario%"
	OR u.nombre LIKE "%literario%"
    OR c.bases LIKE "%literario%";
    
SELECT c.nombreConcurso, c.categoria, u.nombre, c.primerPremio, c.fechaVencimiento, c.fechaPremiados
	FROM concursos c
	JOIN users u
	ON u.idusers = c.users_idusers
    WHERE c.nombreConcurso LIKE "%concurso%"
	OR u.nombre LIKE "%concurso%"
    OR c.bases LIKE "%concurso%";

