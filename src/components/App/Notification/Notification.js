import { IconButton, Button } from "@material-ui/core";
import React from "react";
import "./style.css";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link as RouterLink } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useAuth } from "../Authentication";
import { Config } from "../../../config";
import axios from "axios";

/** Notification released*/
class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleNotification: false,
      listItems: [],
      jwt: this.props.jwt,
    };
  }
  componentDidMount() {
    this.setState({ listItems: this.props.listItems });
  }
  componentDidUpdate(previousProps) {
    if (previousProps.listItems !== this.props.listItems) {
      this.setState({ listItems: this.props.listItems });
    }
  }
  toggleNotification = () => {
    const { toggleNotification } = this.state;
    this.setState({ toggleNotification: !toggleNotification });
  };
  clearAllMessage = () => {
    this.props.onClearAll && this.props.onClearAll();
  };
  generateDate = timeStamp => {
    return timeStamp;
  };

  render() {
    const { listItems } = this.state;
    const {jwt} = this.state;
    let totalCount = 0;
    const allTimestamp = [];
    listItems.map((i, k) => {
      const test = allTimestamp.filter(
        item => item.UTC.date === this.generateDate(i.UTC).date
      );
      if (test.length === 0) {
        const itemObj = {
          UTC: this.generateDate(i.UTC),
          list: []
        };
        allTimestamp.push(itemObj);
      }
      totalCount = totalCount + i.list.length;
    });
    listItems.map((i, j) => {
      const iUTC = this.generateDate(i.UTC).date;
      const sameData = allTimestamp.filter(function(k) {
        return k.UTC.date === iUTC;
      });
      const key = sameData.length && sameData[0].UTC.date;
      allTimestamp.map(item => {
        if (item.UTC.date === key) {
          i.list.map(p => {
            p.timeStamp = i.UTC;
          });
          item.list.push(i.list);
        }
      });
    });

    //Update the data
    const handleClicked = async (k) => {
      console.log(k);
      
      const URL = 'http://localhost:4000/notification/read/'.concat(k.id);

      const config = {
        headers: { Authorization: `Bearer ${jwt}` }
      };
      
      const bodyParams = {
        read: true,
      }

      await axios.put(URL, bodyParams, config).then( res => console.log('success', res));
    }

    return (
      <div className={"notification"} style={{ position: "relative" }}>
        <div className={"iconSection"}>
          <IconButton
            onClick={() => this.toggleNotification()}
            style={{ cursor: "pointer" }}
            color = "inherit"
          >
              <NotificationsIcon/>
          </IconButton>
          {totalCount > 0 &&
          <span className={"iconBadge"}>{totalCount}</span>}
        </div>
        {this.state.toggleNotification && (
          <div
            style={{
              position: "absolute",
              width: "300px",
              border: "0.5px solid #8080803d",
              minHeight: "100px",
              overflowY: "auto",
              top: "30px"
            }}
            className={"notificationBar"}
          >
            <div style={{ display: "flex" }}>
              <p style={{ fontSize: "14px", textAlign: "left", width: "93%" }}>
                Notifications
              </p>
              <IconButton
                onClick={() => this.toggleNotification()}
                style={{ cursor: "pointer" }}
              >
                  <CancelIcon/>
              </IconButton>
            </div>
            {allTimestamp.map((i, k) => {
              return (
                <div key = {i}>
                  <p
                    style={{
                      fontSize: "10px",
                      margin: "5px 0",
                      textAlign: "left",
                      color: "#747474",
                      display: "initial"
                    }}
                  >
                    <span style={{ display: "inline-block", width: "50%" }}>
                      {i.UTC.date}
                    </span>
                    {/* <span
                      style={{
                        display: "inline-block",
                        width: "50%",
                        textAlign: "right"
                      }}
                    >
                      {k === 0 && (
                        <IconButton
                          style={{
                            cursor: "pointer",
                            marginBottom: "-6px"
                          }}
                          onClick={()=>this.clearAllMessage()} 
                        >
                            <HighlightOffIcon/>
                        </IconButton>
                      )}
                    </span> */}
                  </p>
                  {i.list.map(l => {
                    return l.map(k => {
                      const d = new Date(k.timeStamp * 1000);
                      const min = d.getUTCMinutes();
                      const hours = d.getUTCHours() % 12 || 12;
                      const amOrpm = hours >= 12 ? "pm" : "am";
                      return (
                        <Button 
                          key = {k}
                          variant = "contained"  
                          style={{ background: "#fff", padding: "15px", margin: "10px", borderRadius: 10, width: 250 }}
                          component={RouterLink}
                          className={"lineItmes"}
                          to = {k.link}
                          onClick = {() =>handleClicked(k)}
                        >
                          {!k.read &&
                          <FiberManualRecordIcon fontSize = "small" sx = {{margin: 1}} color = "primary" />}
                          <span style={{ fontSize: "13px", fontWeight: 700 }}>
                            {`${k.title.toUpperCase()}`}
                          </span>
                          <div style={{ fontSize: "11px", padding: 10 }}>
                            {k.message}
                          </div>
                        </Button>
                      );
                    });
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Notification;