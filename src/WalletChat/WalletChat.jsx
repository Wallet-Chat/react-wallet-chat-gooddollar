import React, { useEffect, useState } from "react";
import ButtonOverlay from "../ButtonOverlay/ButtonOverlay";
// import "./WalletChat.css"
import styles from "./WalletChat.module.css";
import { getCookie } from "../utils";

const setExtChatAddr = (setState) => {
  return (addr) => {
    setState(undefined)
    setState(addr)
  }
}
const openChat = (addr) => {
}
// {chatAddr, setChatAddr, isOpen, setIsOpen}
function WalletChatWidget({ widgetState }) {
  //console.log("WalletChatWidget Render")
  //console.log(widgetState)
  const [isOpen, setIsOpen] = useState(widgetState?.isOpen)
  const [chatAddr, setChatAddr] = useState(widgetState?.chatAddr)
  const [hideIframe, setHideIframe] = useState(false);
  
  useEffect(() => {
    console.log("useEffect widgetState")
    setIsOpen(widgetState?.isOpen)
    setChatAddr(widgetState?.chatAddr)
    setHideIframe(true)
    setTimeout(() => {
      setHideIframe(false)
    }, 100)
  }, [
    widgetState
  ])
  const [numUnread, setNumUnread] = useState(0);
  let url = process.env.REACT_APP_APP_URL || "https://gooddollar.walletchat.fun" 
  
  const clickHandler = (e) => {
    setIsOpen(!isOpen);
  };

  if (chatAddr != undefined && chatAddr.length != 0){
    url += `/dm/${chatAddr}`
  }
  console.log(`url: ${url}`);
  url = { val: url }
  useEffect(() => {
    window.addEventListener("message", (e) => {
      var data = e.data;
      //console.log("RECEIVED message from CHILD TO PARENT");
      console.log(data);
      if(data["target"] == 'unread_cnt'){
        setNumUnread(data["data"]);
      }
      if(data["target"] == 'signin'){
        var signature = data["signature"]
        var messageToSign = data["messageToSign"] 
        var nonce = data["nonce"]      //nonce from WalletChat API
        var address = data["address"]  //wallet address
        //can we just hardcode this to "metamask"?
        var provider = data["provider"]  //provider.connection.url (in our testing, its "metamask")

        const authSig = {
          sig: signature,
          derivedVia: "web3.eth.personal.sign",
          signedMessage: messageToSign,
          address: _account.toLocaleLowerCase(),
        };
        //end SIWE and authSig

        //const signature = await _signer.signMessage(_nonce)
        console.log('✅[INFO][AuthSig]:', authSig)

        fetch(`${process.env.REACT_APP_REST_API}/signin`, {
           body: JSON.stringify({ "name": network.chainId.toString(), "address": address, "nonce": nonce, "msg": messageToSign, "sig": signature }),
           headers: {
           'Content-Type': 'application/json'
           },
           method: 'POST'
        })
        .then((response) => response.json())
        .then(async (returnData) => {
           localStorage.setItem('jwt', returnData.access);
           //Used for LIT encryption authSign parameter
           localStorage.setItem('lit-auth-signature', JSON.stringify(authSig));
           localStorage.setItem('lit-web3-provider', provider.connection.url);
           console.log('✅[INFO][JWT]:', returnData.access)
        })
      }
      
    });
  }, []);
  return (
    <div id={styles["wallet-chat-widget__container"]}>
      {/* {isOpen && (
                <iframe id="wallet-chat-widget" src={url}></iframe>
            )} */}
      {!hideIframe &&
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
          src={url.val}
      ></iframe>
      }
      <ButtonOverlay
        notiVal={numUnread}
        showNoti={numUnread > 0}
        isOpen={isOpen}
        clickHandler={clickHandler}
      />
    </div>
  );
}
export default
  WalletChatWidget
