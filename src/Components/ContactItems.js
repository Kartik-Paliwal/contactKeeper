import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faEnvelope,
  faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
import ContactContext from "../Context/contact/Contactcontext";
const ContactItems = (props) => {
  const context = useContext(ContactContext);
  const { deleteContact } = context;
  let { updateContact, contact } = props;
  let { name, email, phone, type } = contact;
  return (
    <div>

    <div className="card my-3 mx-3">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <a href={`mailto: ${email}`} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faEnvelope} /> {email}
          </a>
        </p>
        <p className="card-text">
          <a href={`tel:${phone}`}>
            <FontAwesomeIcon icon={faPhoneFlip} /> {phone}
          </a>
        </p>
        <p className="card-text">
          <small className="text-muted">{type}</small>
        </p>
        <FontAwesomeIcon
          icon={faTrashCan}
          className="mx-3 my-3"
          onClick={() => {
            deleteContact(contact._id);
          }}
          />

        <FontAwesomeIcon
          icon={faPenToSquare}
          className="mx-3 my-3"
          onClick={() => {
            // console.log(contact._id);
            updateContact(contact);
          }}
          />
      </div>
    </div>
          </div>
  );
};

export default ContactItems;
