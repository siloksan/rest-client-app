import React, { Dispatch, SetStateAction } from 'react';
import CodeMirror, { Extension } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

interface Props {
  handler?: Dispatch<SetStateAction<string>>;
  value: string;
  editable?: boolean;
  extensions?: Extension[];
}

export function CodeEditor({
  editable = true,
  handler,
  value,
  extensions = [json()],
}: Props) {
  return (
    <CodeMirror
      value={value}
      height="200px"
      extensions={extensions}
      onChange={handler ? (val: string) => handler(val) : undefined}
      editable={editable}
    />
  );
}
