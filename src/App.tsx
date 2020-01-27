import React from 'react'
import './App.css'
import {ESLegendsApi} from "./ESLegendsApi"
import {CardList} from "./CardList"
import {ESLegendsCardService} from "./ESLegendsCardService"

const App: React.FC = () => {
  const scrollsApi = new ESLegendsApi()
  const cardService = new ESLegendsCardService(scrollsApi);

  return (
    <div className="App">
      <CardList cardService={cardService}/>
    </div>
  );
}

export default App;
