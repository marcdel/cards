import React from 'react'
import './App.css'
import {ESLegendsApi} from "./ESLegendsApi"
import {CardList} from "./CardList"
import {ESLegendsCardService} from "./ESLegendsCardService"
import {LocalStorageCardCache} from "./LocalStorageCardCache"

const App: React.FC = () => {
  const cardApi = new ESLegendsApi()
  const cardCache = new LocalStorageCardCache()
  const cardService = new ESLegendsCardService(cardApi, cardCache)

  return (
    <div className="App">
      <CardList cardService={cardService}/>
    </div>
  )
}

export default App
