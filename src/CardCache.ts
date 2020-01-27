import {Card} from "./Card"

export interface CardCache {
  storeCards(page: number, cards: Card[], hasMore: boolean): void
  retrieveCards(page: number): {cards: Card[], hasMore: boolean}
}
