import { createRequest } from './create-request';
import { Methods } from '@/types';
import { RequestBody, Request } from 'postman-collection';

describe('createRequest', () => {
  const variableMock = {
    key: 'var1',
    name: 'testName',
    value: 'testValue',
  };
  const mockVariables = [variableMock];
  const headerTest = {
    id: 1,
    isActive: true,
    fieldKey: 'Content-Type',
    value: 'application/json',
  };
  const urlMock = 'https://api.test.com';
  const bodyMock = 'testBody';

  it('should return null if url is not provided', () => {
    const result = createRequest({
      method: Methods.GET,
      url: '',
      headers: [headerTest],
      body: bodyMock,
      variables: mockVariables,
    });

    expect(result).toBeNull();
  });

  it('should create a request with headers and body for non-GET methods', () => {
    const result = createRequest({
      method: Methods.POST,
      url: urlMock,
      headers: [headerTest],
      body: bodyMock,
      variables: mockVariables,
    });

    expect(result).toBeInstanceOf(Request);
    expect(result?.url.toString()).toBe(urlMock);
    expect(result?.headers.toJSON()).toEqual([
      { key: headerTest.fieldKey, value: headerTest.value },
    ]);
    expect(result?.body).toBeInstanceOf(RequestBody);
    expect(result?.body?.raw).toBe(bodyMock);
  });

  it('should create a request for GET methods', () => {
    const result = createRequest({
      method: Methods.GET,
      url: urlMock,
      headers: [headerTest],
      body: bodyMock,
      variables: mockVariables,
    });

    expect(result).toBeInstanceOf(Request);
    expect(result?.url.toString()).toBe(urlMock);
    expect(result?.headers.toJSON()).toEqual([
      { key: headerTest.fieldKey, value: headerTest.value },
    ]);
  });
});
