"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function searchConcursos(req, res, next) {
  // console.log('test', req.headers, req.query);
  const nombreConcursoFiltro = `%${req.query.nombreConcurso}%`;
  // const { nombreConcurso, nombre, bases } = req.params;
  // console.log(nombreConcursoFiltro);


  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT c.nombreConcurso, c.categoria, u.nombre, c.primerPremio, c.fechaVencimiento, c.fechaPremiados
        FROM concursos c
        JOIN users u
        ON u.idusers = c.users_idusers
        WHERE c.deleted_at IS NULL
        AND c.nombreConcurso LIKE ?`;
        // OR u.nombre LIKE ?
        // OR c.bases LIKE ?`;
        
    const [rows] = await connection.execute(sqlQuery, [nombreConcursoFiltro]);
    // const [rows] = await connection.execute(sqlQuery, [nombreConcurso, nombre, bases]);
    connection.release();
    console.log(sqlQuery);
  
    // preparar respuesta
    const searchResult = rows.map(concurso => {
      return {
        ...concurso,
        // primerPremio: parseInt(primerPremio),
        // fechaVencimiento: ,
        // fechaPremiados: ,
      };
    });

    return res.status(200).send(searchResult);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

module.exports = searchConcursos;