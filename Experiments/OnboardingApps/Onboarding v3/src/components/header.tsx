import { RootLogo } from 'src/assets/root-logo'
import { DarkModeToggle } from './dark-mode-toggle'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="relative w-full flex justify-between items-center p-2 z-10">
      <div className="flex flex-[2]">
        <Link
          to="/"
          className="block start p-2 border border-transparent rounded-md outline-none transition duration-200 focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:border-primary"
        >
          <RootLogo />
        </Link>
      </div>
      <DarkModeToggle />
    </header>
  )
}
