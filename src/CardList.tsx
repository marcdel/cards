import React, {useEffect, useState} from "react"
import {CardService} from "./CardService"
import {Card} from "./Card"

type CardProps = {
  cardService: CardService
}

export const CardList = ({cardService}: CardProps) => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    cardService.listCards()
      .then(fetchedCards => {
        setCards(fetchedCards)
      })
  });

  return (
    <ul>
      {cards.map(card => <li key={card.name}><img src={card.imageUrl}/></li>)}
    </ul>
  );
}
