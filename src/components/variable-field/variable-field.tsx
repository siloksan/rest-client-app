'use client';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useVariableStore } from '@/store/variables/variable-store-provider';
import { showSnackbar } from '@/store/snackbar/snackbar-store';
import Alert from '@mui/material/Alert';
import { useTranslations } from 'next-intl';

interface Props {
  variableName: string;
  variableValue: string;
  addNewField: () => void;
  deleteVariable: (key: string) => void;
  idx: string;
}

export function VariableField({
  variableName = '',
  variableValue = '',
  addNewField,
  deleteVariable,
  idx,
}: Props) {
  const [name, setName] = useState(variableName);
  const [value, setValue] = useState(variableValue);
  const { variables, addVariable, updateVariable } = useVariableStore(
    (state) => state
  );

  const translateFields = useTranslations('VariablesPage.fields');
  const translateMessage = useTranslations('VariablesPage.messages');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const variable = variables.find((variable) => variable.key === idx);
  const isChanged = variable?.name !== name || variable?.value !== value;
  const isEmpty = !name || !value;

  const saveVariableToLocalStorage = () => {
    if (isEmpty) {
      return;
    }

    if (variable) {
      updateVariable({
        ...variable,
        name,
        value,
      });

      showSnackbar(
        <Alert severity="success">{translateMessage('update')}</Alert>
      );
    } else {
      addVariable({
        key: idx,
        name,
        value,
      });

      showSnackbar(
        <Alert severity="success">{translateMessage('added')}</Alert>
      );
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <TextField
        label={translateFields('name')}
        maxRows={6}
        variant="outlined"
        size="small"
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        label={translateFields('value')}
        maxRows={6}
        variant="outlined"
        size="small"
        value={value}
        onChange={handleValueChange}
      />
      <IconButton
        aria-label="delete"
        size="medium"
        onClick={() => deleteVariable(idx)}
      >
        <DeleteForeverIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="add" size="medium" onClick={addNewField}>
        <AddIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        aria-label="add"
        size="medium"
        color="success"
        onClick={saveVariableToLocalStorage}
        disabled={!isChanged || isEmpty}
      >
        <SaveIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
