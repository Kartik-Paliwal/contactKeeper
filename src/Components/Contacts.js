
import React, { useEffect, useContext } from "react";
import Addnote from "./Addcontact";
import Showcontacts from "./Showcontacts";
import ContactContext from "../Context/contact/Contactcontext";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  let history = useNavigate();
  const context = useContext(ContactContext);
  const { getContact } = context;
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history("/login");
    } else {
      getContact();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Addnote />
      <Showcontacts />
    </>
  );
};

export default Contacts;
