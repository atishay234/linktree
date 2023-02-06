const Linktree = require("../models/Linktree");
const User = require("../models/User");

const router = require("express").Router({ mergeParams: true });

// Add a linktree
router.post("/", async (req, res) => {
    try {
        const { userId, text, url } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(401).json("User does not exist");

        const linktree = await Linktree.findOne({ user: userId });
        if (linktree) {
            linktree.tree.push({ text, url });
            await linktree.save();
            return res.status(200).json(linktree);
        } else {
            const newLinktree = new Linktree({
                tree: [{ text, url }],
                user: userId,
            });
            await newLinktree.save();
            return res.status(200).json(newLinktree);
        }
    } catch (e) {
        console.log("e", e);
        res.status(500).json(e);
    }
});

//get linktree
router.post("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(401).json("User does not exist");

        const linktree = await Linktree.findOne({ user: req.params.userId });
        return res.status(200).json(linktree);
    } catch (e) {
        return res.status(500).json(e.stack);
    }
});

// delete a linktree
router.delete("/", async (req, res) => {
    try {
        const { userId, treeId } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(401).json("User does not exist");

        const linktree = await Linktree.findOneAndUpdate(
            { user: userId },
            { $pull: { tree: { _id: treeId } } }
        );
        return res.status(200).json(linktree);
    } catch (e) {
        return res.status(500).json("ERROR", e);
    }
});
//edit a linktree
router.put("/", async (req, res) => {
    try {
        const { userId, treeId, text, url } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(401).json("User does not exist");

        // This could be done with a single query. (Lack of knowledge). WILL UPDATE LATER
        const linktree = await Linktree.findOne({ user: userId });
        linktree.tree = linktree.tree.map((tree) => {
            if (tree.id === treeId) {
                return { text, url };
            } else return tree;
        });
        await linktree.save();

        return res.status(200).json(linktree);
    } catch (e) {
        return res.status(500).json(e);
    }
});

module.exports = router;
