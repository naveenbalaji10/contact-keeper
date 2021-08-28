import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
const ContactForm = () => {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    type: "personal",
  });
  const { name, phone, email, type } = contact;
  const contactContext = useContext(ContactContext);
  const { addContact, clearCurrent, updateContact, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        phone: "",
        email: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  const onchange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clickClear();
  };
  const clickClear = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Update contact" : "Add contact"}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={name}
        onChange={onchange}
      />
      <input
        type="email"
        name="email"
        placeholder="email"
        value={email}
        onChange={onchange}
      />
      <input
        type="text"
        name="phone"
        placeholder="phone"
        value={phone}
        onChange={onchange}
      />
      <h4>Contact Type</h4>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={onchange}
        checked={type === "personal"}
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={onchange}
        checked={type === "professional"}
      />
      Professional
      <div>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value={current ? "Edit contact" : "Add contact"}
        />
        {current && (
          <div>
            <button className="btn btn-light btn-block" onClick={clickClear}>
              clear{" "}
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
