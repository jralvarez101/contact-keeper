import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

function ContactForm() {
  // initialize context to change the state of the contact Context so we can add contact
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, updateContact } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  // local state for form
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  // onChange , we first spread the current state with ...contact then we change what was clicked [e.targe.name]
  // makes it so we only use one onChange listener for all inputs and we change it to e.target.value
  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  // onSubmit the function will take the current state of the form and pass it to contactContext to call
  // the function addContact with the parameter contact.
  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={onChange}
        defaultChecked={type === "personal"}
      />
      Personal{""}
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={onChange}
        defaultChecked={type === "professional"}
      />
      Professional
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
}

export default ContactForm;
