CREATE DATABASE writingg;
USE writingg;
SELECT * FROM users;
SELECT * FROM concursos;
SELECT idconcursos, users_idusers,
  categoria_idcategoria, nombreConcurso, bases, fechaVencimiento,
  primerPremio, segundoPremio, tercerPremio, fechaPremiados,
  cartel, bases_pdf,
  created_At, updated_At, deleted_At 
  FROM concursos
    WHERE idconcursos = "eff68d26-0307-4fef-a26b-def7ccbe0e00"
      AND deleted_at IS NULL;
SELECT * FROM users_has_concursos;
DELETE FROM users_has_concursos WHERE users_idusers = "87a0da83-d30a-41cb-9401-3a758609618f";