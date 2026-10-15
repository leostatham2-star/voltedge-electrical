"use client";

import { createContext, useCallback, useContext } from "react";
import type { PageId } from "@/lib/site";

interface NavContextValue {
  page: PageId;
  postSlug: string | null;
  navigate: (page: PageId, postSlug?: string) => void;
}

const NavContext = createContext<NavContextValue>({
  page: "home",
  postSlug: null,
  navigate: () => {},
});

export function NavProvider({
  value,
  children,
}: {
  value: NavContextValue;
  children: React.ReactNode;
}) {
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  return useContext(NavContext);
}

/** Hook that returns a click handler navigating to a page */
export function useNavigateTo() {
  const { navigate } = useNav();
  return useCallback(
    (page: PageId, postSlug?: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(page, postSlug);
    },
    [navigate]
  );
}
