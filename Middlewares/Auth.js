// import jwt from "jsonwebtoken";
// import { User } from "../Models/User.js"; // or import User from "../Models/User.js" if default export

// export const isAuthenticated = async (req, res, next) => {
//   const token = req.header('Auth');
//   if (!token) {
//     return res.status(401).json({ message: "Login first" });
//   }
//   try {
//     const decoded = jwt.verify(token, "your_jwt_secret");
//     const id = decoded.userId;
//     const user11 = await User.findById(id);
//     if (!user11) {
//       return res.status(401).json({ message: "Unauthorized User" });
//     }
//     req.user = user11; // Attach the whole user object
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };


// middleware/auth.js
import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Auth"); // or "Authorization" depending on your client
  if (!token) {
    return res.status(401).json({ message: "Login first" });
  }

  try {
    const decoded = jwt.verify(token,  process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    req.user = user; // Attach the user object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
