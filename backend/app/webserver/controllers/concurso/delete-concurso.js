"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    idconcursos: Joi.string().required(),
  });

  Joi.assert(payload, schema);
}

async function deleteConcurso(req, res, next) {
  const { idconcursos } = req.params;

  try {
    await validate({ idconcursos });
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `UPDATE concursos
      SET deleted_at = ?
      WHERE idconcursos = ?
        
        AND deleted_at IS NULL`;

    const deleted_at = new Date()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");
    const [deletedStatus] = await connection.execute(sqlQuery, [
      deleted_at,
      idconcursos,
    ]);
    connection.release();

    if (deletedStatus.changedRows !== 1) {
      return res.status(404).send();
    }

    return res.status(204).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    return res.status(500).send(e.message);
  }
}

module.exports = deleteConcurso;
