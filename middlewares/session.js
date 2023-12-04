import sessionService from "../services/session.js";

async function verifySession(req, res, next) {
  const token = req.headers["token"];
  try {
    if (!token) {
      return res.status(401).json({ message: "No se encuentra el token" });
    }
    const tokenVerification = await sessionService.verifyToken(token);
    if (!tokenVerification) {
      return res.status(401).json({ message: "El token no es válido" });
    }
    req.token = token;
    req.session = tokenVerification;
    next();
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

export {
  verifySession,
}