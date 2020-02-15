"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function getConcursosByCategoria(req, res, next) {
  const categoria = { ...req.body };
  const byCategoria = categoria.categoria;

  // 2. Select all tags
  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT * FROM concursos
    WHERE categoria = ? `;

    const [rows] = await connection.execute(sqlQuery, [categoria.categoria]);
    connection.release();

    // preparar respuesta
    const concursos = rows.map(concurso => {
      return {
        ...concurso
        // created_At: undefined,
        // updated_At: undefined,
        // deleted_At: undefined
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

module.exports = getConcursosByCategoria;
