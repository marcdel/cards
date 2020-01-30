import {Card} from "../Card"
import {CardData} from "../CardApi"

export const TEST_CARD_1: Card = {
  name: "Raise Dead",
  type: "Action",
  setName: "Core Set",
  text: "Summon a random creature from each discard pile.",
  imageUrl: "https://images.elderscrollslegends.io/cs/raise_dead.png",
};

export const TEST_CARD_2: Card = {
  name: "Rift Thane",
  type: "Creature",
  setName: "Core Set",
  text: "Summon: If you have less health than your opponent, +0/+2 and Guard. Otherwise, +2/+0 and Breakthrough.",
  imageUrl: "https://images.elderscrollslegends.io/cs/rift_thane.png",
};

export const TEST_CARD_DATA_1: CardData = {
  name: "Raise Dead",
  type: "Action",
  set: {name: "Core Set"},
  text: "Summon a random creature from each discard pile.",
  imageUrl: "https://images.elderscrollslegends.io/cs/raise_dead.png",
}
