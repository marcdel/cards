import {ESLegendsApi} from "./ESLegendsApi"
import {CardService} from "./CardService"
import {Card} from "./Card"
import {CardData} from "./CardApi"
import {CardCache} from "./CardCache"

export class ESLegendsCardService implements CardService {
  private scrollsApi: ESLegendsApi;
  private cache: CardCache

  constructor(scrollsApi: ESLegendsApi, cache: CardCache) {
    this.scrollsApi = scrollsApi
    this.cache = cache
  }

  async listCards(page: number): Promise<{cards: Card[], hasMore: boolean}> {
    let {cards, hasMore} = this.cache.retrieveCards(page);

    // Sleep for one second to show off the loading css
    await new Promise(resolve => setTimeout(resolve, 1000));

    if(cards.length > 0 || !hasMore) {
      return {cards, hasMore};
    }

    const cardListData = await this.scrollsApi.listCards(page, this.pageSize())

    hasMore = !!cardListData._links.next;
    cards = cardListData.cards.map(card => this.dataToCard(card));
    this.cache.storeCards(page, cards, hasMore);

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

  private pageSize(): number {
    return 20;
  }
}
