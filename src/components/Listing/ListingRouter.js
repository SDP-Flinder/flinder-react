// import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { useState } from 'react';
// import '../../style/global.css';
// import { ReactComponent as FlinderLogo } from '../../assets/logo.svg';
// import CreateListing from "./CreateListing";
// import UpdateListing from "./UpdateListing";
// import ListingList from "./ListingList";
// import Listing from "./ListingDisplay";

// //
// //Redundant file
// //
// //Keeping in case I missed something
// //

// const ListingRouter = () => {
//   const [user, setUser] = useState({});

//   const updateUser = (data) => {
//     setUser((prevUser) => ({ ...prevUser, ...data }));
//   };

//   return (
//     <BrowserRouter>
//       <div className="backround">
//         <div className="layout">
//           <div>
//             <FlinderLogo className="logo-display" />
//           </div>
//           <Switch>
//             <Route
//               render={(props) => (
//                 <CreateListing {...props} user={user} />
//               )}
//               path="/listings/add"
//               exact={true} />
//             <Route
//               render={(props) => (
//                 <UpdateListing {...props} user={user} />
//               )}
//               path="/listings/update"
//               exact={true} />
//             <Route
//               render={(props) => (
//                 <ListingList {...props} user={user} />
//               )}
//               path="/listings/"
//               exact={true} />
//             <Route
//               render={(props) => (
//                 <Listing {...props} user={user} />
//               )}
//               path="/listings/listing"
//               exact={true} />
//           </Switch>
//         </div>
//       </div>
//     </BrowserRouter>
//   )
// };

// // export default ListingRouter;