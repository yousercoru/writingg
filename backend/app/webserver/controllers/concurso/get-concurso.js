"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
const schema = Joi.object({
idconcursos: Joi.string().required(),
idusers: Joi.string().guid({
version: ["uuidv4"]
}),

rol: Joi.string()
});

Joi.assert(payload, schema);
}

async function getConcurso(req, res, next) {
const { idconcursos } = req.params;
//const { idusers } = req.claims;

console.log(idconcursos)
const payload = {
idconcursos
//idusers
};

try {
await validate(payload);
} catch (e) {
return res.status(400).send(e);
}

try {
const connection = await mysqlPool.getConnection();
const getConcursoQuery = `SELECT * FROM concursos WHERE idconcursos = ?`;
const [results] = await connection.execute(getConcursoQuery, [idconcursos]);
connection.release();
if (results.length < 1) {
return res.status(404).send();
}

const [concursoData] = results;

return res.send({
  data: concursoData
});
} catch (e) {
console.error(e);
res.status(500).send({
message: e.message
});
}
}

module.exports = getConcurso;