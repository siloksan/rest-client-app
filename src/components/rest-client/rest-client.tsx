'use client';

import {
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  TextField,
  Box,
  Tabs,
  Tab
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { initialField, Field, Fields } from '../fields/fields';

const METHODS = ['GET', 'POST', 'DELETE', 'PUT', 'PATH'];
const TABS = ['Headers', 'Query'];

export function RestClient() {
  const [method, setMethod] = useState<string>('');
  const [url, setUrl] = useState('');
  const [tab, setTab] = useState<string>(TABS[0]);
  const [headers, setHeaders] = useState<Field[]>([initialField]);
  const [queries, setQueries] = useState<Field[]>([initialField]);

  const handleChangeMethod = ({ target: { value } }: SelectChangeEvent) =>
    setMethod(value);
  const handleChangeUrl = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setUrl(value);
  const handleChangeTab = (event: SyntheticEvent, newValue: string) =>
    setTab(newValue);
  return (
    <Box
      sx={{ pt: '1.5em', flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      <Typography align="center" variant="h5" mb={'.5em'}>
        REST Client
      </Typography>
      <FormControl
        sx={{ display: 'flex', flexDirection: 'row', gap: '.5em' }}
        fullWidth
      >
        <InputLabel id="method-label">Method</InputLabel>
        <Select
          labelId="method-label"
          value={method}
          label="Method"
          onChange={handleChangeMethod}
          sx={{ width: '7em' }}
        >
          {METHODS.map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="URL"
          variant="outlined"
          value={url}
          onChange={handleChangeUrl}
          sx={{ flex: '1' }}
        />
        <Button variant="outlined" type="submit">
          Send
        </Button>
      </FormControl>
      <Box>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          aria-label="wrapped label tabs example"
        >
          {TABS.map((tab) => (
            <Tab value={tab} label={tab} key={tab} />
          ))}
        </Tabs>
        {tab === 'Headers' && <Fields handler={setHeaders} value={headers} />}
        {tab === 'Query' && <Fields handler={setQueries} value={queries} />}
      </Box>
    </Box>
  );
}
