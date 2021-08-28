import React, { useContext, useEffect, useRef } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContact, clearFilter, filtered } = contactContext;
  const search = useRef("");

  useEffect(() => {
    if (filtered === null) {
      search.current.value = "";
    }
  });

  const onChange = (e) => {
    if (search.current.value !== "") {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={search}
        type="text"
        placeholder="filter contacts.."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
