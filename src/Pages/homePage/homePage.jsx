import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Navigation from '../../components/navigation/navigation.component';
import ReactStickies from 'react-stickies';

const db = firebase.firestore();

const HomePage = () => {
  const [notes, setNotes] = React.useState([]);
  const [fbNotes, setFbNotes] = React.useState([]);

  React.useEffect(() => {
    const notesRef = db.collection('notes');
    notesRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (data.length === 0) return null;
      const newNotes = data.map((item) => {
        item.note.grid = JSON.parse(item.note.grid);
        return item.note;
      });
      setNotes([...notes, ...newNotes]);
      setFbNotes(newNotes);
    });
  }, []);

  const onChange = (notes) => {
    setNotes(notes);
  };

  const addNotesToFirebase = () => {
    notes
      .filter((id) => !fbNotes.includes(id))
      .map((note) => {
        delete note.editorState;
        note.grid = JSON.stringify(note.grid);
        console.log(note);
        db.collection('notes')
          .add({ note })
          .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      });
  };

  return (
    <>
      <Navigation />
      <button
        className="btn btn-light btn-sm mx-1"
        onClick={addNotesToFirebase}
      >
        dodaj notatki
      </button>
      <ReactStickies notes={notes} onChange={onChange} />
    </>
  );
};

export default HomePage;
