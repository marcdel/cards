import React, {useEffect, useState} from "react"
import {CardService} from "./CardService"
import {Card} from "./Card"
import {CardDisplay} from "./CardDisplay"

type Props = {
  cardService: CardService
}

export const CardList = ({cardService}: Props) => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    cardService.listCards()
      .then(fetchedCards => {
        setCards(fetchedCards)
      })
  });

  return (
    <ul>
      {cards.map(card => <li key={card.name}><CardDisplay card={card}/></li>)}
    </ul>
  );
}
