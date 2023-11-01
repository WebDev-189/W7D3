const mongoose = require("mongoose")

mongoose
	.connect(process.env.MONGODB_URI)
	.then((db) => {
		console.log(`Connected to ${db.connection.name}`)
	})
	.catch((error) => console.log(error.message))
