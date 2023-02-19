import React, { useEffect, useState } from "react";

import { WalletChatWidget } from 'react-wallet-chat'  //ExampleComponent
import 'react-wallet-chat/dist/index.css'

// <ExampleComponent text="Create React Library Example 😄" />

const App = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false)
  const [chatAddr, setChatAddr] = useState("0x818cF89054B3A5E03D4677b52982E8319D009194")
  const [widgetState, setWidgetState] = useState({})
  return (<div>
    {/* <ExampleComponent text="Create React Library Example 😄" /> */}
    <button onClick={()=>{
      console.log(`isWidgetOpen: ${isWidgetOpen}`)
      setWidgetState(
        {
           ...widgetState, 
          chatAddr,
          isOpen: true
        }
      )
    }}>
      Toggle widget overlay

    </button>
    <WalletChatWidget widgetState={widgetState}/>
  </div>)


}

export default App
