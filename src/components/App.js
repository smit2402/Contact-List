import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Addcontact from "./Addcontact";
import Contactlist from "./Contactlist";
import api from "../api/contacts";
import { uuid } from "uuidv4";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  const [contacts, setcontacts] = useState([]);
  const LOCAL_STORAGE_KEY = "contacts";
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  //retrive contacts

  const retrivecontact = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    console.log(response.data);
    setcontacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setcontacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    )
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactlist = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactlist);

    }
    else {
      setSearchResult(contacts);
    }
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);

    const newContactlist = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setcontacts(newContactlist);
  };

  useEffect(() => {
    //  const retrivecontact = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //   if (retrivecontact) setcontacts(retrivecontact);
    const getAllContacts = async () => {
      const allContacts = await retrivecontact();
      if (allContacts) setcontacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Contactlist
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResult}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />

          <Route
            path="/add"
            render={(props) => (
              <Addcontact {...props} addContactHandler={addContactHandler} />
            )}
          />
       

          <Route
            path="/edit"
            render={(props) => (
              <EditContact {...props} updateContactHandler={updateContactHandler} />
            )} />


          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>

        {/* <Addcontact addContactHandler={addContactHandler}/> */}
        {/* <Contactlist contacts={contacts} getContactId={removeContactHandler}/> */}
      </Router>
    </div>
  );
}

export default App;
