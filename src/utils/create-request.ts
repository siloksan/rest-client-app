import { CodeGeneratorProps } from '@/components/code-generator/code-generator';
import { replaceVariables } from './replace-variables';
import { Methods, Variable } from '@/types';
import { Header, RequestBody, Request } from 'postman-collection';

interface Arguments extends Omit<CodeGeneratorProps, 'snippet' | 'setSnippet'> {
  variables: Variable[];
}

export function createRequest({
  method,
  url,
  headers,
  body,
  variables,
}: Arguments) {
  if (!url) {
    return null;
  }

  const requestHeaders = headers
    .filter((header) => header.isActive)
    .map(({ fieldKey, value }) => {
      return new Header({
        key: fieldKey,
        value: replaceVariables(value, variables),
      });
    });

  const requestBody =
    method !== Methods.GET
      ? new RequestBody({
          mode: 'raw',
          raw: replaceVariables(body, variables),
        })
      : undefined;

  return new Request({
    method,
    url: replaceVariables(url, variables),
    header: requestHeaders,
    body: requestBody,
  });
}
