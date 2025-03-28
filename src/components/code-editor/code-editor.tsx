import React, { Dispatch, SetStateAction } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

interface Props {
  handler?: Dispatch<SetStateAction<string>>;
  value: string;
  editable?: boolean;
}

export function CodeEditor({ editable = true, handler, value }: Props) {
  return (
    <CodeMirror
      value={value}
      height="200px"
      extensions={[json()]}
      onChange={handler ? (val: string) => handler(val) : undefined}
      editable={editable}
    />
  );
}
