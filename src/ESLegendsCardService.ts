import {ESLegendsApi} from "./ESLegendsApi"
import {CardService} from "./CardService"
import {Card} from "./Card"
import {CardData} from "./CardApi"

export class ESLegendsCardService implements CardService {
  private scrollsApi: ESLegendsApi;

  constructor(scrollsApi: ESLegendsApi) {
    this.scrollsApi = scrollsApi
  }

  async listCards(page: number): Promise<{cards: Card[], hasMore: boolean}> {
    let {cards, hasMore} = this.retrieveCards(page);

    // Sleep for one second to show off the loading css
    await new Promise(resolve => setTimeout(resolve, 1000));

    if(cards.length > 0 || !hasMore) {
      return {cards, hasMore};
    }

    const cardListData = await this.scrollsApi.listCards(page, this.pageSize())

    hasMore = !!cardListData._links.next;
    cards = cardListData.cards.map(card => this.dataToCard(card));
    this.storeCards(page, cards, hasMore);

    return {cards, hasMore};
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

  private storeCards(page: number, cards: Card[], hasMore: boolean = false) {
    const data = {cards, hasMore}
    localStorage.setItem(this.storageKey(page), JSON.stringify(data));
  }

  private retrieveCards(page: number = 0): {cards: Card[], hasMore: boolean} {
    const defaultValue = JSON.stringify({cards: [], hasMore: true});
    return JSON.parse(localStorage.getItem(this.storageKey(page)) || defaultValue);
  }

  private pageSize(): number {
    return 20;
  }

  private storageKey(page: number): string {
    return `cards-page-${page}`;
  }
}
