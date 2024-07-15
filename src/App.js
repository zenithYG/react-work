import './App.css';
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const App = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [updateInputs, setUpdateInputs] = useState({});

  useEffect(() => {
    readData(); // Load data initially
  }, []);

  const createData = async () => {
    try {
      const newIndex = data.length + 1; // Index based on current length of data
      const name = input.trim() === '' ? `Item ${newIndex}` : input;
      await addDoc(collection(db, 'items'), { name });
      alert('Data added successfully');
      setInput(''); // Clear input field
      readData(); // Refresh the list after adding
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const readData = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setData(items);
    setUpdateInputs(items.reduce((acc, item) => ({ ...acc, [item.id]: item.name }), {})); // Initialize updateInputs
  };

  const handleUpdateInputChange = (id, value) => {
    setUpdateInputs(prevState => ({ ...prevState, [id]: value }));
  };

  const updateData = async (id) => {
    const docRef = doc(db, 'items', id);
    try {
      await updateDoc(docRef, { name: updateInputs[id] });
      alert('Data updated successfully');
      readData(); // Refresh the list after updating
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

  const deleteData = async (id) => {
    const docRef = doc(db, 'items', id);
    try {
      await deleteDoc(docRef);
      alert('Data deleted successfully');
      readData(); // Refresh the list after deleting
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

  return (
    <div className="app-container">
      <h1>Firestore CRUD</h1>
      <div className="create-section">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter item name" />
        <button onClick={createData}>Create</button>
      </div>
      <button className="read-button" onClick={readData}>Read</button>
      <ul className="item-list">
        {data.map(item => (
          <li key={item.id} className="item">
            <input 
              type="text" 
              value={updateInputs[item.id] || ''} 
              onChange={(e) => handleUpdateInputChange(item.id, e.target.value)} 
            />
            <button onClick={() => updateData(item.id)}>Update</button>
            <button onClick={() => deleteData(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;