'use client';

import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Variable } from '@/types';
import { LOCAL_KEYS } from '@/constants';
import { useLocalStorage } from '@/hooks';
import { v4 as uuidv4 } from 'uuid';
import { VariableField } from '../variable-field/variable-field';
import { showSnackbar } from '@/store/snackbar/snackbar-store';
import Alert from '@mui/material/Alert';
import { useTranslations } from 'next-intl';
import Button from '@mui/material/Button';
import {
  addVariableToLocalStorage,
  deleteVariableFromLocalStorage,
  updateVariableInLocalStorage,
} from './variable-editor.utils';

const initialField = {
  name: '',
  value: '',
};

export function VariableEditor() {
  const translateMessage = useTranslations('VariablesPage.messages');
  const translateButtons = useTranslations('VariablesPage.buttons');
  const { storedValue, setStoredValue, initialized } = useLocalStorage<
    Variable[]
  >(LOCAL_KEYS.VARIABLES, []);
  const [fields, setFields] = useState<Variable[]>([]);

  const addVariable = ({ key, name, value }: Variable) => {
    addVariableToLocalStorage(
      {
        key,
        name,
        value,
      },
      storedValue,
      setStoredValue
    );

    showSnackbar(<Alert severity="success">{translateMessage('added')}</Alert>);
  };

  const updateVariable = (variable: Variable) => {
    updateVariableInLocalStorage(variable, storedValue, setStoredValue);

    showSnackbar(
      <Alert severity="success">{translateMessage('update')}</Alert>
    );
  };

  useEffect(() => {
    if (storedValue.length > 0) {
      setFields(storedValue);
    } else if (initialized) {
      setFields([{ ...initialField, key: uuidv4() }]);
    }
  }, [initialized]);

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

    deleteVariableFromLocalStorage(key, storedValue, setStoredValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {fields?.map(({ key, name, value }) => (
        <VariableField
          key={key}
          idx={key}
          variableName={name}
          variableValue={value}
          variables={storedValue}
          deleteVariable={deleteVariable}
          addVariable={addVariable}
          updateVariable={updateVariable}
        />
      ))}
      <Button onClick={addNewField} variant="outlined">
        {translateButtons('addField')}
      </Button>
    </Box>
  );
}
