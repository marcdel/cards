import {CardCache} from "./CardCache"
import {Card} from "./Card"

export class LocalStorageCardCache implements CardCache {
  retrieveCards(page: number): { cards: Card[], hasMore: boolean } {
    const defaultValue = JSON.stringify({cards: [], hasMore: true})
    return JSON.parse(localStorage.getItem(this.storageKey(page)) || defaultValue)
  }

  storeCards(page: number, cards: Card[], hasMore: boolean): void {
    const data = {cards, hasMore}
    localStorage.setItem(this.storageKey(page), JSON.stringify(data))
  }

  private storageKey(page: number): string {
    return `cards-page-${page}`
  }
}
