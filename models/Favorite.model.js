const { Schema, model } = require("mongoose")

const favoriteSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		costumeId: {
			type: Schema.Types.ObjectId,
			ref: "Costume",
		},
	},
	{
		timestamps: true,
	}
)

const Favorite = model("Favorite", favoriteSchema)

module.exports = Favorite
