import React, { useContext, useEffect } from "react";
import ContactFilter from "../components/contacts/contactFilter";
import ContactForm from "../components/contacts/ContactForm";
import Contacts from "../components/contacts/Contacts";
import AuthContext from "../context/auth/AuthContext";
const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
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
