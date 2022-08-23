import { useState } from "react";
import ContactContext from "./Contactcontext";

const ContactState = (props) => {
  const contactInitals = [];
  const [Contacts, setContacts] = useState(contactInitals);
  const host = "http://localhost:5000";
  const authToken =localStorage.getItem("token");
    
  const getContact = async () => {
    const response = await fetch(`${host}/api/c/fetchallcontacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    const json = await response.json();
    setContacts(json);
  };
  const addContact = async (name, email, phone, type) => {
    const response = await fetch(`${host}/api/c/addcontact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({ name, email, phone, type }),
    });
    const json = await response.json();
    setContacts(Contacts.concat(json));
    getContact();
  };
  const deleteContact = async (id) => {
    const response = await fetch(`${host}/api/c/deletecontact/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    const newContacts = Contacts.filter((contact) => {
      return contact._id !== id;
    });
    setContacts(newContacts);
  };
  const editContact = async (id, name, email, phone, type) => {
    const response = await fetch(`${host}/api/c/updatecontact/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({ name, email, phone, type }),
    });
    
       const newContacts = Contacts.map((contact) => {
      if (contact._id === id) {
        return { ...contact, name, email, phone, type };
      }
      return contact;
    });
    setContacts(newContacts);
  };
  return (
    <ContactContext.Provider
      value={{ Contacts, getContact, addContact, deleteContact, editContact }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
