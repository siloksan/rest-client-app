'use client';

import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import CodeMirror, { Extension } from '@uiw/react-codemirror';
import {
  Alert,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import FormatIndentIncreaseTwoToneIcon from '@mui/icons-material/FormatIndentIncreaseTwoTone';
import { showSnackbar } from '@/store/snackbar/snackbar-store';
import { BodyTypeNamesType } from '@/types';
import { BODY_TYPES } from '@/constants';
import { useTranslations } from 'next-intl';
interface Props {
  handler?: Dispatch<SetStateAction<string>>;
  value: string;
  editable?: boolean;
  extensions?: Extension[];
  bodyType?: BodyTypeNamesType;
  setBodyType?: Dispatch<SetStateAction<BodyTypeNamesType>>;
}

export function CodeEditor({
  editable = true,
  handler,
  value,
  extensions,
  bodyType = 'text',
  setBodyType = () => {},
}: Readonly<Props>) {
  const translate = useTranslations('RestClient.CodeEditor');
  const [parsedCode, setParsedCode] = React.useState<string>('');
  const [statusBar, setStatusBar] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const formatHandler = useCallback(() => {
    if (handler && !errorMessage) {
      handler(parsedCode);
      showSnackbar(
        <Alert severity="success">{translate('snackMessageSuccess')}</Alert>
      );
    }
  }, [errorMessage, handler, parsedCode, translate]);

  const handleBodyTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newBodyType: BodyTypeNamesType
  ) => {
    setBodyType(newBodyType);
  };

  useEffect(() => {
    const [parsedValue, error] = BODY_TYPES.find(
      (type) => type.name == bodyType
    )?.parser(value) || ['', ''];
    setParsedCode(parsedValue);
    setErrorMessage(error);
  }, [bodyType, value]);

  const keyboardHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'F' && event.altKey && event.shiftKey) {
        formatHandler();
      }
    },
    [formatHandler]
  );

  useEffect(() => {
    window.addEventListener('keydown', keyboardHandler);
    return () => {
      window.removeEventListener('keydown', keyboardHandler);
    };
  }, [keyboardHandler]);

  return (
    <>
      {editable ? (
        <Toolbar sx={{ gap: 2 }}>
          <ToggleButtonGroup
            value={bodyType}
            exclusive
            onChange={handleBodyTypeChange}
            aria-label="body type"
            size="small"
          >
            {BODY_TYPES.map((type) => (
              <ToggleButton key={type.name} value={type.name}>
                {type.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <IconButton
            aria-label="format"
            size="medium"
            color="primary"
            title={`${translate('buttonFormat')} (Ctrl+Alt+F)`}
            onClick={formatHandler}
            sx={{
              display: 'flex',
              gap: 1,
              borderRadius: 2,
              border: '1px solid blue',
              '&:disabled': { border: '1px solid lightgray' },
            }}
            disabled={bodyType == 'text' || !!errorMessage}
          >
            <FormatIndentIncreaseTwoToneIcon
              fontSize="medium"
              color="primary"
              sx={{ opacity: errorMessage ? 0.5 : 1 }}
            />
            <Typography>{translate('buttonFormat')}</Typography>
          </IconButton>
        </Toolbar>
      ) : null}
      <CodeMirror
        value={value}
        height="200px"
        extensions={
          !editable
            ? extensions
            : BODY_TYPES.find((type) => type.name == bodyType)?.extension()
        }
        editable={editable}
        onChange={
          handler
            ? (val: string) => {
                handler(val);
              }
            : undefined
        }
        onUpdate={(cm) => {
          const { selection } = cm.state;
          const line = cm.view.state.doc.lineAt(selection.main.from);
          setStatusBar(
            translate('normalStatusLine', {
              line: String(line.number),
              lines: String(cm.state.doc.lines),
              column: String(cm.state.selection.main.head - line.from + 1),
            })
          );
          const text = cm.state.sliceDoc(
            selection.main.from,
            selection.main.to
          );
          if (text) {
            setStatusBar(
              translate('selectedStatusLine', {
                lines: String(text.split('\n').length),
                characters: String(text.length),
              })
            );
          }
        }}
      />
      {editable ? (
        <Toolbar
          variant="dense"
          sx={{ minHeight: 24, backgroundColor: 'rgba(0, 10, 20, 0.1)' }}
        >
          <Typography variant="body2" width={200}>
            {statusBar && <span> {statusBar} </span>}
          </Typography>
          <Typography variant="body2" color="error" sx={{ marginLeft: 2 }}>
            {errorMessage && <span> {errorMessage} </span>}
          </Typography>
        </Toolbar>
      ) : null}
    </>
  );
}
