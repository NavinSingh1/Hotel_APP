import express from 'express'
import menuItem from "./../models/menuItem.js";

const router = express.Router()

// Post route to add any new menu
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new menuItem(data);
        const response = await newMenu.save();
        console.log("data saves");
        res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

// get method to retrieve all menu
router.get("/", async (req, res) => {
    try {
        const data = await menuItem.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

// not working check later for upgradation
router.get("/:taste", async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == 'Sweet' || taste == 'Spicy' || taste == 'Sour') {
            const response = await menuItem.find({ flavour: taste });
            console.log("response fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid taste type' });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

// Update the Menu details
router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id; // Extract the id from the URL parameter
        const updatedmenuData = req.body; // Updated data for the person

        const response = await menuItem.findByIdAndUpdate(menuId, updatedmenuData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose Validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Menu not found ' });
        }

        console.log("data updated");
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

// delete the menu details from the database
router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id; // Extract the person's ID from the URL parameter

        // Assuming you have a Person model
        const response = await menuItem.findByIdAndDelete(menuId);

        if (!response) {
            return res.status(404).json({ error: 'Menu not found ' });
        }

        console.log("data updated");
        res.status(200).json({ message: 'Menu Deleted Successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

export default router;