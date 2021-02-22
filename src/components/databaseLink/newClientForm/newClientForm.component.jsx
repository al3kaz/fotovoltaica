import React from 'react'
import firebase from 'firebase/app';
import 'firebase/firestore';
import FormInput from '../../form-input/form-input.component';

const db = firebase.firestore();

const NewOfferForm = () => {
   const [typeOfClient, setTypeOfClient] = React.useState()
   const [clientCredentials, setClientCredentials] = React.useState({
      companyName: '',
      NIP: '',
      contactPerson: '',
      city: '',
      contactSource: '',
      email: '',
      firstname: '',
      houseNumber: '',
      pesel: '',
      phoneNumber: '',
      postalCode: '',
      street: '',
      surname: '',
   });
   const {
      companyName,
      NIP,
      contactPerson,
      firstname,
      surname,
      pesel,
      phoneNumber,
      email,
      street,
      houseNumber,
      postalCode,
      city,
      contactSource,
   } = clientCredentials;

   const addNewClient = (e) => {
      e.preventDefault();
      db.collection('clients')
         .add({
            companyName,
            NIP,
            contactPerson,
            firstname,
            surname,
            pesel,
            city,
            contactSource,
            email,
            houseNumber,
            phoneNumber,
            postalCode,
            street,
         })
         .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
         })
         .catch((error) => {
            console.error('Error adding document: ', error);
         });
      setClientCredentials({
         companyName: '',
         NIP: '',
         contactPerson: '',
         city: '',
         contactSource: '',
         email: '',
         firstname: '',
         houseNumber: '',
         pesel: '',
         phoneNumber: '',
         postalCode: '',
         street: '',
         surname: '',
      })
      return alert('dodałes nowego klienta');
   }
   const handleChange = (event) => {
      const { name, value } = event.target;

      setClientCredentials({
         ...clientCredentials,
         [name]: value,
      });
   };

   return (
      <div>
         <label>Rodzaj Klienta</label>
         <select onChange={(e) => setTypeOfClient(e.target.value)}>
            <optgroup label="rodzaj klienta">
               <option value="" selected disabled hidden />
               <option value="individual">indywidualny</option>
               <option value="farmer">rolnik</option>
               <option value="business">firma</option>
            </optgroup>
         </select>
         <form onSubmit={addNewClient}>

            {typeOfClient === 'business' ?
               <div><FormInput
                  type="text"
                  label="Nazwa Firmy"
                  name="companyName"
                  value={companyName}
                  onChange={handleChange}
                  required
               />
                  <FormInput
                     type="text"
                     label="Osoba kontaktowa"
                     name="contactPerson"
                     value={contactPerson}
                     onChange={handleChange}
                     required
                  />
                  <FormInput
                     type="number"
                     label="NIP"
                     name="NIP"
                     value={NIP}
                     onChange={handleChange}
                     required
                  />            </div>
               :
               <div><FormInput
                  type="text"
                  label="Imie"
                  name="firstname"
                  value={firstname}
                  onChange={handleChange}
                  required
               />
                  <FormInput
                     type="text"
                     label="Nazwisko"
                     name="surname"
                     value={surname}
                     onChange={handleChange}
                     required
                  />
                  <FormInput
                     type="number"
                     label="PESEL"
                     name="pesel"
                     value={pesel}
                     onChange={handleChange}
                     required
                  />            </div>
            }
            <FormInput
               type="phone"
               label="numer telefonu"
               name="phoneNumber"
               value={phoneNumber}
               onChange={handleChange}
               required
            />
            <FormInput
               type="email"
               label="Email"
               name="email"
               value={email}
               onChange={handleChange}
               required
            />
            <FormInput
               type="text"
               label="Ulica"
               name="street"
               value={street}
               onChange={handleChange}
               required
            />
            <FormInput
               type="numer"
               label="nr domu"
               name="houseNumber"
               value={houseNumber}
               onChange={handleChange}
               required
            />
            <FormInput
               type="text"
               label="Kod pocztowy"
               name="postalCode"
               value={postalCode}
               onChange={handleChange}
               required
            />
            <FormInput
               type="text"
               label="Miasto"
               name="city"
               value={city}
               onChange={handleChange}
               required
            />
            <FormInput
               type="text"
               label="skąd o nas wiesz ?"
               name="contactSource"
               value={contactSource}
               onChange={handleChange}
               required
            />

            <button className="btn btn-success mb-3" type="submit">
               dodaj Klienta
        </button>
         </form>
      </div >
   )
}

export default NewOfferForm
