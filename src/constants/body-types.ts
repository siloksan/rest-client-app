'use client';

import { parseJson, parseXml } from '@/utils';
import { json } from '@codemirror/lang-json';
import { xml } from '@codemirror/lang-xml';

export const BODY_TYPES = [
  {
    label: 'Text',
    name: 'text',
    extension: () => [],
    parser: (input: string) => [input, ''],
  },
  {
    label: 'JSON',
    name: 'json',
    extension: () => [json()],
    parser: parseJson,
  },
  {
    label: 'XML',
    name: 'xml',
    extension: () => [xml()],
    parser: parseXml,
  },
] as const;
