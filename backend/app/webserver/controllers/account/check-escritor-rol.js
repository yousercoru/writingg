"use strict";

async function checkEscritorRol(req, res, next) {
const {
rol,
} = req.claims;

if (rol !== "escritor") {
return res.status(403).send();
}

next();
}

module.exports = checkEscritorRol;