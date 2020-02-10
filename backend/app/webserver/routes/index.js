'use strict';

const accountRouter = require('./account-router');
const authRouter = require('./auth-router');
const concursoRouter = require('./concurso-router');
const participanteRouter = require('./participante-router');
// const tagRouter = require('./tag-router');
// const userRouter = require('./user-router');

module.exports = {
  accountRouter,
  authRouter,
  concursoRouter,
  participanteRouter
//   tagRouter,
//   userRouter,
};
