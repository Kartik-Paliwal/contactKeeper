import { useState } from "react";
import ContactContext from "./Contactcontext";

const ContactState = (props) => {
  const contactInitals = [];
  const [Contacts, setContacts] = useState(contactInitals);

  let contact = [
    {
      _id: "61",
      user: "62ea68fbb931aa27465453bc",
      name: "kartik",
      email: "paliwal@gmail.com",
      phone: "9910935031",
      type: "personal",
      __v: 0,
    },
    {
      _id: "62",
      user: "62ea68fbb931aa27465453bc",
      name: "kartik",
      email: "paliwal@gmail.com",
      phone: "9910935032",
      type: "personal",
      __v: 0,
    },
    {
      _id: "63",
      user: "62ea68fbb931aa27465453bc",
      name: "kartik",
      email: "paliwal@gmail.com",
      phone: "9910935033",
      type: "personal",
      __v: 0,
    },
  ];
  const getContact = () => {
    setContacts(contact);
  };
  const addContact = (name, email, phone, type) => {
    const contact = {
      _id: "70",
      user: "62ea68fbb931aa27465453bc",
      name: name,
      email: email,
      phone: phone,
      type: type,
      __v: 0,
    };
    setContacts(Contacts.concat(contact));
  };
  const deleteContact = (id) => {
    const newContacts = Contacts.filter((contact) => {
      return contact._id !== id;
    });
    setContacts(newContacts);
  };
  const editContact = (id,name, email, phone, type) => {
    // const contact = {
    //   _id: id,
    //   user: "62ea68fbb931aa27465453bc",
    //   name: name,
    //   email: email,
    //   phone: phone,
    //   type: type,
    //   __v: 0,
    // };
    const newContacts = Contacts.map((contact) => {
        if(contact._id === id){
            return {...contact,name,email,phone,type}
        }
      });
      setContacts(newContacts)
  };
  return (
    <ContactContext.Provider
      value={{Contacts, getContact, addContact, deleteContact, editContact}}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
