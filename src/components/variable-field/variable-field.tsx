'use client';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslations } from 'next-intl';
import { Variable } from '@/types';

interface Props {
  variableName: string;
  variableValue: string;
  deleteVariable: (key: string) => void;
  addVariable: (variable: Variable) => void;
  updateVariable: (variable: Variable) => void;
  variables: Variable[];
  idx: string;
}

export function VariableField({
  variableName = '',
  variableValue = '',
  deleteVariable,
  addVariable,
  updateVariable,
  variables,
  idx,
}: Props) {
  const [name, setName] = useState(variableName);
  const [value, setValue] = useState(variableValue);
  const translateFields = useTranslations('VariablesPage.fields');

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
    } else {
      addVariable({
        key: idx,
        name,
        value,
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        gap: 0.5,
      }}
    >
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
