
import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";

export const Register= async (req, res) => {
    const { name, email, password } = req.body;
    if (name == "" || email == "" || password == "") {
        return res.status(400).json({ message: "All fields are required" });
    }


    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await User.findOne({ email: email.trim() });
        if (user) {
            return res.json({ Message: "User Already exist. So try another email..." });
        }

        user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

export const Login= async (req, res) =>{
    const { email, password } = req.body;
    if (email == "" || password == "") {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email: email.trim() });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
          const token = jwt.sign(
          { userId: user._id }, 
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
    );
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

