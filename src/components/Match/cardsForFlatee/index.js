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
  instance, matchesForFlatee, unmatch, addListing,
} from '../../../utils/requests';
// import styles
import './styles.css';

// create cards component and export it
const CardsForFlatee = (props) => {
  const alreadyRemoved = [];
  const [listings, setListings] = useState([]);
  const [readMore, setReadMore] = useState(null);
  const [showMore, setShowMore] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const childRefs = useMemo(() => Array(listings.length).fill(0).map((i) => React.createRef()));

  const USER_TOKEN = props.token;
  const AuthString = 'Bearer '.concat(USER_TOKEN);
  const flateeUser = props.username; // RETRIEVE FLATEE_USERNAME
  let matchparam = {
    flateeUsername: flateeUser,
  };

  // use effect to gather potential listings for this flatee
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

  // show additional info of card if triggered
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
            {`${Listing.accountUser.username}`}
            <br />
            {`Flat Description: ${Listing.listing.description}`}
            <br />
            {`Listing Description: ${Listing.accountUser.description}`}
            <br />
            {`Location: ${Listing.accountUser.address.suburb}`}
            <br />
            {`${Listing.accountUser.existingFlatmates} Flatmate(s)`}
            <br />
            {`$${Listing.listing.rent} ${Listing.listing.rentUnits}`}
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
          {listings
          .filter(place => 
            place.listing.rent > props.min && place.listing.rent < props.max && 
            props.suburb.includes(place.accountUser.address.suburb))
          .map((listing, index) => (
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
                {/* Name */}
                <h3>{listing.accountUser.username}</h3>
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
