'use client';

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
} from 'react';
import { useStore } from 'zustand';
import { createVariableStore, VariablesStore } from './variables';

export type VariableStoreApi = ReturnType<typeof createVariableStore>;

export const VariableStoreContext = createContext<VariableStoreApi | undefined>(
  undefined
);

export interface VariableStoreProviderProps {
  children: ReactNode;
}

export const VariablesStoreProvider = ({
  children,
}: VariableStoreProviderProps) => {
  const storeRef = useRef<VariableStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createVariableStore();
  }

  return (
    <VariableStoreContext.Provider value={storeRef.current}>
      {children}
    </VariableStoreContext.Provider>
  );
};

export const useVariableStore = <T,>(
  selector: (store: VariablesStore) => T
): T => {
  const variableStoreContext = useContext(VariableStoreContext);

  if (!variableStoreContext) {
    throw new Error(
      `useVariableStore must be used within VariablesStoreProvider`
    );
  }

  return useStore(variableStoreContext, selector);
};

export function LoadVariablesFromLocalStorage() {
  const loadFromLocalStorage = useVariableStore(
    (state) => state.loadFromLocalStorage
  );

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return null;
}
