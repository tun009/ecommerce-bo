export interface IFavoriteNavigation {
  id: string
  item: {
    name: string
    path?: string,
    nameComponent?: string
    children: {
      name: string
      path?: string
      nameComponent?: string
      children?: IFavoriteNavigationItem
    }
  }
}

export interface IFavoriteNavigationItem {
  name: string
  path: string
  nameComponent?: string
}

export interface IMenuFavoriteProps {
  favorites: string[]
  setFavorites: (list:string[]) => void
}