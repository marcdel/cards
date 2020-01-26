import React, {useEffect, useState} from "react"
import {CardService} from "./CardService"
import {Card} from "./Card"
import {CardDisplay} from "./CardDisplay"

type Props = {
  cardService: CardService
}

function cardItemKey(index: number) {
  return `card-item-${index}`
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
      {cards.map((card, index) => <li key={cardItemKey(index)}><CardDisplay card={card}/></li>)}
    </ul>
  );
}
