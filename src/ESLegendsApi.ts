import axios from "axios"
import {CardApi, CardListData} from "./CardApi"

export class ESLegendsApi implements CardApi{
  async listCards(page: number, pageSize: number): Promise<CardListData> {
    const response =
      await axios.get(`${this.baseUrl()}cards?page=${page}&pageSize=${pageSize}`);

    return response.data;
  }

  private baseUrl(): string {
    return "https://api.elderscrollslegends.io/v1/";
  }
}
