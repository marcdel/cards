export interface CardData {
  imageUrl: string;
  name: string;
  text: string;
  set: {name: string};
  type: string;
}

export interface CardListData {
  cards: CardData[];
  _links: {
    next?: string,
    prev?: string
  }
  _pageSize: number
  _totalCount: number
}

export interface CardApi {
  listCards(page: number, pageSize: number): Promise<CardListData>;
}
