import * as SessionService from "../services/session.js";

async function logIn(req, res) {
  try {
    const session = await SessionService.createSession(req.body);
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function logOut(req, res) {
  try {
    await SessionService.deleteSession(req.token);
    res.status(200).json({ message: "Se ha cerrado sesión correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export default {
  logIn,
  logOut
}

export {
  logIn,
  logOut
}
