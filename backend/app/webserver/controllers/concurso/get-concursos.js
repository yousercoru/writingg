"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function getConcursos(req, res, next) {
  console.log(req.query);

  const { keywords, categoria, fechas } = req.query;

  console.log(keywords, categoria, fechas);

  //const { userId } = req.params;

  // 2. Select all tags
  try {
    const connection = await mysqlPool.getConnection();

    connection.config.namedPlaceholders = true;

    const sqlQuery = `SELECT c.nombreConcurso, c.slugNombreConcurso, c.categoria, u.nombre, c.primerPremio, c.fechaVencimiento, c.fechaPremiados
    FROM concursos c
    JOIN users u
    ON u.idusers = c.users_idusers
    WHERE c.deleted_at IS NULL
    AND c.nombreConcurso LIKE :keywords
    OR u.nombre LIKE :keywords
    OR c.bases LIKE :keywords
    AND c.categoria LIKE :categoria`;

    const [rows] = await connection.execute(sqlQuery, {
      keywords: `%${keywords}%`,
      categoria: `%${categoria}%`,
    });

    connection.config.namedPlaceholders = false;

    connection.release();

    // preparar respuesta
    const concursos = rows.map((concurso) => {
      return {
        ...concurso,
        created_At: undefined,
        updated_At: undefined,
        deleted_At: undefined,
        // createdAt: tag.created_at,
        // updatedAt: tag.updated_at,
        // user_id: undefined,
        // created_at: undefined,
        // updated_at: undefined
      };
    });

    return res.status(200).send(concursos);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getConcursos;
