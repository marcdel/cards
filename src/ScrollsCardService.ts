import {CardData, ScrollsApi} from "./ScrollsApi"
import {CardService} from "./CardService"
import {Card} from "./Card"

export class ScrollsCardService implements CardService {
  private scrollsApi: ScrollsApi

  constructor(scrollsApi: ScrollsApi) {
    this.scrollsApi = scrollsApi
  }

  async listCards(): Promise<Card[]> {
    const cardListData = await this.scrollsApi.listCards(0, 20)
    return cardListData.cards.map(card => this.dataToCard(card))
  }

  private dataToCard(data: CardData) {
    return {
      name: data.name,
      type: data.type,
      setName: data.set.name,
      text: data.text,
      imageUrl: data.imageUrl,
    }
  }
}
