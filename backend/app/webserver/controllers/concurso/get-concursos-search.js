"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function getConcursosSearch(req, res, next) {
  console.log(req.query);

  const { keywords, categoria, fechaInicio, fechaFin } = req.query;

  console.log(keywords, categoria);

  try {
    const connection = await mysqlPool.getConnection();

    connection.config.namedPlaceholders = true;

    const sqlQuery = `SELECT c.nombreConcurso, c.slugNombreConcurso, c.categoria, u.nombre, c.primerPremio, c.fechaVencimiento, c.fechaPremiados,
    (select count(*) from users_has_concursos
    WHERE users_has_concursos.concursos_idconcursos = c.idconcursos)
    AS participantes
    FROM concursos c
    JOIN users u
    ON u.idusers = c.users_idusers
    WHERE c.deleted_at IS NULL
    AND c.categoria LIKE :categoria
    AND (
      c.nombreConcurso LIKE :keywords 
      OR u.nombre LIKE :keywords
      OR c.bases LIKE :keywords
    )
    ${
      fechaFin &&
      fechaInicio &&
      "AND c.fechaVencimiento between :fechaInicio and :fechaFin"
    }

    ORDER BY c.fechaVencimiento DESC
    `;

    const [rows] = await connection.execute(sqlQuery, {
      keywords: `%${keywords}%`,
      categoria: `%${categoria}%`,
      fechaInicio,
      fechaFin,
    });

    connection.config.namedPlaceholders = false;

    connection.release();

    const concursos = rows.map((concurso) => {
      return {
        ...concurso,
        created_At: undefined,
        updated_At: undefined,
        deleted_At: undefined,
      };
    });

    return res.status(200).send(concursos);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getConcursosSearch;
