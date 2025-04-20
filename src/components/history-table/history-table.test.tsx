import { act, render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import messages from '../../i18n/dictionary/en.json';
import { NextIntlClientProvider } from 'next-intl';
import HistoryTable from './history-table';

describe('HistoryTableRow', () => {
  const testHistoryRecords = [
    {
      user: 'test',
      requestDate: 1,
      requestMethod: 'GET',
      requestedUrl: 'http://jsonplaceholder.typicode.com/todos/1',
      innerUrl:
        'http://localhost:3000/en/rest-client/GET/aHR0cDovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvMQ==',
    },
    {
      user: 'test',
      requestDate: 2,
      requestMethod: 'POST',
      requestedUrl: 'http://jsonplaceholder.typicode.com/todos/2',
      innerUrl:
        'http://localhost:3000/en/rest-client/POST/aHR0cDovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvMg==',
    },
    {
      user: 'test',
      requestDate: 3,
      requestMethod: 'PUT',
      requestedUrl: 'http://jsonplaceholder.typicode.com/todos/3',
      innerUrl:
        'http://localhost:3000/en/rest-client/PUT/aHR0cDovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvMw==',
    },
    {
      user: 'test',
      requestDate: 4,
      requestMethod: 'PATCH',
      requestedUrl: 'http://jsonplaceholder.typicode.com/todos/4',
      innerUrl:
        'http://localhost:3000/en/rest-client/PATCH/aHR0cDovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvNA==',
    },
    {
      user: 'test',
      requestDate: 5,
      requestMethod: 'DELETE',
      requestedUrl: 'http://jsonplaceholder.typicode.com/todos/5',
      innerUrl:
        'http://localhost:3000/en/rest-client/DELETE/aHR0cDovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvNQ==',
    },
    {
      user: 'test',
      requestDate: 6,
      requestMethod: 'GET',
      requestedUrl: 'http://jsonplaceholder.typicode.com/todos/6',
      innerUrl:
        'http://localhost:3000/en/rest-client/GET/aHR0cDovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvNQ==',
    },
  ];
  const mockedDeleteAllRecords = vi.fn();

  vi.mock(import('next-intl'), async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useLocale: vi.fn(() => 'en'),
    };
  });

  it('should render HistoryTable component without crash', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HistoryTable
          historyRecords={testHistoryRecords}
          deleteRecord={() => {}}
          deleteAllRecords={mockedDeleteAllRecords}
        />
      </NextIntlClientProvider>
    );

    expect(
      screen.getByText(testHistoryRecords[5].requestedUrl)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(testHistoryRecords[0].requestedUrl)
    ).not.toBeInTheDocument();

    const sortBtn = screen.getByText(messages.HistoryPage.fields.time);

    await act(async () => {
      sortBtn.click();
    });

    expect(
      screen.getByText(testHistoryRecords[0].requestedUrl)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(testHistoryRecords[5].requestedUrl)
    ).not.toBeInTheDocument();

    const nexBtn = screen.getByTitle('Go to next page');

    await act(async () => {
      nexBtn.click();
    });

    const clearBtn = screen.getByText(messages.HistoryPage.buttons.clear);
    expect(clearBtn).toBeInTheDocument();

    await act(async () => {
      clearBtn.click();
    });

    expect(mockedDeleteAllRecords).toBeCalledTimes(1);
  });
});
