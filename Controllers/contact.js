// Controllers/contact.js
import Contact from "../Models/contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, type } = req.body;

    if (!name || !email || !phone || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user._id, // comes from isAuthenticated middleware
    });

    await newContact.save();
    res.status(201).json({ message: "Contact created successfully", contact: newContact });
  } catch (error) {
    res.status(500).json({ message: "Error creating contact" });
  }
};

// update contact by id
export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, type } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone, type },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact updated successfully", contact: updatedContact });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Error updating contact" });
  }
};

// get one contact

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

// get contact by id
export const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact fetched successfully", contact });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ message: "Error fetching contact" });
  }
};


// Delete contact By id
export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Error deleting contact" });
  }
};


// get contact by user id
export const getContactsByUserId = async (req, res) => {
  const userId = req.params.id; // Get user ID from the request parameters
  try {
    const contacts = await Contact.find({ user: userId });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};