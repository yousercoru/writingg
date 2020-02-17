USE writingg;
SELECT * FROM users;
SELECT * FROM concursos;
SELECT * FROM users_has_concursos;
DELETE FROM users_has_concursos WHERE concursos_idconcursos="a02988a3-43ab-496a-9171-1f272476cc8c";
DELETE FROM users_has_concursos WHERE users_idusers="c9983d4b-42ed-481b-bf64-2d4ed8a4fae8";
SELECT c.nombreConcurso, c.categoria, u.nombre, c.primerPremio, c.fechaVencimiento, c.fechaPremiados
	FROM concursos c
	JOIN users u
	ON u.idusers = c.users_idusers
	WHERE c.nombreConcurso LIKE "%literario%"
	OR u.nombre LIKE "%Ayuntamiento%"
    OR c.bases LIKE "%lorem%";

