'use client';

import { LOCALE_KEYS } from '@/constants/local';
import { Variable } from '@/types';
import { createStore } from 'zustand/vanilla';

interface VariablesState {
  variables: Variable[];
}

export interface VariablesActions {
  addVariable: (variable: Variable) => void;
  deleteVariableFromStore: (key: Variable['key']) => void;
  changeActiveFlag: (active: boolean, key: Variable['key']) => void;
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
          LOCALE_KEYS.VARIABLES,
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
          LOCALE_KEYS.VARIABLES,
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
          LOCALE_KEYS.VARIABLES,
          JSON.stringify(updatedVariables)
        );

        return { variables: updatedVariables };
      });
    },
    changeActiveFlag: (active: boolean, key: Variable['key']) => {
      set((state) => {
        const updatedVariables = state.variables.map((variable) => {
          if (variable.key === key) {
            return { ...variable, active };
          }

          return variable;
        });

        localStorage.setItem(
          LOCALE_KEYS.VARIABLES,
          JSON.stringify(updatedVariables)
        );

        return { variables: updatedVariables };
      });
    },

    loadFromLocalStorage: () => {
      // if (typeof window !== 'undefined') {
      const storedValueString = localStorage.getItem(LOCALE_KEYS.VARIABLES);
      if (storedValueString) {
        set({ variables: JSON.parse(storedValueString) });
      }
      // }
    },
  }));
};

// export const useVariablesStore = create<VariablesState>((set) => ({
//   variables: [],

//   addVariable: (variable) => {
//     set((state) => {
//       const updatedVariables = [...state.variables, variable];

//       // if (typeof window !== 'undefined') {
//       //   localStorage.setItem(
//       //     LOCALE_KEYS.VARIABLES,
//       //     JSON.stringify(updatedVariables)
//       //   );
//       // }

//       return { variables: updatedVariables };
//     });
//   },

//   deleteVariableFromStore: (variableKey: string) => {
//     set((state) => {
//       const updatedVariables = state.variables.filter(
//         (v) => v.key !== variableKey
//       );

//       if (typeof window !== 'undefined') {
//         localStorage.setItem(
//           LOCALE_KEYS.VARIABLES,
//           JSON.stringify(updatedVariables)
//         );
//       }

//       return { variables: updatedVariables };
//     });
//   },

//   loadFromLocalStorage: () => {
//     if (typeof window !== 'undefined') {
//       const storedValueString = localStorage.getItem(LOCALE_KEYS.VARIABLES);
//       if (storedValueString) {
//         set({ variables: JSON.parse(storedValueString) });
//       }
//     }
//   },
// }));
