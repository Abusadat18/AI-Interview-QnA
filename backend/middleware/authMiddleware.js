import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    const authHeader = req.headers["authorization"]; // headers is an obj
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    // 2. Token format: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4. Attach user info to request
    req.user = decoded; // e.g., { userId: 1, email: "test@example.com", iat: ..., exp: ... }

    next(); // pass control
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
