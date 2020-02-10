"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    idconcursos: Joi.string().guid({version: ["uuidv4"]}).required()
    // userId: Joi.string()
    //   .guid({
    //     version: ["uuidv4"]
    //   })
    //   .required()
  });

  Joi.assert(payload, schema);
}

async function getConcurso(idconcursos) {
  const connection = await mysqlPool.getConnection();
  const getConcursoQuery = `SELECT idconcursos, users_idusers,
  categoria_idcategoria, nombreConcurso, bases, fechaVencimiento,
  primerPremio, segundoPremio, tercerPremio, fechaPremiados,
  cartel, bases_pdf,
  created_At, updated_At, deleted_At 
  FROM concursos
    WHERE idconcursos = ?
      AND deleted_at IS NULL`;
  const [concursoData] = await connection.execute(getConcursoQuery, [idconcursos]);
  connection.release();

  if (concursoData.length < 1) {
    return null;
  }

  return concursoData[0];
}

async function addParticipanteToConcurso(req, res, next) {
  // /api/notes/37664a0b-0811-4005-8a26-db41b93825a8/tags
  const { idconcursos } = req.params;
  const { userId } = req.claims;

console.log(idconcursos);
  const payload = {
    idconcursos
    // userId
  };

  try {
    await validate(payload);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  try {
    const concurso = await getConcurso(idconcursos/*, userId*/);

    if (!concurso) {
      return res.status(404).send();
    }

    /**
     * Exercise 1
     *  Delete tag from a note
     *    Exercise: Do a proper query to delete a tag from a note for the logged in user
     * Exercise 2
     *  Is it possible to delete a tag from note without perform a getProject call?
     */
    const sqlAddParticipanteToConcurso = `INSERT INTO users_has_concursos SET ?`;
    // const userId = concursoData.userId;
    console.log(userId);

    const userRow = {
        concursos_idconcursos: idconcursos,
        users_idusers: userId,
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    const connection = await mysqlPool.getConnection();
    try {
      await connection.query(sqlAddParticipanteToConcurso, userRow);
      connection.release();
    } catch (e) {
      console.error(e);
      connection.release();
      return res.status(500).send({
        message: e.message
      });
    }

    return res.status(204).send();
  } catch (e) {
    console.error(e);

    return res.status(500).send({
      message: e.message
    });
  }
}

module.exports = addParticipanteToConcurso;
