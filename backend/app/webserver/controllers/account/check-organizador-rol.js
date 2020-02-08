"use strict";

async function checkOrganizadorRol(req, res, next) {
const {
rol,
} = req.claims;

if (rol !== "organizador") {
return res.status(403).send();
}

next();
}

module.exports = checkOrganizadorRol;