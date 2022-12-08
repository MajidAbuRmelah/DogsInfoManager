import '../css/App.css';
import React, { useState, useEffect } from 'react';
import Item from './Item.js';
import Modal from './Modal.js';
import Loading from './Loading';
import { StopPropagation } from '../services/General';
import HttpRequest from '../services/HttpUtilities';
import { DeleteDog, GetDogs } from '../constants/APICollection';
import { Errors, AppStrings, ImagePaths } from '../constants/Strings';
import ModalOptions from '../models/ModalOptions';

function App() {
  const [items, setItems] = useState([]);
  const [modalOptions, setModalOptions] = useState(new ModalOptions(false)); //Explanation: We are using an object to avoid too many re-renders.
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Run async function to fetch items.
    let isSubscribed = true;
    const getItems = async () => {
      if (!isSubscribed) {
        return;
      }
      setIsLoading(true);
      let response = await HttpRequest(GetDogs.path, GetDogs.type);
      if (!response.isSuccess) {
          alert(Errors.HttpErrorMessage);
          setIsLoading(false);
          return;
      }
      setItems(response.data.dogs);
      setIsLoading(false);
    };
    getItems();
    return () => isSubscribed = false;
  }, []);
  /*** Defind Arrow Functions ***/
  const addItemCallBack = (item) => {
    setItems([...items, item]);
  };
  const editItemCallBack = (itemToEdit) => {
    setItems(items.map((item) => {
      if (item.id === itemToEdit.id) {
        return itemToEdit;
      }
      return item;
    }));
  };
  const removeItemCallBack = async (id) => {
    let response = await HttpRequest(DeleteDog.path, DeleteDog.type, null, id);
    if (!response.isSuccess) {
        alert(Errors.HttpErrorMessage);
        return;
    }
    setItems(items.filter((item) => item.id !== id));
  }
  const openModal = (item = null) => {
    setModalOptions(new ModalOptions(true, item));
  }
  const closeModalCallBack = () => setModalOptions(new ModalOptions(false, null));
  return (
    <div id='app-wrapper'>
      <main id='app-main'>
        <header id='app-header'>
          <div id='hero-container'>
            <h1>{AppStrings.Title}</h1>
            <p id='hero-content'>{AppStrings.Description}</p>
            <button onClick={() => openModal()} className='action-button'>
              <span>{AppStrings.ActionButton}</span><i className='fa-regular fa-plus action-plus-icon'></i>
            </button>
          </div>
          <img className='hero-image' src={ImagePaths.DogImage.path} alt={ImagePaths.DogImage.alt} />
        </header>
        <div id='items-container'>
          { items.map((item) => ( <Item key={item.id} itemObject={item} editItemCallBack={openModal} removeItemCallBack={removeItemCallBack} /> )) }
        </div>
      </main>
      <Modal modalOptions={modalOptions} setIsLoading={setIsLoading} editItemCallBack={editItemCallBack} addItemCallBack={addItemCallBack} closeModalCallBack={closeModalCallBack} />
      <div className='loading-container' onClick={StopPropagation}>
        <Loading isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;