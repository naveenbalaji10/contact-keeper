import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT,
} from "../types";
const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Naveen",
        email: "naveen@gmail.com",
        phone: "9090909090",
        type: "personal",
      },
      {
        id: 2,
        name: "kumar",
        email: "kumar@gmail.com",
        phone: "9090000000",
        type: "personal",
      },
      {
        id: 3,
        name: "ram",
        email: "ram@gmail.com",
        phone: "1111111111",
        type: "professional",
      },
    ],
    current: null,
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);
  //ADD_CONTACT
  const addContact = (contact) => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  //DELETE_CONTACT
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //SET_CURRENT
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //CLEAR_CURRENT
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //UPDATE_CONTACT
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  //FILTER_CONTACTS

  //CLEAR_FILTER

  //SET_ALERT

  // REMOVE_ALERT

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
