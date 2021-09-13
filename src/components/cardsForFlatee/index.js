// import react and its hooks
import React, {
  useState, useEffect, useMemo,
} from 'react';
// import _isEqual function
import _isEqual from 'lodash/isEqual';
// import material ui components
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import TinderCards
import TinderCard from 'react-tinder-card';
// import base url
import {
  instance, matchesForFlatee, unmatch, addFlat,
} from '../../utils/requests';
// import styles
import './styles.css';

// create cards component and export it
const CardsForFlatee = () => {
  const alreadyRemoved = [];
  // eslint-disable-next-line no-unused-vars
  const [people, setPeople] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({
    isExtraDescriptionShown: true,
  });
  // eslint-disable-next-line no-unused-vars
  const childRefs = useMemo(() => Array(people.length).fill(0).map((i) => React.createRef()));

  const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTJkNTJmN2ZmOGQ4YWM4NzJjMGRjMGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzE0MDY5NjcsImV4cCI6MTYzMjAxMTc2N30.yIXQXoZ2eTIh-OAsIZwTY1DhDkwk5ozL7-V_N_WG4YM';
  const AuthString = 'Bearer '.concat(USER_TOKEN);
  const flateeUser = 'daniel'; // make a default //how to retrieve current user's username? assuming flatee pov
  // const element = <h1>Hello, world</h1>;
  const url = 'url(https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&rect=37%2C29%2C4955%2C3293&q=45&auto=format&w=926&fit=clip)';
  let matchparam = {
    flateeUsername: flateeUser,
  };
  // use effect
  useEffect(() => {
    async function fetchData() {
      await instance.get(matchesForFlatee, {
        params: matchparam,
        headers: { Authorization: AuthString },
      })
        .then((res) => {
          setPeople(res.data);
        });
    }

    fetchData();
  }, []);

  // swipe function
  const swiped = (direction, targetName) => {
    matchparam = {
      flateeUsername: flateeUser,
      flatUsername: targetName,
    };
    if (_isEqual(direction, 'left')) {
      instance.put(unmatch, matchparam, { headers: { Authorization: AuthString } });
    } else if (_isEqual(direction, 'right')) {
      instance.post(addFlat, matchparam, { headers: { Authorization: AuthString } });
    }
    alreadyRemoved.push(targetName);
  };

  // automate swiping feature through buttons
  const swipe = (dir) => {
    const cardsLeft = people.filter((person) => !alreadyRemoved.includes(person.username));
    if (cardsLeft.length) {
      // eslint-disable-next-line max-len
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].username; // Find the card object to be removed
      // eslint-disable-next-line max-len
      const index = people.map((person) => person.username).indexOf(toBeRemoved); // Find the index of which to make the reference to
      // eslint-disable-next-line max-len
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <>
      {/* All the cards */}
      <div className="cards">
        <div className="cards__cardContainer">
          {people.map((person, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={person.name}
              flickOnSwipe
              preventSwipe={['up', 'down']}
              currentFlatCard={person.username}
              onSwipe={(dir) => swiped(dir, person.username)}
            >
              {/* Background image */}
              <div
                style={{ backgroundImage: url }}
                className="card"
              >
                <div className="card-content">
                  <h1>Hello~!ohhhh</h1>
                  <IconButton
                    // onClick={() => changePic()}
                    className="see-more-button"
                  >
                    <MoreVertIcon fontSize="large" />
                  </IconButton>
                </div>
                {/* Name */}
                <h3>{person.username}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
        {/* Swipe buttons */}
        <div className="swipe-buttons">
          <IconButton
            onClick={() => swipe('left')}
            className="swipe-buttons__left"
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => swipe('right')}
            className="swipe-buttons__right"
          >
            <FavoriteIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default CardsForFlatee;