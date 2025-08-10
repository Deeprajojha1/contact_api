import express from "express"
import {createContact,getContacts,getContactById,updateContact,deleteContact,getContactsByUserId  } from "../Controllers/contact.js";
import { isAuthenticated } from "../Middlewares/Auth.js";
const router=express.Router()

// New Contact
// @ dec:-create contact
// @api method :-post
// @api url :-/api/contact/new
router.post("/new", isAuthenticated, createContact);

// Get All Contacts
// @ dec:-get all contacts
// @api method :-get
// @api url :-/api/contact
router.get("/", getContacts);

// Get Contact By ID
// @ dec:-get contact by id
// @api method :-get
// @api url :-/api/contact/:id
router.get("/:id", getContactById);

// Update Contact By ID
// @ dec:-update contact by id
// @api method :-put
// @api url :-/api/contact/:id
router.put("/:id",isAuthenticated, updateContact);

// Delete Contact By ID
// @ dec:-delete contact by id
// @api method :-delete
// @api url :-/api/contact/:id
router.delete("/:id",isAuthenticated, deleteContact);


// get user specific contacts
router.get("/user/:id", isAuthenticated, getContactsByUserId);

export default router;
