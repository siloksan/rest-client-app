'use client';

import { LOCAL_KEYS } from '@/constants/local-keys';
import { Variable } from '@/types';
import { createStore } from 'zustand/vanilla';

interface VariablesState {
  variables: Variable[];
}

export interface VariablesActions {
  addVariable: (variable: Variable) => void;
  deleteVariableFromStore: (key: Variable['key']) => void;
  loadFromLocalStorage: () => void;
  updateVariable: (variable: Variable) => void;
}

export type VariablesStore = VariablesState & VariablesActions;

export const initVariablesState: VariablesState = {
  variables: [],
};

export const createVariableStore = (
  initState: VariablesState = initVariablesState
) => {
  return createStore<VariablesStore>()((set) => ({
    ...initState,
    addVariable: (variable: Variable) => {
      set((state) => {
        const updatedVariables = [...state.variables, variable];
        localStorage.setItem(
          LOCAL_KEYS.VARIABLES,
          JSON.stringify(updatedVariables)
        );

        return { variables: updatedVariables };
      });
    },

    deleteVariableFromStore: (variableKey: string) => {
      set((state) => {
        const updatedVariables = state.variables.filter(
          (variable) => variable.key !== variableKey
        );

        localStorage.setItem(
          LOCAL_KEYS.VARIABLES,
          JSON.stringify(updatedVariables)
        );

        return { variables: updatedVariables };
      });
    },

    updateVariable: (variable: Variable) => {
      set((state) => {
        const updatedVariables = state.variables.map((storedVariable) => {
          if (storedVariable.key === variable.key) {
            return variable;
          }

          return storedVariable;
        });

        localStorage.setItem(
          LOCAL_KEYS.VARIABLES,
          JSON.stringify(updatedVariables)
        );

        return { variables: updatedVariables };
      });
    },

    loadFromLocalStorage: () => {
      const storedValueString = localStorage.getItem(LOCAL_KEYS.VARIABLES);
      console.log('storedValueString: ', storedValueString);
      if (storedValueString) {
        set({ variables: JSON.parse(storedValueString) });
      }
    },
  }));
};
