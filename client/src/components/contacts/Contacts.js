import React, { useContext, Fragment } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";

function Contacts() {
  const contactContext = useContext(ContactContext);

  // We can now use the contacts from the ContactState
  const { contacts } = contactContext;
  return (
    <Fragment>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
}

export default Contacts;
