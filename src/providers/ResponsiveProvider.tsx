import { createContext, ReactNode } from 'react';

export const ResponsiveContext = createContext([980]);

interface ResponsiveProviderProps {
  value: number[],
  children: ReactNode,
}

export function ResponsiveProvider({ value, children }: ResponsiveProviderProps) {
  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
}
