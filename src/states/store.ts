'use client'

import { proxy, useSnapshot } from 'valtio'

type Store = {
  menu: boolean
  tableOfContent: boolean
}

export const store = proxy<Store>({
  menu: false,
  tableOfContent: false
})

export const actions = {
  toggleMenu() {
    store.menu = !store.menu
  },
  toggleTableOfContent() {
    store.tableOfContent = !store.tableOfContent
  }
}

export const useMenuState = () => {
  const snapShot = useSnapshot(store)
  return {
    open: snapShot.menu,
    setOpen: actions.toggleMenu
  }
}

export const useTableOfContentState = () => {
  const snapShot = useSnapshot(store)
  return {
    open: snapShot.tableOfContent,
    setOpen: actions.toggleTableOfContent
  }
}
