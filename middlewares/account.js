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
    .catch(({message}) => {
      res.status(400).json(message);
    });
}

export {
  validateCreateAccount,
}