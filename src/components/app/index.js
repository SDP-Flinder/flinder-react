// import React
import React from 'react';
// import Header component
import Header from '../header';
// import cards
import Cards from '../cards';
// import swipe buttons component
import SwipeButtons from '../swipeButtons';

// export and create app component
const App = () => (
  <>
    {/* Header */}
    <Header />
    {/* Tinder cards */}
    <Cards />
    {/* Swipe buttons */}
    <SwipeButtons />
  </>
);

export default App;
