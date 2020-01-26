import {Card} from "./Card"

export interface CardService {
  listCards: () => Promise<Card[]>
}
