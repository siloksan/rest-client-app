import { Variable } from '@/types';
import { Field } from '../fields/fields';
import { useState } from 'react';
import { CODE_GENERATOR_LANGUAGES, LOCAL_KEYS } from '@/constants';
import { useLocalStorage } from '@/hooks';
import { showSnackbar } from '@/store/snackbar/snackbar-store';
import * as codegen from 'postman-code-generators';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CodeEditor } from '../code-editor/code-editor';
import { createRequest } from '@/utils';
import { useTranslations } from 'next-intl';

export interface CodeGeneratorProps {
  method: string;
  url: string;
  headers: Field[];
  body: string;
  snippet: string;
  setSnippet: (snippet: string) => void;
}

export function CodeGenerator({
  method,
  url,
  headers,
  body,
  snippet,
  setSnippet,
}: CodeGeneratorProps) {
  const [language, setLanguage] = useState(CODE_GENERATOR_LANGUAGES[0]);
  const translate = useTranslations('RestClient.CodeGenerator');

  const { storedValue: variables } = useLocalStorage<Variable[]>(
    LOCAL_KEYS.VARIABLES,
    []
  );

  const generateCode = () => {
    const request = createRequest({ body, headers, method, url, variables });

    if (!request) {
      setSnippet(`// ${translate('errorMessageInEditor')}`);
      showSnackbar(
        <Alert severity="error">{translate('snackMessageError')}</Alert>
      );
      return;
    }

    codegen.convert(
      language.name,
      language.variant,
      request,
      {
        indentCount: 2,
        indentType: 'Space',
        trimRequestBody: true,
      },
      (error, generatedCode) => {
        if (error || !generatedCode) {
          setSnippet(
            `// ${translate('unknownErrorMessage', { error: error?.message ?? '' })}`
          );
          showSnackbar(
            <Alert severity="error">{translate('snackMessageError')}</Alert>
          );
        } else {
          setSnippet(generatedCode);
          showSnackbar(
            <Alert severity="success">{translate('snackMessageSuccess')}</Alert>
          );
        }
      }
    );
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedLanguage = CODE_GENERATOR_LANGUAGES.find(
      (language) => language.label === event.target.value
    );
    setLanguage(selectedLanguage || CODE_GENERATOR_LANGUAGES[0]);
  };

  return (
    <section>
      <CodeEditor
        value={snippet}
        extensions={[language.extension()]}
        editable={false}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ width: 180 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="language-select">
              {translate('selectLabel')}
            </InputLabel>
            <Select
              labelId="language-select"
              id="language-select"
              value={language.label}
              label="Language"
              onChange={handleChange}
            >
              {CODE_GENERATOR_LANGUAGES.map((language) => (
                <MenuItem key={language.label} value={language.label}>
                  {language.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button variant="outlined" onClick={generateCode}>
          {translate('buttonGenerate')}
        </Button>
      </Box>
    </section>
  );
}
