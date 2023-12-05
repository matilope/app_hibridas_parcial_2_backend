import { GameCreateSchema, GameUpdateSchema } from "../schemas/games.js";

function validateCreateGame(req, res, next) {
  GameCreateSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false
  })
    .then((game) => {
      req.body = game;
      next();
    })
    .catch(({message}) => {
      res.status(400).json(message);
    });
}

function validateUpdateGame(req, res, next) {
  GameUpdateSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false
  })
    .then((game) => {
      req.body = game;
      next();
    })
    .catch(({message}) => {
      res.status(400).json(message);
    });
}

export {
  validateCreateGame,
  validateUpdateGame
}