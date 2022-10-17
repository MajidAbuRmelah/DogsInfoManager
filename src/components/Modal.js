import '../css/Modal.css';
import React, { useEffect, useState } from 'react';
import FormItem from './FormItem';
import SubmitButton from './SubmitButton';
import GenderEnum from '../constants/GenderEnum';
import Gender from '../models/Gender';
import Dog from '../models/Dog';
import { StopPropagation } from '../services/General';
import { IsEmpty, IsGenderValid } from '../services/ValidationHelper';
import HttpRequest from '../services/HttpUtilities';
import { AddDog, UpdateDog } from '../constants/APICollection';
import { GeneralStrings, Errors, ModalStrings } from '../constants/Strings';

function Modal({modalOptions, setIsLoading, editItemCallBack, addItemCallBack, closeModalCallBack}) {
    //Explanation: Define states and useEffect before any conditional statement.
    const [name, setName] = useState("");
    const [age, setAge] = useState(0.0);
    const [breed, setBreed] = useState("");
    const [gender, setGender] = useState(GenderEnum.Male);
    const [nameHasError, setNameHasError] = useState(false);
    const [ageHasError, setAgeHasError] = useState(false);
    const [breedHasError, setBreedHasError] = useState(false);
    const isEdit = modalOptions.itemToEdit != null;
    useEffect(() => {
        //Explanation: We set the values in useEffect to avoid too many re-renders issue.
        if (isEdit) {
            setName(modalOptions.itemToEdit.name);
            setAge(modalOptions.itemToEdit.age);
            setBreed(modalOptions.itemToEdit.breed);
            setGender(modalOptions.itemToEdit.gender);
        }
    }, [isEdit, modalOptions.itemToEdit]);
    if (!modalOptions.isOpen) {
        return null;
    }
    /*** Initialize Data ***/
    let isValid = true;
    let title = ModalStrings.Title;
    let buttonContent = ModalStrings.ButtonContent;
    if (isEdit) {
        title = ModalStrings.TitleEdit;
        buttonContent = ModalStrings.ButtonContentEdit;
    }
    const minimumAge = 0.0; //Explanation: The data type which most closely reflects the aging process should be a float and not an integer.
    const fieldsSettings = { isNameRequired: true, isAgeRequired: true, isBreedRequired: true };
    const gendersObjects = [new Gender(GenderEnum.Male, GeneralStrings.Male), new Gender(GenderEnum.Female, GeneralStrings.Female)];
    /*** Define Arrow Functions ***/
    const handleChange = (e, callback) => {
        let thisElement = e.target;
        thisElement.classList.remove("hasError"); //Explanation: Whether the element is highlighted with an error class or not and has changed, remove the error class anyway. 
        callback(thisElement.value);
    }
    const resetHasError = () => {
        setNameHasError(false);
        setAgeHasError(false);
        setBreedHasError(false);
    };
    const resetForm = () => {
        setName("");
        setAge(0);
        setBreed("");
        setGender(GenderEnum.Male);
        resetHasError();
    };
    const closeModal = () => {
        resetForm();
        closeModalCallBack();
    }
    const validateInput = (condition, callback = null) => {
        if (!condition) {
            return;
        }
        if (callback != null) {
            callback(true);
        }
        isValid = false;
    };
    const submitForm = async (e) => {
        e.preventDefault(); //Explanation: Avoid default form behavior including page refresh.
        isValid = true;
        setIsLoading(true);
        resetHasError();
        validateInput(fieldsSettings.isNameRequired && IsEmpty(name), setNameHasError);
        validateInput(fieldsSettings.isAgeRequired && age <= 0, setAgeHasError);
        validateInput(fieldsSettings.isBreedRequired && IsEmpty(breed), setBreedHasError);
        validateInput(!IsGenderValid(Number(gender)));
        if (!isValid) {
            setIsLoading(false);
            return;
        }
        let response, callback, jsonData = { name: name, age: age, breed: breed, gender: gender };
        if (isEdit) {
            response = await HttpRequest(UpdateDog.path, UpdateDog.type, jsonData, modalOptions.itemToEdit.id);
            callback = editItemCallBack;
        } else {
            response = await HttpRequest(AddDog.path, AddDog.type, jsonData);
            callback =  addItemCallBack;
        }
        if (!response.isSuccess) {
            alert(Errors.HttpErrorMessage);
            return;
        }
        let item = new Dog(isEdit ? modalOptions.itemToEdit.id : response.data.insertID, name, parseInt(age), breed, gender);
        callback(item);
        setIsLoading(false);
        closeModal();
    };
    return (
        <div className='overlay' onClick={closeModal}>
            <div className='modal-container' onClick={StopPropagation}>
                <div className='modal-content'>
                    <h1 className='modal-title'>{title}</h1>
                </div>
                <div className='close-button' onClick={closeModal}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <form className='modal-form' onSubmit={submitForm}>
                    <div className='modal-inputs'>
                        <FormItem forAttribute="input_name" title="Name" isRequired={fieldsSettings.isNameRequired}>
                            <input id="input_name" className={nameHasError ? 'hasError' : null} type="text" value={name} onChange={e => handleChange(e, setName)} />
                        </FormItem>
                        <FormItem forAttribute="input_age" title="Age" isRequired={fieldsSettings.isAgeRequired}>
                            <input id="input_age" className={ageHasError ? 'hasError' : null} type="number" min={minimumAge} value={age} onChange={e => handleChange(e, setAge)} />
                        </FormItem>
                        <FormItem forAttribute="input_breed" title="Breed" isRequired={fieldsSettings.isBreedRequired}>
                            <input id="input_breed" className={breedHasError ? 'hasError' : null} type="text" value={breed} onChange={e => handleChange(e, setBreed)} />
                        </FormItem>
                        <FormItem forAttribute="input_gender" title="Gender">
                            <select id="input_gender" value={gender} onChange={e => handleChange(e, setGender)}>
                                {gendersObjects.map((genderObject) => <option key={genderObject.id} value={genderObject.id}>{genderObject.name}</option>)}
                            </select>
                        </FormItem>
                    </div>
                    <SubmitButton content={buttonContent} className="modal-form-button" />
                </form>
            </div>
        </div>
    );
}

export default Modal;