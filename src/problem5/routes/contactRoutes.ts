import express from 'express';
import {
	createContact,
	deleteContact,
	getContact,
	getContacts,
	updateContact,
} from '../controllers/contactController';
import { validateToken } from '../middlewares/validateTokenHandler';
export default (router: express.Router) => {
	// Validate before give actions
	router.use(validateToken);

	router.post('/api/contacts', getContacts);

	router.post('/api/contacts/create', createContact);

	router.get('/api/contacts/:id', getContact);

	router.put('/api/contacts/:id', updateContact);

	router.put('/api/contacts/delete/:id', deleteContact);

	return router;
};
