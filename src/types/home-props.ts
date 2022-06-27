export default interface HomeProps {
  viewChange: (param1: string) => void
  focusedFighter: (param1: object) => void
  view: string
  favorites: object[]
  addFavorites: (param1: object | undefined) => void
  deleteFavorites: (param1: number) => void
}
