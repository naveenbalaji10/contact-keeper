import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContact, loaded } = contactContext;
  useEffect(() => {
    getContact();
    // eslint-disable-next-line
  }, []);
  if (contacts !== null && contacts.length === 0 && !loaded) {
    return <h3>please add contacts</h3>;
  }

  return (
    <Fragment>
      {contacts !== null && !loaded ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="items"
                >
                  <ContactItem key={contact._id} contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="items"
                >
                  <ContactItem key={contact._id} contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
