"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

// /**
//  *
//  * @param {Object} payload
//  */
async function validate(payload) {
  const schema = Joi.object({
    userId: Joi.string(),
  });

  Joi.assert(payload, schema);
}

const getConcursosActivos = async (userId) => {
  let connection;

  connection = await mysqlPool.getConnection();
  const sqlQuery = `SELECT users_has_concursos.*,
    concursos.slugNombreConcurso,
    concursos.nombreConcurso,
    concursos.fechaVencimiento,
    concursos.fechaPremiados,
    users.nombre as organizador,
    users.email as organizador_email
     
    FROM users_has_concursos
    INNER JOIN concursos on concursos.idconcursos = users_has_concursos.concursos_idconcursos
    INNER JOIN users on concursos.users_idusers = users.idusers
    WHERE users_has_concursos.users_idusers = ?
    AND users_has_concursos.deleted_at IS NULL`;

  const [rows] = await connection.execute(sqlQuery, [userId]);
  connection.release();

  return rows;
};

const getConcursosFinalizados = (userId) => {
  return [];
};

async function getConcursosOrganizador(req, res, next) {
  //const { idusers } = req.claims;

  const { userId } = req.claims;

  console.log("Aqui", userId);

  const todayDate = new Date().toISOString().substring(0, 19).replace("T", " ");

  try {
    const activos = await getConcursosActivos(userId);

    const finalizados = await getConcursosFinalizados(userId);

    const data = {
      activos,
      finalizados,
    };

    return res.send(data);
  } catch (e) {
    if (connection) {
      connection.release();
    }

    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getConcursosOrganizador;
