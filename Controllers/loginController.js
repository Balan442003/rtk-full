const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const Userschema = require('../model/userModel')
exports.post = async (req, res) => {
    // try {
    //     const {  email, password } = req.body;
    //     const load = req.body
    //     console.log(load);
    //     const loginexist = await Userschema.findOne({ email: email, password: password })
    //     if (loginexist) {
    //         return res.status(200).json({ loginexist })

    //     }
    //     else {
    //         res.status(400).json({ message: "invalid users" })
    //     }

    // } catch (error) {
    //     console.log(error);

    // }

    try {
        const { email, password } = req.body;
        const user = await Userschema.findOne({ email: email });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: "Login failed, user not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Login failed, incorrect password" });
        }

        // If email and password are valid, create and send a JSON Web Token (JWT)
        const token = jwt.sign({ _id: user._id }, 'xfgfghfhdsffjhj', { expiresIn: "1hr" });

        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Login failed", error);
        res.status(500).json({ message: "Server error" });
    }
}