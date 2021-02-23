import React from 'react';
import Navigation from '../../components/navigation/navigation.component';
import ReactStickyNotes from '@react-latest-ui/react-sticky-notes';


const HomePage = () => {
  return (
    <div>
      <Navigation />
      <p>home page</p>
      <ReactStickyNotes />
    </div>
  );
};

export default HomePage;
