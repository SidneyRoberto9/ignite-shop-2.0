import { createContext } from "react";
import { ReactNode, useEffect, useState } from "react";

interface SideNavProps {
  isOpen: boolean
  toggleSideNav: (state: boolean) => void
}

interface ContextProps {
  children: ReactNode
}

export const SideNavController = createContext({} as SideNavProps)

export function SideNavControllerProvider({ children }: ContextProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function toggleSideNav(state: boolean) {
    setIsOpen(state)
  }

  return (
    <SideNavController.Provider
      value={{
        isOpen,
        toggleSideNav,
      }}
    >
      {children}
    </SideNavController.Provider>
  )
}
