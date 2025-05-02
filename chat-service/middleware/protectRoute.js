import jwt from 'jsonwebtoken';

const JWT_SECRET = "manishkumar682jaipursikarindia";

const authentication = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "").trim();
  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

const adminProtect = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, admin role required' });
  }
  next();
};

export { authentication, adminProtect };
