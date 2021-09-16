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
  instance, matchesForFlatee, flatsForFlatee, unmatch, addListing,
} from '../../utils/requests';
// import styles
import './styles.css';

// create cards component and export it
const CardsForFlatee = () => {
  const alreadyRemoved = [];
  const [listings, setListings] = useState([]);
  const [listingOwners, setListingsOwners] = useState([]);
  const [readMore, setReadMore] = useState(null);
  const [showMore, setShowMore] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const childRefs = useMemo(() => Array(listings.length).fill(0).map((i) => React.createRef()));

  const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTJkNTJmN2ZmOGQ4YWM4NzJjMGRjMGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzE0MDY5NjcsImV4cCI6MTYzMjAxMTc2N30.yIXQXoZ2eTIh-OAsIZwTY1DhDkwk5ozL7-V_N_WG4YM';
  const AuthString = 'Bearer '.concat(USER_TOKEN);
  const flateeUser = 'daniel'; // make a default //how to retrieve current user's username? assuming flatee pov
  let matchparam = {
    flateeUsername: flateeUser,
  };

  useEffect(() => {
    async function fetchListings() {
      await instance.get(matchesForFlatee, {
        params: matchparam,
        headers: { Authorization: AuthString },
      })
        .then((res) => {
          setListings(res.data);
        });
    }
    fetchListings();
  }, []);

  useEffect(() => {
    async function fetchListingOwners() {
      await instance.get(flatsForFlatee, {
        params: matchparam,
        headers: { Authorization: AuthString },
      })
        .then((res) => {
          setListingsOwners(res.data);
        });
    }
    fetchListingOwners();
  }, []);

  // swipe function
  const swiped = (direction, id) => {
    matchparam = {
      flateeUsername: flateeUser,
      listingID: id,
    };
    if (_isEqual(direction, 'left')) {
      instance.put(unmatch, matchparam, { headers: { Authorization: AuthString } });
    } else if (_isEqual(direction, 'right')) {
      instance.post(addListing, matchparam, { headers: { Authorization: AuthString } });
    }
    alreadyRemoved.push(id);

    setShowMore(true);
    setReadMore(null);
  };

  // automate swiping feature through buttons
  const swipe = (dir) => {
    const cardsLeft = listings.filter((listing) => !alreadyRemoved.includes(listing.id));
    if (cardsLeft.length) {
      // eslint-disable-next-line max-len
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id; // Find the card object to be removed
      // eslint-disable-next-line max-len
      const index = listings.map((listing) => listing.id).indexOf(toBeRemoved); // Find the index of which to make the reference to
      // eslint-disable-next-line max-len
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  const changeText = (Listing) => {
    const cardsLeft = listings.filter((listing) => !alreadyRemoved.includes(listing.id));
    if (cardsLeft.length) {
      // eslint-disable-next-line max-len
      const toBeTargeted = cardsLeft[cardsLeft.length - 1].id; // Find the card object to retrieve extra info
      // eslint-disable-next-line max-len
      const index = listings.map((listing) => listing.id).indexOf(toBeTargeted); // Find the index of which to make the reference to
      setShowMore(!showMore);

      if (showMore) {
        const text = (
          <h2 style={{
            padding: 15,
          }}
          >
            {`Flat Description: ${listingOwners[index].description}`}
            <br />
            {`Listing Description: ${Listing.description}`}
            <br />
            {`Location: ${listingOwners[index].address.suburb}`}
            <br />
            {`${listingOwners[index].existingFlatmates} Flatmate(s)`}
          </h2>
        );
        setReadMore(text);
      } else {
        const text = null;
        setReadMore(text);
      }
    }
  };

  return (
    <>
      {/* All the cards */}
      <div className="cards">
        <div className="cards__cardContainer">
          {listings.map((listing, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={listing.id}
              flickOnSwipe
              preventSwipe={['up', 'down']}
              currentFlatCard={listing.id}
              onSwipe={(dir) => swiped(dir, listing.id)}
            >
              {/* Background image */}
              <div
                style={{
                  backgroundImage: 'url(https://www.indiewire.com/wp-content/uploads/2019/10/Parasite_Parks_Garden-1.jpg?resize=1536,830)',
                }}
                className="card"
              >
                <body className="card-content">
                  {readMore}
                </body>
                <IconButton
                  onClick={() => changeText(listing)}
                  className="see-more-button"
                >
                  <MoreVertIcon fontSize="large" />
                </IconButton>
                <h3>{listingOwners[index].username}</h3>
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
