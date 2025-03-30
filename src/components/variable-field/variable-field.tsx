'use client';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useVariableStore } from '@/store/variables/variable-store-provider';

interface Props {
  variableName: string;
  variableValue: string;
  addNewField: () => void;
  deleteVariable: (key: string) => void;
  idx: string;
  active: boolean;
}

export function VariableField({
  variableName = '',
  variableValue = '',
  addNewField,
  deleteVariable,
  active,
  idx,
}: Props) {
  const [name, setName] = useState(variableName);
  const [value, setValue] = useState(variableValue);
  const [isActive, setIsActive] = useState(active);
  const { variables, addVariable, updateVariable } = useVariableStore(
    (state) => state
  );
  const saveVariableToLocalStorage = () => {
    if (!name || !value) {
      return;
    }

    setIsActive(!isActive);

    if (variables.some((variable) => variable.key === idx)) {
      updateVariable({
        key: idx,
        name,
        value,
        active: !isActive,
      });
    } else {
      addVariable({
        key: idx,
        name,
        value,
        active: !isActive,
      });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (variables.some((variable) => variable.key === idx)) {
      updateVariable({
        key: idx,
        name: e.target.value,
        value,
        active,
      });
    }

    setName(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (variables.some((variable) => variable.key === idx)) {
      updateVariable({
        key: idx,
        name,
        value: e.target.value,
        active,
      });
    }

    setValue(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Checkbox onChange={saveVariableToLocalStorage} checked={isActive} />
      <TextField
        label="Variable"
        maxRows={6}
        variant="outlined"
        size="small"
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        label="Value"
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
      <IconButton aria-label="add" size="medium">
        <SaveIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
