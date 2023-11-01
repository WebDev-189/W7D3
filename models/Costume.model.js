const { Schema, model } = require("mongoose")

const MIN_PRICE = 10

const costumeSchema = new Schema(
	{
		title: {
			type: String,
			minLength: 5,
			validate: {
				validator: function (title) {
					return title[0] === title[0].toUpperCase()
				},
				message: (props) =>
					`${props.value} needs to start with a capital letter`,
			},
		},
		size: {
			enum: ["XL", "L", "M", "S", "XS"],
			type: String,
			required: true,
		},
    colors: [String]
		price: {
			type: Number,
			min: MIN_PRICE,
			default: MIN_PRICE,
		},
		description: {
			type: String,
			maxLength: 500,
			required: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
)

const Costume = model("Costume", costumeSchema)

module.exports = Costume
