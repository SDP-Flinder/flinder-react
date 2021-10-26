import Notification from "./Notification";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Config } from "../../../config"
import { useAuth } from "../../App/Authentication";

function Noti() {
  const { user, jwt } = useAuth();
  const [listItems, setListItems] = useState([]);

    //Helper for ease of use when making axios calls
  const instance = axios.create({
    baseURL: Config.Local_API_URL,
    timeout: 1000,
    headers: { Authorization: `Bearer ${jwt}` }
  })

  useEffect(() => {
    var tempNotis = [];

    async function getNotifications() {
      await instance.get('/notification')
        .then(res => {
          tempNotis = res.data
          
        });
        
        tempNotis.forEach(notification => {
          setListItems(listItems => [...listItems, {
            UTC: Date.parse(notification.date), 
            list: [
              {
                title: notification.title,
                message: notification.message,
                link: notification.link,
                read: notification.read,
                id: notification.id,
              }
            ]
          }])
      })
    }
    getNotifications();
  }, [user])

  return (
    <div className="App">
      <header className="App-header">
        <Notification listItems={listItems} jwt = {jwt} />
      </header>
    </div>
  );
}

export default Noti;