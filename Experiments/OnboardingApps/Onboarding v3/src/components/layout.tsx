import React from 'react'
import { Header } from 'src/components/header'
import holo from 'src/assets/holo.avif'

export const getNoLayout = (page: React.ReactElement) => page

export const getDefaultLayout = (page: React.ReactElement) => {
  return (
    // eslint-disable-next-line react/no-unknown-property
    <div vaul-drawer-wrapper="" className="relative bg-background">
      <img
        src={holo}
        className="absolute top-0 right-0 z-0 min-h-2/5 opacity-80 dark:hue-rotate-90 dark:opacity-25"
        alt=""
      />
      {/* <div className="h-min-screen"> */}
      <Header />
      <main className="min-h-[calc(100vh-52px)] flex justify-center px-4 py-14 sm:py-24">{page}</main>
    </div>
  )
}
