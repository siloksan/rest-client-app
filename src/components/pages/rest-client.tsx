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
  Container,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import { initialField, Field, Fields } from '../fields/fields';
import { CodeEditor } from '../code-editor/code-editor';
import { ResponseField } from '../response-field/response-field';
import {
  BodyTypeNamesType,
  HistoryRecordType,
  Methods,
  Variable,
} from '@/types';
import { useRouter } from 'next/navigation';
import { bytesToBase64 } from '@/utils/converterBase64';
import { useTranslations } from 'next-intl';
import useUrlData from '@/hooks/use-url-data';
import { LOCAL_KEYS } from '@/constants/local-keys';
import { useLocalStorage } from '@/hooks';
import { replaceVariables } from '@/utils';
import { CodeGenerator } from '../code-generator/code-generator';
import useDebounce from '@/hooks/use-debounce';
import { userAuthStore } from '@/store/userAuth/userAuth-store';

export default function RestClient() {
  const dataFromUrl = useUrlData();
  const router = useRouter();
  const [method, setMethod] = useState<string>(
    dataFromUrl.method || Methods.GET
  );
  const [url, setUrl] = useState(dataFromUrl.url);
  const [headers, setHeaders] = useState<Field[]>(
    dataFromUrl.headers || [initialField]
  );

  const [codeBody, setCodeBody] = useState(dataFromUrl.body);
  const [bodyType, setBodyType] = useState<BodyTypeNamesType>('text');
  const [snippet, setSnippet] = useState('');

  const [response, setResponse] = useState<{
    status: number;
    data: string;
  } | null>(null);
  const { storedValue: variables } = useLocalStorage<Variable[]>(
    LOCAL_KEYS.VARIABLES,
    []
  );

  const history = useLocalStorage<HistoryRecordType[]>(LOCAL_KEYS.HISTORY, []);
  const userName =
    userAuthStore((state) => state.userData?.email) ?? 'default user';

  const translate = useTranslations('RestCards');
  const translateRestClient = useTranslations('RestClient');
  const translateBtn = useTranslations('Buttons');
  const TABS = {
    HEADERS: translateRestClient('headers'),
    GENERATOR: translateRestClient('generator'),
    BODY: translateRestClient('body'),
  } as const;

  const tabs = [TABS.HEADERS, TABS.GENERATOR, TABS.BODY];

  const [tab, setTab] = useState<string>(tabs[0]);

  const handleRoutePush = useCallback(() => {
    const urlWithVariables = replaceVariables(url, variables);
    const urlBase64 = bytesToBase64(new TextEncoder().encode(urlWithVariables));
    const searchParams = new URLSearchParams();
    let nextUrl = `/${location.pathname.split('/')[1]}/rest-client/${method}/${urlBase64}`;

    if (method !== Methods.GET) {
      const bodyWithVariables = replaceVariables(codeBody, variables);
      const bodyBase64 = bytesToBase64(
        new TextEncoder().encode(bodyWithVariables)
      );
      nextUrl += `/${bodyBase64}`;
    }

    headers.forEach((header) => {
      if (header.isActive) {
        const headerWithVariableValue = replaceVariables(
          header.value,
          variables
        );
        searchParams.set(
          header.fieldKey,
          encodeURIComponent(headerWithVariableValue)
        );
      }
    });

    nextUrl += `?${searchParams.toString()}`;
    router.push(nextUrl);
  }, [codeBody, headers, method, router, url, variables]);

  const handleChangeMethod = ({ target: { value } }: SelectChangeEvent) => {
    setMethod(value);
  };

  const handleChangeUrl = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setUrl(value);

  const handleChangeTab = (event: SyntheticEvent, newValue: string) =>
    setTab(newValue);

  const handleSendButton = async () => {
    const { pathname, search } = location;
    const response = await fetch(
      `/api/${pathname.split('/').slice(3).join('/')}${search}`
    );
    const data = await response.json();

    setResponse({
      status: data.status,
      data: JSON.stringify(data.data, null, 2),
    });

    history.setStoredValue([
      ...history.storedValue,
      {
        user: userName,
        requestDate: new Date().getTime(),
        requestMethod: method,
        requestedUrl: url,
        innerUrl: location.toString(),
      },
    ]);
  };

  useDebounce(handleRoutePush, 300);

  return (
    <Container sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
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
          <Button variant="outlined" type="submit" onClick={handleSendButton}>
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
          {tab === TABS.HEADERS && (
            <Fields handler={setHeaders} value={headers} />
          )}
          {tab === TABS.GENERATOR && (
            <CodeGenerator
              snippet={snippet}
              setSnippet={setSnippet}
              method={method}
              url={url}
              body={codeBody}
              headers={headers}
            />
          )}
          {tab === TABS.BODY && (
            <CodeEditor
              handler={setCodeBody}
              value={codeBody}
              bodyType={bodyType}
              setBodyType={setBodyType}
            />
          )}
        </Box>
        {response && (
          <ResponseField status={response.status} value={response.data} />
        )}
      </Box>
    </Container>
  );
}
