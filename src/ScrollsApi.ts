import axios from "axios"

export interface CardListData {
  cards: Object[];
  _links: {next: string}
  _pageSize: number
  _totalCount: number
}

export class ScrollsApi {
  async listCards(page: number, pageSize: number): Promise<CardListData> {
    const response =
      await axios.get(`${this.baseUrl()}cards?page=${page}&pageSize=${pageSize}`);

    return response.data;
  }

  private baseUrl(): string {
    return "https://api.elderscrollslegends.io/v1/";
  }
}
