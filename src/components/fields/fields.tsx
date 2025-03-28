'use client';

import { Box, Button, Checkbox, TextField } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface Field {
  id: number;
  isActive: boolean;
  fieldKey: string;
  value: string;
}

interface Props {
  handler: Dispatch<SetStateAction<Field[]>>;
  value: Field[];
}

export const initialField: Field = {
  id: 0,
  isActive: false,
  fieldKey: '',
  value: '',
};

export function Fields({ handler, value }: Props) {
  const handleAddField = () => {
    handler((prevState) => [
      ...prevState,
      { ...initialField, id: prevState.length },
    ]);
  };
  const handleChangeField = (
    id: number,
    data: { [key: string]: string | boolean }
  ) => {
    handler((prevState) => {
      return prevState.map((header) =>
        header.id === id ? { ...header, ...data } : header
      );
    });
  };

  return (
    <Box pt={'1em'}>
      <Button variant="outlined" size="small" onClick={handleAddField}>
        Add field
      </Button>
      {value.map((field) => {
        const { id, fieldKey, value, isActive } = field;

        return (
          <Box key={id} sx={{ display: 'flex', gap: '.5em', mt: '.5em' }}>
            <Checkbox
              checked={isActive}
              onChange={() =>
                handleChangeField(id, {
                  isActive: !isActive,
                })
              }
            />
            <TextField
              variant="standard"
              name="fieldKey"
              placeholder="Key"
              value={fieldKey}
              onChange={({ currentTarget }) =>
                handleChangeField(id, {
                  [currentTarget.name]: currentTarget.value,
                })
              }
            />
            <TextField
              variant="standard"
              name="value"
              placeholder="Value"
              value={value}
              onChange={({ currentTarget }) =>
                handleChangeField(id, {
                  [currentTarget.name]: currentTarget.value,
                })
              }
            />
          </Box>
        );
      })}
    </Box>
  );
}
