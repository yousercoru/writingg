"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

// /**
//  *
//  * @param {Object} payload
//  */
async function validate(payload) {
  const schema = Joi.object({
    idconcursos: Joi.string(),
  });

  Joi.assert(payload, schema);
}

// /**
//  *
//  * @param {Array} rows Each row note with a tagId / tag per row
//  * @returns {Object} note Note object with array of tags:
//  *  {
//  *    title: "title note",
//  *    tags: [{
//  *      tagId: "uuid-of-tag-id-1",
//  *      tag: "JS"
//  *    }]
//  *  }
//  */
// function hydrateNoteTags(rows) {
//   const noteHydrated = rows.reduce((acc, rawNote) => {
//     /**
//      * esta nota tiene un tag?
//      */
//     const tag = rawNote.tagId
//       ? {
//           tagId: rawNote.tagId,
//           tag: rawNote.tag
//         }
//       : undefined;

//     const notaProcesada = acc.id !== undefined;

//     /**
//      * La primera vez creamos el objeto nota con el array de tags
//      * si tiene
//      */
//     if (!notaProcesada) {
//       return {
//         ...acc,
//         ...rawNote,
//         createdAt: rawNote.created_at,
//         updatedAt: rawNote.updated_at,
//         tags: tag ? [tag] : [],
//         tagId: undefined,
//         tag: undefined,
//         created_at: undefined,
//         updated_at: undefined
//       };
//     }

//     /**
//      * El acumulador ya tiene la nota, necesitamos ir
//      * añadiendo los tags
//      */
//     return {
//       ...acc,
//       tags: [...acc.tags, tag]
//     };
//   }, {});

//   return noteHydrated;
// }

async function getParticipantesConcurso(req, res, next) {
  const { idconcursos } = req.params;
  //const { userId } = req.claims;
  try {
    const payload = {
      idconcursos,
    };
    await validate(payload);
  } catch (e) {
    return res.status(400).send(e);
  }
  const concursos_idconcursos = idconcursos;
  //const users_idusers = userId;
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
