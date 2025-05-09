const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User.model');


const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "All fields are mandatory" });
    }
    console.log("email", email);
    try{
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(400).send({ message: "User does not exist. Kindly register" , success:false});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).send({ message: "Invalid credentials",success:false });
        }

        const token = jwt.sign({ userId:user._id}, process.env.JWT_SECRET);
        user.token = token;
        await user.save();
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' }
        );
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/auth/refresh',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        }).status(201).json({ token, message:"Login successful",success:true });
    }
    catch(err){
        console.error("Error during login:", err);
        res.status(500).send({err:"Internal server error", success:false})
    }
}

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ userId:newUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(
            { userId: newUser._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' } 
        );
        return res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,          
            sameSite: 'strict',
            path: '/auth/refresh',   
            maxAge: 30 * 24 * 60 * 60 * 1000,
        }).status(201).json({ token, user: { id: newUser._id, email: newUser.email } });

    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

const logout = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        console.log("token", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        console.log("user", user);
        user.token = null;
        user.refreshToken = null;

        user.save();

        return res.status(200).json({ message: 'Logged out successfully',success:true });
    } catch (error) {
        return res.status(500).json({ message: 'Server error',success:false });
    }
}

module.exports = {
    login,
    register,
    logout
};
