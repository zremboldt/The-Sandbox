import React from 'react'
import { createHashRouter, RouteObject } from 'react-router-dom'
import ErrorPage from './components/error-page'
import { getDefaultLayout } from './components/layout'
import NameScene from './pages/name'
import DobScene from './pages/dob'
import AddressScene from './pages/address'
import HomeownerScene from './pages/homeowner'
import RecentlyMovedScene from './pages/recently-moved'

export const routerObjects: RouteObject[] = [
  {
    path: '/',
    Component: NameScene,
  },
  {
    path: '/dob',
    Component: DobScene,
  },
  {
    path: '/address',
    Component: AddressScene,
  },
  {
    path: '/homeowner',
    Component: HomeownerScene,
  },
  {
    path: '/recently-moved',
    Component: RecentlyMovedScene,
  },
]

export function createRouter(): ReturnType<typeof createHashRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    const getLayout = router.Component?.getLayout || getDefaultLayout
    const Component = router.Component!
    const page = getLayout(<Component />)
    return {
      ...router,
      element: page,
      Component: null,
      ErrorBoundary: ErrorPage,
    }
  })
  return createHashRouter(routeWrappers)
}
