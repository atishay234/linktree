const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Linktree = require("../models/Linktree");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

// create account
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser)
            return res
                .status(200)
                .send("User already exist. Please choose another Username");

        const user = new User({
            username,
            password: await bcrypt.hash(password, saltRounds),
        });
        const result = await user.save();
        const linktree = new Linktree({
            tree: [],
            user: user.id,
        });
        await linktree.save();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// authenticate
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(200).json("user dose not exist");
        const result = await bcrypt.compare(password, user.password);
        if (result) return res.status(200).json(user);
        else return res.status(200).json("incorrect password");
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

// delete an account
router.delete("/delete", async (req, res) => {
    try {
        const { userId } = req.body;
        await User.findByIdAndDelete(userId);
        await Linktree.findOneAndDelete({
            user: userId,
        });
        return res
            .status(200)
            .json("Account deleted and the linktree associated with it");
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
});

// edit account
router.put("/edit", async (req, res) => {
    try {
        const { userId, username, password } = req.body;
        if (!username && !password)
            return res.status(200).json("Nothing to update");
        const user = await User.findOne({ id: userId });
        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, saltRounds); // bcrypt use later
        await user.save();
        return res.status(200).json("Updated");
    } catch (e) {
        return res.status(500).json(e);
    }
});

module.exports = router;
