import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm'
import SearchBox from './components/SearchBox/SearchBox'
import ContactList from './components/ContactList/ContactList'
import './App.css'

function App() {

   const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem('saved-contacts');
    if (savedContacts) {
      return JSON.parse(savedContacts);
    }
    return [];
  });

  const addContact = newContact => {
    setContacts(contacts => {
      return [...contacts, newContact];
    });
  };

  const [filter, setFilter] = useState('');

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteContact = contactId => {
    setContacts(contacts => {
      return contacts.filter(contact => contact.id !== contactId);
    });
  };

  useEffect(() => {
    window.localStorage.setItem('saved-contacts', JSON.stringify(contacts));
  }, [contacts]);


  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={addContact} />
        <SearchBox value={filter} onSearch={setFilter} />
        <ContactList
          contacts={filterContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    </>
  )
}

export default App
