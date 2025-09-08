import jwt from "jsonwebtoken";

const verifyAdmin = (req, res, next) => {
  try {
    const {token} = req.headers

 if(!token){
 return res.status(403).json({ msg: "No admin token" });
 }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Compare token data to known admin

    if (decoded !== process.env.ADMIN_EMAIL + process.env.PASSWORD) {
      return res.status(403).json({ msg: "Invalid No admin token" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized", error: error.message });
  }
};

export default verifyAdmin;
