import { createContext, useEffect, useState } from "react";
export const Context = createContext();

export const Provider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSaerch] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setType] = useState("list");
  useEffect(() => {
    (async () => {
      const rawResponse = await fetch("http://localhost:3000/contact");
      const content = await rawResponse.json();
      setContacts(content);
    })();
  }, []);

  const setNewContact = async (data) => {
    const rawResponse = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const content = await rawResponse.json();

    setContacts([...contacts, content]);
  };

  const setUpdatedContact = async (data) => {
    const rawResponse = await fetch(
      "http://localhost:3000/contact/" + data.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const content = await rawResponse.json();

    let index = contacts.findIndex((i) => i.id === content.id);
    console.log("content", content, index);
    let nContacts = [...contacts];
    if (index > -1) {
      nContacts[index] = content;
    }
    setContacts(nContacts);
  };
  const setDeleteContact = async (data) => {
    const rawResponse = await fetch(
      "http://localhost:3000/contact/" + data.id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const content = await rawResponse.json();
    let nContacts = contacts.filter((i) => i.id !== content.id);
    setContacts(nContacts);
  };
  const contactInfo = {
    contacts,
    setContacts,
    type,
    setType,
    search,
    setSaerch,
    deleteItem,
    setDeleteItem,
    selectedItem,
    setSelectedItem,
    setNewContact,
    setUpdatedContact,
    setDeleteContact,
  };
  return <Context.Provider value={contactInfo}>{children}</Context.Provider>;
};
