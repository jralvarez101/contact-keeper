import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

//Setup initial state (Hard coded for now)

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill Johnson",
        email: "jill@gmail.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Sara Watson",
        email: "sara@gmail.com",
        phone: "222-222-2222",
        type: "personal",
      },
      {
        id: 3,
        name: "Harry White",
        email: "harry@gmail.com",
        phone: "333-333-3333",
        type: "professional",
      },
    ],
  };

  // State allows us to access the sate and dispatch allows us to dispatch to our reducer

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Setup Actions

  const addContact = (contact) => {
    // uuid will add a random id to the contact that was submitted in the contact form since
    // at the moment we are not using the api yet.
    contact.id = uuid.v4();

    // Then we dispatch the contact
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // --- Delete Contact

  // --- Set Current Contact

  // --- Clear Current Contact

  // --- Update Contact

  // --- Filter Contacts

  // --- Clear Filter

  // return everything wrapped in provider
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
