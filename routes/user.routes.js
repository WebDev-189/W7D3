const router = require("express").Router()
const User = require("./../models/User.model")
const Favorite = require("./../models/Favorite.model")

/**
 * ! All the routes are prefixed by /users
 */

router.get("/", async (req, res, next) => {
	try {
		const allUsers = await User.find()
		res.json(allUsers)
	} catch (error) {
		console.log(error.message)
	}
})

router.post("/", async (req, res, next) => {
	try {
		// The information we are looking for is going to be stored inside req.body
		const user = { ...req.body }

		const createdUser = await User.create(user)
		res.status(201).json(createdUser)
	} catch (error) {
		console.log(error.message)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const oneUser = await User.findById(req.params.id)
		res.json(oneUser)
	} catch (error) {
		console.log(error.message)
	}
})

router.get("/:id/favorites", async (req, res, next) => {
	const { id } = req.params
	try {
		const AllFavoritesOfUser = await Favorite.find({ userId: id }).populate(
			"costumeId",
			"title description"
		)
		res.json(AllFavoritesOfUser)
	} catch (error) {
		console.log(error.message)
	}
})

router.post("/:id/favorites", async (req, res, next) => {
	/**
	 * The id of the user is in the URL
	 * The id of the Costume is inside the req.body
	 */
	const { id } = req.params
	const { costumeId } = req.body
	const favoriteToCreate = { userId: id, costumeId }
	try {
		const createdFavorite = await Favorite.create(favoriteToCreate)
		res.json(createdFavorite)
	} catch (error) {
		console.log(error.message)
	}
})

module.exports = router
