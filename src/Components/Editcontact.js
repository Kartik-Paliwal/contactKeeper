import React, { useRef, useContext, useState ,useEffect} from "react";
import ContactItems from "./ContactItems";
import ContactContext from "../Context/contact/Contactcontext";

const EditContact = () => {
  const [contact, setContact] = useState({
    ename: "",
    eemail: "",
    ephone: "",
    etype: "personal",
    id:""
  });
  const context = useContext(ContactContext);
  const { Contacts ,editContact} = context;

  const ref = useRef(null);
  const refClose = useRef(null);
  const updateContact = (currentContact) => {
    ref.current.click();
    setContact({
      id: currentContact._id,
      ename: currentContact.name,
      ephone: currentContact.phone,
      eemail: currentContact.email,
      etype: currentContact.type      
    })
    // console.log(currentContact._id)
  };
  const handleClick = () => {
    editContact(contact.id,contact.ename,contact.eemail,contact.ephone,contact.etype)
    refClose.current.click();
  };
  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const element = <h3>Your Contacts</h3>;
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="container">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Contact
                </h5>
                {/* <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button> */}
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  id="name"
                  name="ename"
                  value={contact.ename}
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
                  type="text"
                  className="form-control"
                  id="email"
                  name="eemail"
                  value={contact.eemail}
                  onChange={onChange}
                  minLength={5}
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
                  name="ephone"
                  value={contact.ephone}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <h4>Type</h4>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="etype"
                    id="choice1"
                    onChange={onChange}
                    value="personal"
                    checked={contact.etype==="personal" }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Personal
                  </label>
                </div>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="etype"
                    id="choice2"
                    onChange={onChange}
                    value="professional"
                    checked={contact.etype==="professional" }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Professional
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        {Contacts.length!== 0 && element}
        <div className="card-group">
          {Contacts.map((contact)=>{
            return (
              <div  key={contact._id}>

              <ContactItems
             
              updateContact={updateContact}
              contact={contact}
              />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default EditContact;
