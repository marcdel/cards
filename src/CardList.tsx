import React, {useState} from "react"
import InfiniteScroll from "react-infinite-scroller"
import {CardService} from "./CardService"
import {Card} from "./Card"
import {CardDisplay} from "./CardDisplay"
import {Loading} from "./Loading"

type Props = {
  cardService: CardService
}

function cardItemKey(index: number) {
  return `card-item-${index}`
}

export const CardList = ({cardService}: Props) => {
  const [cards, setCards] = useState<Card[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)

  function loadCards(page: number) {
    cardService.listCards(page)
      .then(({cards: fetchedCards, hasMore}) => {
        setCards([...cards, ...fetchedCards])
        setHasMore(hasMore)
      })
  }

  return (<>
    <InfiniteScroll
      pageStart={0}
      loadMore={loadCards}
      hasMore={hasMore}
      loader={<Loading key={-1} />}
    >
      <ul>
        {cards.map((card, index) =>
          <li key={cardItemKey(index)}><CardDisplay card={card}/></li>
        )}
      </ul>
    </InfiniteScroll>
  </>)
}
