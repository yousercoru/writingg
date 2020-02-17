"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function searchConcursos(req, res, next) {
  const { nombreConcurso, nombre, bases } = req.params;

  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT c.nombreConcurso, c.categoria, u.nombre, c.primerPremio, c.fechaVencimiento, c.fechaPremiados
        FROM concursos c
        JOIN users u
        ON u.idusers = c.users_idusers
        WHERE c.deleted_at IS NULL
        AND c.nombreConcurso LIKE ?;
        OR u.nombre LIKE ?
        OR c.bases LIKE ?`;
        
    const [rows] = await connection.execute(sqlQuery, [nombreConcurso, nombre, bases]);
    connection.release();
  
    // preparar respuesta
    const searchResult = rows.map(concurso => {
      return {
        ...concurso
      };
    });

    return res.status(200).send(searchResult);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

module.exports = searchConcursos;