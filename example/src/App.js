import React, { useEffect, useState } from "react";

import { WalletChatWidget } from 'react-wallet-chat'  //ExampleComponent
import 'react-wallet-chat/dist/index.css'

// <ExampleComponent text="Create React Library Example 😄" />

const App = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false)
  return (<div>
    {/* <ExampleComponent text="Create React Library Example 😄" /> */}
    <button onClick={()=>{
      console.log(`isWidgetOpen: ${isWidgetOpen}`)
      setIsWidgetOpen(true)
    }}>
      Toggle widget overlay

    </button>
    <WalletChatWidget chatAddr="0x818cF89054B3A5E03D4677b52982E8319D009194" isOpen={isWidgetOpen} setIsOpen={setIsWidgetOpen}/>
  </div>)


}

export default App
