import api from '../../utils/api';
import { useEffect, useState } from "react";
import "../../style/thread.css";
import { Role, useAuth } from "../App/Authentication";

export default function Thread({ thread }) {
  const [match, setMatch] = useState(null);
  const [username, setUsername] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { jwt, user } = useAuth();

  useEffect(() => {
    if(thread && thread !== null) {
      console.log('getMatchById: ' + thread.matchId)
      api.getMatchById(thread.matchId, jwt)
      .then((res) => {
        console.log('Result, getMatchById: ' + res.data)
        setMatch(res.data);
      })
      .catch((err) => {
          console.log(err);
      })
    }

    if(match && match !== null) {
      // Set Username for display
      if(user.role === Role.Flat) {
        setUsername(match.listingUsername);
      } else if (user.role === Role.Flatee) {
        setUsername(match.flateeUsername);
      }
    }
  }, [ user, thread, jwt]);

  return (
    <div className="thread">
      {/* <img
        className="threadImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      /> */}
      <span className="threadName">{username}</span>
    </div>
  );
}

