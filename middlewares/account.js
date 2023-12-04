import { AccountCreateSchema } from "../schemas/account.js";

function validateCreateAccount(req, res, next) {
  AccountCreateSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false
  })
    .then((account) => {
      req.body = account;
      next();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

export {
  validateCreateAccount,
}