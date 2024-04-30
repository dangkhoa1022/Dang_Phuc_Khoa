import mongoose, { models } from 'mongoose';

const contactSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: [true, 'Please add the contact name!'],
		},
		email: {
			type: String,
			required: [true, 'Please add the contact email address!'],
		},
		phone: {
			type: String,
			required: [true, 'Please add the phone number!'],
		},
		deletedDate: {
			type: Date,
			default: null,
		},
	},
	{ timestamps: true },
);

const Contact =
	mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default Contact;
