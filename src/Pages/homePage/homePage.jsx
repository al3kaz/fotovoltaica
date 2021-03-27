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
        db.collection('notes')
          .doc(`${note.id}`)
          .set({ note })
          .then((docRef) => {
            console.log('Document written with ID: ', note.id);
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      });
  };

  const deleteNoteFromFirebase = (e) => {
    db.collection('notes')
      .doc(`${e.id}`)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <>
      <Navigation />
      <div className="flex d-flex flex-column align-items-center">
        <button className="btn btn-dark btn-sm " onClick={addNotesToFirebase}>
          dodaj notki
        </button>
      </div>
      <ReactStickies
        notes={notes}
        onChange={onChange}
        onDelete={deleteNoteFromFirebase}
      />
    </>
  );
};

export default HomePage;
