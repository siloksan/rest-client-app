import { Methods, Variable } from '@/types';
import { Field } from '../fields/fields';
import { useState } from 'react';
import { CODE_GENERATOR_LANGUAGES, LOCAL_KEYS } from '@/constants';
import { useLocalStorage } from '@/hooks';
import { showSnackbar } from '@/store/snackbar/snackbar-store';
import * as codegen from 'postman-code-generators';
import Alert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionActions from '@mui/material/AccordionActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CodeEditor } from '../code-editor/code-editor';
import { createRequest } from '@/utils';

export interface CodeGeneratorProps {
  method: Methods;
  url: string;
  headers: Field[];
  body: string;
}

export function CodeGenerator({
  method,
  url,
  headers,
  body,
}: CodeGeneratorProps) {
  const [language, setLanguage] = useState(CODE_GENERATOR_LANGUAGES[0]);

  const { storedValue: variables } = useLocalStorage<Variable[]>(
    LOCAL_KEYS.VARIABLES,
    []
  );

  const [snippet, setSnippet] = useState('');

  const generateCode = () => {
    const request = createRequest({ body, headers, method, url, variables });

    if (!request) {
      setSnippet('// Please provide a valid data');
      showSnackbar(<Alert severity="error">Generate code is failed</Alert>);
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
          setSnippet(`// Failed to generate code: ${error?.message}`);
          showSnackbar(<Alert severity="error">Generate code is failed</Alert>);
        } else {
          setSnippet(generatedCode);
          showSnackbar(
            <Alert severity="success">Code generated successfully</Alert>
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
        >
          <Typography component="span">Code Generator</Typography>
        </AccordionSummary>
        <AccordionActions>
          <Box sx={{ width: 180 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="language-select">Language</InputLabel>
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
            Generate Code
          </Button>
        </AccordionActions>
        <CodeEditor value={snippet} extensions={[language.extension()]} />
      </Accordion>
    </section>
  );
}
