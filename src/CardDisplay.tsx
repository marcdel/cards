import React from "react"
import {Card} from "./Card"

type Props = {
  card: Card
}

function altText(card: Card) {
  return `${card.name} card image`;
}

export const CardDisplay = ({card}: Props) => {
  return (
    <figure>
      <img src={card.imageUrl} alt={altText(card)}/>
      <figcaption>
        <h3>{card.name}</h3>
        <section>
          <p>{card.type}</p>
          <p>{card.text}</p>
          <p>{card.setName}</p>
        </section>
      </figcaption>
    </figure>
  )
}
