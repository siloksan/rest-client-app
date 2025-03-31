'use client';

import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
import { Variable } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { VariableField } from '../variable-field/variable-field';
import { useVariableStore } from '@/store/variables/variable-store-provider';

const initialFields = {
  name: '',
  value: '',
};

export function VariableEditor() {
  const variables = useVariableStore((state) => state.variables);
  console.log('variables: ', variables);

  const deleteVariableFromStore = useVariableStore(
    (state) => state.deleteVariableFromStore
  );

  const [fields, setFields] = useState<Variable[]>([
    ...variables,
    { ...initialFields, key: uuidv4() },
  ]);

  useEffect(() => {
    setFields([...variables, { ...initialFields, key: uuidv4() }]);
  }, [variables]);

  const keysCollection = useRef(new Set<string>());

  const addNewField = () => {
    setFields((prevFields) => {
      let key = uuidv4();
      while (keysCollection.current.has(key)) {
        key = uuidv4();
      }

      return [...prevFields, { ...initialFields, key }];
    });
  };

  const deleteVariable = (key: string) => {
    setFields((prevFields) => {
      return prevFields!.filter((field) => field.key !== key);
    });

    deleteVariableFromStore(key);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {fields?.map(({ key, name, value }) => (
        <VariableField
          key={key}
          idx={key}
          variableName={name}
          variableValue={value}
          addNewField={addNewField}
          deleteVariable={deleteVariable}
        />
      ))}
    </Box>
  );
}
