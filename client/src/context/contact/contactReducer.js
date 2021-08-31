import {
  ADD_CONTACT,
  GET_CONTACTS,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
} from "../types";

const ContactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS: {
      return {
        ...state,
        contacts: action.payload,
        loaded: false,
      };
    }
    case CLEAR_CONTACTS: {
      return {
        ...state,
        contacts: null,
        filtered: null,
        current: null,
        error: null,
      };
    }
    case ADD_CONTACT: {
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loaded: false,
      };
    }
    case UPDATE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload.id ? action.payload : contact
        ),
        loaded: false,
      };
    }
    case CONTACT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case DELETE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
        loaded: false,
      };
    }
    case SET_CURRENT: {
      return {
        ...state,
        current: action.payload,
      };
    }
    case CLEAR_CURRENT: {
      return {
        ...state,
        current: null,
      };
    }
    case FILTER_CONTACT: {
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        }),
        loaded: false,
      };
    }
    case CLEAR_FILTER: {
      return {
        ...state,
        filtered: null,
      };
    }
    default: {
      return state;
    }
  }
};
export default ContactReducer;
