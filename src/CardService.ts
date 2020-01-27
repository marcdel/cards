import {Card} from "./Card"

export interface CardService {
  listCards: (page: number) => Promise<{cards: Card[], hasMore: boolean}>
}
