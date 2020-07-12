"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    idconcursos: Joi.string(),
  });

  Joi.assert(payload, schema);
}

async function getParticipantesConcurso(req, res, next) {
  const { idconcursos } = req.params;

  try {
    const payload = {
      idconcursos,
    };
    await validate(payload);
  } catch (e) {
    return res.status(400).send(e);
  }
  const concursos_idconcursos = idconcursos;

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT u.nombre, u.dni, u.email,
    uc.obra, uc.created_at, uc.users_idusers, uc.ratingOrganizador
    FROM users_has_concursos uc
    INNER JOIN users u ON u.idusers = uc.users_idusers
    WHERE uc.concursos_idconcursos = ?
    AND deleted_at IS NULL`;

    const [rows] = await connection.execute(sqlQuery, [concursos_idconcursos]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).send();
    }

    const concursantes = rows.map((concursante) => {
      return {
        ...concursante,
        created_At: undefined,
        deleted_At: undefined,
      };
    });

    return res.send(concursantes);
  } catch (e) {
    if (connection) {
      connection.release();
    }

    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getParticipantesConcurso;
