import express from 'express';
import Contact from '../models/contactModel';

/**
 * @desc Get all Contacts
 * @route POST /api/contacts
 * @access private
 */
export const getContacts = async (
	req: express.Request | any,
	res: express.Response,
) => {
	try {
		const { email, phone, sortByCreatedAt, sortByUpdatedAt, page, limit } =
			req.body;

		const filter: any = { user_id: req.user._id, deletedDate: null };

		if (email) {
			filter.email = email;
		}

		if (phone) {
			filter.phone = phone;
		}

		let sortOptions: any = {};

		if (sortByCreatedAt) {
			sortOptions.createdAt = sortByCreatedAt === 'asc' ? 1 : -1;
		}

		if (sortByUpdatedAt) {
			sortOptions.updatedAt = sortByUpdatedAt === 'asc' ? 1 : -1;
		}
		const pageIndex = parseInt(page) || 0;
		const pageSize = parseInt(limit) || 10;
		const contacts = await Contact.find(filter)
			.sort(sortOptions)
			.skip(pageIndex * pageSize)
			.limit(pageSize);

		return res.status(200).json(contacts);
	} catch (err) {
		return res.status(400).json({ message: 'Error when get all contacts!' });
	}
};

/**
 * @desc Create new contact
 * @route POST /api/contacts
 * @access private
 */
export const createContact = async (
	req: express.Request | any,
	res: express.Response,
) => {
	try {
		const { name, email, phone } = req.body;
		console.log({ name, email, phone });

		if (!name || !email || !phone) {
			return res.status(400).json({ message: 'Missing parameters!' });
		}
		const contact = await Contact.create({
			user_id: req.user._id,
			name,
			email,
			phone,
		});

		return res.status(201).json(contact);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: 'Error when creating contact!' });
	}
};

/**
 * @desc Get contact by id
 * @route GET /api/contacts/:id
 * @access private
 */
export const getContact = async (
	req: express.Request | any,
	res: express.Response,
) => {
	try {
		const { id } = req.params;
		const contact = await Contact.findOne({
			_id: id,
			user_id: req.user._id,
		});

		if (!contact) {
			return res.status(404).json({ message: 'Contact not found!' });
		}

		return res.status(200).json(contact);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: 'Error when get contact!' });
	}
};

/**
 * @desc Update contact
 * @route PUT /api/contacts/:id
 * @access private
 */
export const updateContact = async (
	req: express.Request | any,
	res: express.Response,
) => {
	try {
		const { id } = req.params;
		const { phone, email, name } = req.body;
		const updatedContact = await Contact.findOneAndUpdate(
			{
				_id: id,
				user_id: req.user._id,
			},
			{
				user_id: req.user._id,
				phone: phone,
				email: email,
				name: name,
				updatedDate: new Date(),
			},
			{ new: true },
		);

		if (updatedContact && updatedContact.user_id.toString() !== req.user._id) {
			return res.status(403).json({
				message: "Don't have permission to update other user contacts!",
			});
		}

		if (!updatedContact) {
			return res.status(404).json({ message: 'Contact not found!' });
		}

		return res.status(200).json(updatedContact);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: 'Error when update contact!' });
	}
};

/**
 * @desc Delete a contact
 * @route Delete /api/contacts/:id
 * @access private
 */
export const deleteContact = async (
	req: express.Request | any,
	res: express.Response,
) => {
	try {
		const { id } = req.params;
		const contact = await Contact.findOneAndUpdate(
			{
				_id: id,
				user_id: req.user._id,
			},
			{
				deletedDate: new Date(),
			},
			{
				new: true,
			},
		);
		console.log(contact);
		if (contact.user_id.toString() !== req.user._id) {
			return res.status(403).json({
				message: "Don't have permission to update other user contacts!",
			});
		}

		if (!contact) {
			return res.status(404).json({ message: 'Contact not found!' });
		}

		return res.status(200).json(contact);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: 'Error when delete contact!' });
	}
};
