import Notification from "./Notification";
import React from "react";

function Noti() {
  const listItems = [
      {
        UTC: "1408648665",
        list: [
          {
            type: "Message",
            content: "A messgae description for testing notofication bar",
            count: 3,
            timestamp: "1PM"
          }
        ]
      },
      {
        UTC: "1598103780",
        list: [
          {
            type: "Login",
            content: "A messgae description for testing notofication bar",
            count: 1
          }
        ]
      },
      {
        UTC: "1595594400",
        list: [
          {
            type: "Login",
            content: "A messgae description for testing notofication bar",
            count: 4
          }
        ]
      },
      {
        UTC: "1595575200",
        list: [
          {
            type: "Critical",
            content: "A messgae description for testing notofication bar",
            count: 3
          }
        ]
      }
    ];
  return (
    <div className="App">
      <header className="App-header">
        <Notification listItems={listItems} />
      </header>
    </div>
  );
}

export default Noti;