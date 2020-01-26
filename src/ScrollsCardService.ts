import {CardData, ScrollsApi} from "./ScrollsApi"
import {CardService} from "./CardService"
import {Card} from "./Card"

export class ScrollsCardService implements CardService {
  private scrollsApi: ScrollsApi;

  constructor(scrollsApi: ScrollsApi) {
    this.scrollsApi = scrollsApi
  }

  async listCards(): Promise<Card[]> {
    const storedCards = this.retrieveCards();

    if(storedCards.length > 0) {
      return storedCards;
    }

    const cardListData = await this.scrollsApi.listCards(0, 20)
    const fetchedCards = cardListData.cards.map(card => this.dataToCard(card));
    this.storeCards(fetchedCards);

    return fetchedCards;
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

  private storeCards(cards: Card[]) {
    localStorage.setItem('cards', JSON.stringify(cards));
  }

  private retrieveCards(): Card[] {
    return JSON.parse(localStorage.getItem('cards') || "[]");
  }
}
