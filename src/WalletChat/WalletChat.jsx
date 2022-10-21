import React, { useEffect, useState } from "react";
import ButtonOverlay from "../ButtonOverlay/ButtonOverlay";
// import "./WalletChat.css"
import styles from "./WalletChat.module.css";
import { getCookie } from "../utils";

export default function WalletChatWidget({chatAddr, isOpen, setIsOpen}) {
  console.log(`isOpen2: ${isOpen}`)
  if(isOpen == undefined || setIsOpen == undefined){
    // const [isOpen, setIsOpen] = useState(isOpen2 != undefined? isOpen2:false);
    [isOpen, setIsOpen] = useState(false);
  }
  
  const [numUnread, setNumUnread] = useState(0);
  let url = process.env.REACT_APP_APP_URL || "https://v1.walletchat.fun"
  console.log(`url: ${url}`);
  const clickHandler = (e) => {
    setIsOpen(!isOpen);
  };

  if (chatAddr != undefined && chatAddr.length != 0){
    url += `/dm/${chatAddr}`
  }

  // console.log("Getting msg_cnt")
  // let cnt = localStorage.getItem("msg_cnt")
  // console.log(`Expected 10, gotten ${cnt}`)
  // cnt = getCookie("msg_cnt");
  // console.log(`Expected 10, gotten ${cnt}`)
  useEffect(() => {
    window.addEventListener("message", (e) => {
      var data = e.data;
      console.log("RECEIVED message from CHILD TO PARENT");
      console.log(data);
      if(data["target"] == 'unread_cnt'){
        setNumUnread(data["data"]);
      }
      
    });
  }, []);
//   setInterval(() => {
//     let cnt = getCookie("_wallet_chat_msg_cnt");

//     // setNumUnread(cnt);
//   }, 3000);
  return (
    <div id={styles["wallet-chat-widget__container"]}>
      {/* {isOpen && (
                <iframe id="wallet-chat-widget" src={url}></iframe>
            )} */}
      <iframe
        id="wallet-chat-widget"
        className={styles["wallet-chat-widget"]}
        style={{
          height: isOpen ? "" : "0px",
          width: isOpen ? "" : "0px",
          minHeight: isOpen ? "" : "0px",
          minWidth: isOpen ? "" : "0px",
          // display: isOpen?"block":"none"
        }}
        src={url}
      ></iframe>
      <ButtonOverlay
        notiVal={numUnread}
        showNoti={numUnread > 0}
        isOpen={isOpen}
        clickHandler={clickHandler}
      />
    </div>
  );
}
