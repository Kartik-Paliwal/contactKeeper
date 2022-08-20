import React, { useContext, useState } from "react";
import ContactContext from "../Context/contact/Contactcontext";
const AddContact = () => {
  const context = useContext(ContactContext);
  const { addContact } = context;
  const [Contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type:"personal",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    addContact(Contact.name, Contact.email, Contact.phone, Contact.type);
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "",
    });
  };
  const onChange=(e)=>{
    const {name,value}=e.target
    setContact({...Contact,[name]:value});
  }
  return (
    <div className="container my-3">
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            id="name"
            name="name"
            value={Contact.name}
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={Contact.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={Contact.phone}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <h4>Type</h4>
          <div>
            <input
              className="form-check-input"
              type="radio"
              name="type"
              id="choice1"
              value="personal"
              onChange={onChange}
              checked
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Personal
            </label>
          </div>
          <div>
            <input
              className="form-check-input"
              type="radio"
              name="type"
              id="choice2"
              value="professional"
              onChange={onChange}
              
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Professional
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          //   disabled={note.title.length < 3 || note.description.length < 5||note.tag.length<1}
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;
