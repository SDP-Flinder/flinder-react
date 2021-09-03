// import react and its hooks
import React, { useState, useEffect } from 'react';
// import TinderCards
import TinderCard from 'react-tinder-card';
// import base url
import { instance, getCards } from '../../utils/requests';
// import styles
import './styles.css';

// create cards component and export it
const Cards = () => {
  const [people, setPeople] = useState([]);

  // use effect
  useEffect(() => {
    async function fetchData() {
      await instance.get(getCards).then((res) => setPeople(res.data));
    }

    fetchData();
  }, []);

  // swipe function
  const swiped = (nameToDelete) => {
    console.log(`removing ${nameToDelete}`);
  };

  // out frame function
  const outOfFrame = (name) => {
    console.log(`${name} left the screen`);
  };

  return (
    <>
      {/* All the cards */}
      <div className="cards">
        <div className="cards__cardContainer">
          {people.map((person) => (
            <TinderCard
              className="swipe"
              key={person.name}
              preventSwipe={['upp', 'down']}
              onSwipe={(dir) => swiped(dir, person.name)}
              onCardLeftScreen={() => outOfFrame(person.name)}
            >
              {/* Background image */}
              <div
                className="card"
                style={{
                  background: `url(${person.imgUrl}) no-repeat center center`,
                }}
              >
                {/* Name */}
                <h3>{person.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
