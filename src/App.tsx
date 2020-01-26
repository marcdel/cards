import React from 'react'
import './App.css'
import {ScrollsApi} from "./ScrollsApi"
import {CardList} from "./CardList"
import {ScrollsCardService} from "./ScrollsCardService"

const App: React.FC = () => {
  const scrollsApi = new ScrollsApi()
  const cardService = new ScrollsCardService(scrollsApi);

  return (
    <div className="App">
      <CardList cardService={cardService}/>
    </div>
  );
}

export default App;
