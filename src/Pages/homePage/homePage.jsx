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

    notesRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const newNotes = data.newArr;
      console.log(newNotes);
    }, []);
  });

  const onChange = (notes) => {
    setNotes(notes);
  };
  const newArr = JSON.stringify(notes);

  const newNotes = { newArr };

  const addNotesToFirebase = () => {
    db.collection('notes')
      .add(newNotes)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  return (
    <div>
      <Navigation />
      <ReactStickies notes={notes} onChange={onChange} />
      <button onClick={addNotesToFirebase}>ok</button>
    </div>
  );
};

export default HomePage;
