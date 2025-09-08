import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


  const createToken  = (id)=>{
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

        return jwt.sign({id},process.env.JWT_SECRET)
    }
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    if(password.length <8){
        return res.status(400).json({msg:"password length should be > 8  "})
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone
    });

    // Save to DB
    await newUser.save();
  
    const Token = createToken(newUser._id)
    // res.json({successs: true , Token})

    res.status(201).json({ msg: "User registered successfully", user: newUser.name, Token });
  } catch (error) {
    res.status(500).json({ msg: "Registration failed", error: error.message });
  }
};

// @route   POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        
      return res.status(400).json({ msg: "Invalid credentials" });

    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        cartData: user.cartData,
        address: user.address,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Login failed", error: error.message });
  }
};

// @route   POST /api/users/admin
const adminLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        // If user doesn't exist, send response AND stop the function.
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        // If password doesn't match, send response AND stop the function.
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // If everything is okay, send the final successful response.
        const token = createToken(user._id);
        return res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export { registerUser, loginUser, adminLogin };
