import {CardApi, CardListData} from "../CardApi"

export class FakeApi implements CardApi {
  listCards(page: number, pageSize: number): Promise<CardListData> {
    return new Promise<CardListData>(() => {
      return {cards: [], _links: {}, _pageSize: 20, _totalCount: 0}
    })
  }
}
