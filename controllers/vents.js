const Vent = require('../models/vent');
const router = require('express').Router();

//Create
router.post('/', async (req, res) => {
	try {
		const createdVent = await Vent.create(req.body);
		res.status(200).json(createdVent);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: error.message });
	}
});

//Read

//Index:
router.get('/', async (req, res) => {
	try {
		const foundVents = await Vent.find({});
		res.status(200).json(foundVents);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: error.message });
	}
});

//Show
router.get('/:id', async (req, res) => {
	try {
		const foundVent = await Vent.findById(req.params.id);
		res.status(200).json(foundVent);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: error.message });
	}
});

//Update

router.put('/:id', async (req, res) => {
	try {
		const updatedVent = await Vent.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		});
		res.status(200).json(updatedVent);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: error.message });
	}
});

//Destory

router.delete('/:id', async (req, res) => {
	try {
		const deletedVent = await Vent.findByIdAndDelete(req.params.id);
		res.status(200).json(deletedVent);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
