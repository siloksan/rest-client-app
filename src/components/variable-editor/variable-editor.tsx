'use client';

import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Variable } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { VariableField } from '../variable-field/variable-field';
import { useVariableStore } from '@/store/variables/variable-store-provider';
import { LOCALE_KEYS } from '@/constants/local';
import { showSnackbar } from '@/store/snackbar/snackbar-store';
import Alert from '@mui/material/Alert';
import { useTranslations } from 'next-intl';

const initialField = {
  name: '',
  value: '',
};

export function VariableEditor() {
  const deleteVariableFromStore = useVariableStore(
    (state) => state.deleteVariableFromStore
  );

  const translateMessage = useTranslations('VariablesPage.messages');

  const [fields, setFields] = useState<Variable[]>([]);

  useEffect(() => {
    const variablesString = localStorage.getItem(LOCALE_KEYS.VARIABLES);

    if (variablesString) {
      setFields(JSON.parse(variablesString));
    } else {
      setFields([{ ...initialField, key: uuidv4() }]);
    }
  }, []);

  const addNewField = () => {
    setFields((prevFields) => {
      return [...prevFields, { ...initialField, key: uuidv4() }];
    });
  };

  const deleteVariable = (key: string) => {
    setFields((prevFields) => {
      return prevFields.filter((field) => field.key !== key);
    });

    showSnackbar(
      <Alert severity="success">{translateMessage('delete')}</Alert>
    );
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
