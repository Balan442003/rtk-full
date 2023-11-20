var UserSchema = require("../model/userModel");

exports.edit = async (req, res, next) => {
    try {
        const logineExist = await UserSchema.findOne({
            _id: req.body.id,
        });
        res.status(200).json({ message: "response Okey bae", logineExist });
    } catch (err) {
        res.status(401).json({ message: "Unable to connect", })
    }
}

exports.update = async (req, res) => {
    const id = req.body.id;
    const find = await UserSchema.findOne({ _id: id })
    res.status(200).json(find)

    // try {
    //     const updateData = await UserSchema.updateOne(
    //         {
    //             _id: id,
    //         },
    //         {
    //             $set: {
    //                 firstName: req.body.firstName,
    //                 lastName: req.body.lastName,
    //                 email: req.body.email,
    //                 password: req.body.password,
    //             },
    //         }
    //     )
    //     res.status(200).json({ message: "update successfilly", updateData });

    // } catch (err) {
    //     res.status(401).json({ message: "failed" });

    // }

}

exports.updateUserById = async (req, res) => {
    const id = req.params.id
    try {
        const updateData = await UserSchema.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                },
            },
        )
        console.log(updateData);
        res.status(200).json({ message: "update successfully", updateData });

    } catch (err) {
        res.status(401).json({ message: "failed" });

    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await UserSchema.deleteOne({
            _id: id,
        });
        res.status(200).json({ message: "delete successfully", });
    } catch (err) {
        res.status(401).json({ message: "unable to delete" });
    }
}