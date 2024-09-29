import { useContext } from "react";
import ContactList from "./ContactList";
import { v4 } from "uuid";
import styles from "./contact.module.css";
import ContactAddForm from "./ContactAddForm";
import { Context } from "../context";

function ContactForm() {
  const {
    contacts = [],
    type,

    setType,
    search,
    setSaerch,
    selectedItem,
    setSelectedItem,
    deleteItem,
    setDeleteItem,
    setNewContact,
    setUpdatedContact,
    setDeleteContact,
  } = useContext(Context);
  const onChange = ({ item, type }) => {
    if (type === "add") {
      setNewContact({ ...item, id: v4() });
    } else if (type === "edit") {
      setUpdatedContact(item);
    }
    setSelectedItem(null);
    setType("list");
  };
  const onDelete = (item) => {
    setDeleteItem(item);
  };
  const deleteFunc = (type) => {
    if (type === "ok") {
      setDeleteContact(deleteItem);
    }
    setDeleteItem(null);
  };
  return (
    <div className={styles.container}>
      {(deleteItem?.id && (
        <div className={styles.confirmModal}>
          <div className={styles.modalContent}>
            <div>Are you sure you want to delete this item?</div>
            <div className={styles.modalAction}>
              <button onClick={() => deleteFunc("ok")}>ok</button>
              <button onClick={() => deleteFunc("cancel")}>cancel</button>
            </div>
          </div>
        </div>
      )) ||
        null}
      {(type === "list" && (
        <>
          <div className={styles.head}>
            <input
              type={"text"}
              name={"search"}
              placeholder={"search"}
              value={search || ""}
              className={styles.search}
              onChange={(e) => setSaerch(e.target.value)}
            />
            <button onClick={() => setType("add")}>Add contact</button>
          </div>

          <ContactList
            search={search}
            contacts={contacts}
            onEdit={(item) => {
              setSelectedItem(item);
              setType("edit");
            }}
            onDelete={onDelete}
          />
        </>
      )) ||
        null}
      {(["add", "edit"].includes(type) && (
        <ContactAddForm
          type={type}
          selectedItem={selectedItem}
          onChange={onChange}
          onCancel={() => {
            setType("list");
            setSelectedItem(null);
          }}
        />
      )) ||
        null}
    </div>
  );
}

export default ContactForm;
