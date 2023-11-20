const User = require("../model/userModel");
const bcrypt = require('bcrypt')
const { upload } = require('../multer/multer')
const path = require("path")
const { verifyToken }= require('../middlewares/verifyToken')

exports.get = (req, res, next) => {
    try {
        User.find({})
            .then((data) => res.json({ data }))
            .catch((err) => res.json(err));
    } catch (error) {
        console.log(error);
    }
}

exports.post = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Image upload failed", error: err });
        }
        try {
            const { firstName, lastName, email, password, profileImage } = req.body;

            const pwd = await bcrypt.hash(password, 10)

            const newUser = new User({
                firstName,
                lastName,
                email,
                password: pwd,
                profileImage: path.join("uploads/", req.file.filename)
            });
            await newUser.save();
            console.log(newUser);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Registration failed', error: error.message });
        }
    })
}

exports.fetchUserById = (req, res) => {
    const userId = req.params.id; // Extract the user ID from the URL parameter

    User.findOne({ _id: userId }) // Assuming you're using Mongoose to interact with a database
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ data: user });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server error', error: err.message });
        });
}

exports.deleteByUserId = (req, res, next) => {
    try {
        const ID = req.params.id;
        User.deleteOne({ _id: ID })
            .then((data) => res.json({ data }))
            .catch((err) => res.json(err));
    } catch (error) {
        console.log(error);
    }
}

exports.getSingleUser = async (req, res) => {
    
    try {
        const token = req.headers.authorization;
    

        const tokenVerification = verifyToken(token);

        if (tokenVerification.error) {
            return res.status(401).json({ message: tokenVerification.error });
        }

        const { decoded } = tokenVerification;

        const userID = decoded;
        console.log(userID);

        const foundUser = await User.findOne({ _id: userID });
 
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ data: foundUser });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching user", error: error.message });
    }
};