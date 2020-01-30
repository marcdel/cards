import {CardCache} from "../CardCache"
import {Card} from "../Card"

export class FakeCache implements CardCache {
  retrieveCards(page: number): { cards: Card[], hasMore: boolean } {
    return {cards: [], hasMore: true}
  }

  storeCards(page: number, cards: Card[], hasMore: boolean): void {
  }
}
