import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { go } from '@codemirror/lang-go';
import { cpp } from '@codemirror/lang-cpp';

export const CODE_GENERATOR_LANGUAGES = [
  {
    label: 'cURL',
    name: 'curl',
    variant: 'curl',
    extension: () => cpp(), // closest match
  },
  {
    label: 'JavaScript (Fetch)',
    name: 'javascript',
    variant: 'fetch',
    extension: () => javascript(),
  },
  {
    label: 'JavaScript (XHR)',
    name: 'javascript',
    variant: 'xhr',
    extension: () => javascript(),
  },
  {
    label: 'NodeJS',
    name: 'nodejs',
    variant: 'request',
    extension: () => javascript(),
  },
  {
    label: 'Python',
    name: 'python',
    variant: 'requests',
    extension: () => python(),
  },
  {
    label: 'Java',
    name: 'java',
    variant: 'okhttp',
    extension: () => java(),
  },
  {
    label: 'C#',
    name: 'csharp',
    variant: 'httpclient',
    extension: () => cpp(),
  },
  {
    label: 'Go',
    name: 'go',
    variant: 'native',
    extension: () => go(),
  },
];
