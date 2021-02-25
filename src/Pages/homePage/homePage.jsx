import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Navigation from '../../components/navigation/navigation.component';
import ReactStickies from 'react-stickies';

const db = firebase.firestore();

const HomePage = () => {
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    const notesRef = db.collection('notes');
    if (notes.length === 1) {
      notesRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const fetchedNotes = JSON.parse(data.map((item) => item.newNotes));
        console.log('aktualny stan', notes);
        console.log('stan  firebase', fetchedNotes);
        const twoArr = [...notes, ...fetchedNotes];
        console.log('połączenie stanu komponentu ze stanem firebase', twoArr);
        // setNotes(twoArr);
      });
    }
  }, [notes]);

  const onChange = (notes) => {
    setNotes(notes);
  };

  const newNotes = JSON.stringify(notes);
  // console.log('stan strigifi', newNotes)

  const firebaseNotes = { newNotes };
  // console.log('zamiania stringifi na obiekt do wysłania na firebase', firebaseNotes)

  const addNotesToFirebase = () => {
    db.collection('notes')
      .add(firebaseNotes)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };
  console.log(notes);
  return (
    <>
      <Navigation />
      <ReactStickies notes={notes} onChange={onChange} />
      {/* <button onClick={addNotesToFirebase}>ok</button> */}
    </>
  );
};

export default HomePage;
