import React from "react";
import ContactFilter from "../components/contacts/contactFilter";
import ContactForm from "../components/contacts/ContactForm";
import Contacts from "../components/contacts/Contacts";
const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
