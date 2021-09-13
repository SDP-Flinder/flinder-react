// import React
import React from 'react';
// import Header component
import Header from '../header';
// import cards
import CardsForFlatee from '../cardsForFlatee';

// note: CardsForFlat and CardsForFlatee now exists. need to wait for Finn's login to store
// variables for token, username, role.
// if role == 'flat', show CardsForFlat; if role == 'flatee', show CardsForFlatee

// export and create app component
const App = () => (
  <>
    {/* Header */}
    <Header />
    {/* Tinder cards */}
    <CardsForFlatee />
  </>
);

export default App;
