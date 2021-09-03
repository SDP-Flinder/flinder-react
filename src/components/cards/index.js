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

  const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTJkNTJmN2ZmOGQ4YWM4NzJjMGRjMGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzA2NTY1MDgsImV4cCI6MTYzMTI2MTMwOH0._dmov_6spFJQ7b9v3gmSYrH6YCoxzrNJcGJmewLXdhg';
  const AuthString = 'Bearer '.concat(USER_TOKEN);
  // use effect
  useEffect(() => {
    async function fetchData() {
      await instance.get(getCards, { headers: { Authorization: AuthString } })
        .then((res) => {
          console.log(res.data);
          setPeople(res.data);
        });
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
              preventSwipe={['up', 'down']}
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
                <h3>{person.id}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
