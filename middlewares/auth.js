import { validateToken } from "../services/auth.js";
function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenValue = req.cookies[cookieName];
    if (!tokenValue) {
      req.user = null;
      return next();
    }

    try {
      const userPayload = validateToken(tokenValue);
      req.user = userPayload;
      res.locals.user = userPayload;
    } catch (error) {
      console.error("Invalid token:", error.message);
      req.user = null;
    }

    return next();
  };
}

export { checkForAuthenticationCookie };
