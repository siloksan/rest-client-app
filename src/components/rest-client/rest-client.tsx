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
  Tab,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { initialField, Field, Fields } from '../fields/fields';
import { CodeEditor } from '../code-editor/code-editor';
import { ResponseField } from '../response-field/response-field';
import { Methods } from '@/types';
import { useTranslations } from 'next-intl';

export function RestClient() {
  const tabs = ['Headers', 'Query', 'Body'];
  const [method, setMethod] = useState<string>(Methods.GET);
  const [url, setUrl] = useState('');
  const [tab, setTab] = useState<string>(tabs[0]);
  const [headers, setHeaders] = useState<Field[]>([initialField]);
  const [queries, setQueries] = useState<Field[]>([initialField]);
  const [codeBody, setCodeBody] = useState('{}');
  const [response] = useState<string | null>('{test: code}');
  const translate = useTranslations('RestCards');
  const translateRestClient = useTranslations('RestClient');
  const translateBtn = useTranslations('Buttons');

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
        {translate('client.title')}
      </Typography>
      <FormControl
        sx={{ display: 'flex', flexDirection: 'row', gap: '.5em' }}
        fullWidth
      >
        <InputLabel id="method-label">
          {translateRestClient('method')}
        </InputLabel>
        <Select
          labelId="method-label"
          value={method}
          label="Method"
          onChange={handleChangeMethod}
          sx={{ width: '7em' }}
        >
          {Object.values(Methods).map((method) => (
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
          {translateBtn('send')}
        </Button>
      </FormControl>
      <Box>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          aria-label="wrapped label tabs example"
        >
          {tabs.map((tab) => (
            <Tab value={tab} label={tab} key={tab} />
          ))}
        </Tabs>
        {tab === 'Headers' && <Fields handler={setHeaders} value={headers} />}
        {tab === 'Query' && <Fields handler={setQueries} value={queries} />}
        {tab === 'Body' && (
          <CodeEditor handler={setCodeBody} value={codeBody} />
        )}
      </Box>
      {response && <ResponseField status={200} value={response} />}
    </Box>
  );
}
