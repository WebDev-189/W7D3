const router = require("express").Router()
const Costume = require("./../models/Costume.model")

router.get("/", async (req, res, next) => {
	console.log(req.query)
	const { size, title } = req.query
	const query = {}
	if (size) {
		query.size = size.toUpperCase()
	}
	if (title) {
		const titleRegExp = new RegExp(title, "gi")
		query.title = titleRegExp
	}
	Costume.find(query)
		.then((allOfTheCostumes) => {
			res.json(allOfTheCostumes)
		})
		.catch((error) => console.log(error.message))
})

router.post("/", async (req, res, next) => {
	const theCostume = { ...req.body }
	Costume.create(theCostume)
		.then((createdCostume) => {
			res.status(201).json(createdCostume)
		})
		.catch((error) => res.send(error.message))
})

router.get("/:id", async (req, res, next) => {
	const { id } = req.params
	try {
		const oneCostume = await Costume.findById(id).populate("owner")
		res.json(oneCostume)
	} catch (error) {
		res.send(error.message)
	}
})

module.exports = router
