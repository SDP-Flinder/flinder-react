// import React
import React from 'react';
// import cards
import CardsForFlatee from '../../cardsForFlatee';
import CardsForListing from '../../cardsForListing';

// note: CardsForFlat and CardsForFlatee now exists. need to wait for Finn's login to store
// variables for token, username, role.
// if role == 'flat', show CardsForFlat; if role == 'flatee', show CardsForFlatee

// export and create app component
const App = () => (
  <>
    {/* Tinder cards */}
    <CardsForFlatee />
  </>
);

export default App;
