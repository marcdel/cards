import {CardCache} from "./CardCache"
import {CardApi} from "./CardApi"
import {ESLegendsCardService} from "./ESLegendsCardService"
import {TEST_CARD_1, TEST_CARD_2, TEST_CARD_DATA_1} from "./fixtures/cards"
import {FakeApi} from "./fixtures/FakeApi"
import {FakeCache} from "./fixtures/FakeCache"

let fakeApi: CardApi
let fakeCache: CardCache

beforeEach(() => {
  fakeApi = new FakeApi()
  fakeCache = new FakeCache()
})

describe('ESLegendsCardService.listCards/1', () => {
  describe('when cache does not contain page', () => {
    test('hits the API', async () => {
      const listCardsSpy = jest.spyOn(fakeApi, 'listCards').mockImplementation(() => {
        return Promise.resolve({cards: [], _links: {}, _pageSize: 20, _totalCount: 100})
      })
      const retrieveCardsSpy = jest.spyOn(fakeCache, 'retrieveCards')
        .mockImplementation(() => {
          return {cards: [], hasMore: true}
        })
      const cardService = new ESLegendsCardService(fakeApi, fakeCache)

      await cardService.listCards(0)

      expect(listCardsSpy).toHaveBeenCalledWith(0, 20)
    })

    test('returns cards for the specified page and whether there are more', async () => {
      jest.spyOn(fakeCache, 'retrieveCards').mockImplementation(() => {
        return {cards: [], hasMore: true}
      })
      jest.spyOn(fakeApi, 'listCards').mockImplementation(() => {
        return Promise.resolve({
          cards: [TEST_CARD_DATA_1],
          _links: {
            prev: "the prev page url"
          },
          _pageSize: 20,
          _totalCount: 100
        }
)      })
      const cardService = new ESLegendsCardService(fakeApi, fakeCache)

      const {cards, hasMore} = await cardService.listCards(0)

      expect(cards).toEqual([TEST_CARD_1])
      expect(hasMore).toEqual(false)
    })
  })

  describe('when cache contains page', () => {
    test('does not hit the API', async () => {
      const listCardsSpy = jest.spyOn(fakeApi, 'listCards')
      jest.spyOn(fakeCache, 'retrieveCards').mockImplementation(() => {
        return {cards: [TEST_CARD_1], hasMore: true}
      })
      const cardService = new ESLegendsCardService(fakeApi, fakeCache)

      await cardService.listCards(0)

      expect(listCardsSpy).not.toHaveBeenCalled()
    })

    test('does not hit the API if there are no cards for the next page', async () => {
      const listCardsSpy = jest.spyOn(fakeApi, 'listCards')
      jest.spyOn(fakeCache, 'retrieveCards').mockImplementation(() => {
        return {cards: [TEST_CARD_2], hasMore: false}
      })
      const cardService = new ESLegendsCardService(fakeApi, fakeCache)

      await cardService.listCards(1)

      expect(listCardsSpy).not.toHaveBeenCalled()
    })

    test('returns cards for the specified page and whether there are more', async () => {
      jest.spyOn(fakeCache, 'retrieveCards')
        .mockImplementation(() => {
          return {cards: [TEST_CARD_1, TEST_CARD_2], hasMore: true}
        })
      const cardService = new ESLegendsCardService(fakeApi, fakeCache)

      const {cards, hasMore} = await cardService.listCards(0)

      expect(cards).toEqual([TEST_CARD_1, TEST_CARD_2])
      expect(hasMore).toEqual(true)
    })
  })
})
