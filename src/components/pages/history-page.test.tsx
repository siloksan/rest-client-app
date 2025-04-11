import { act, render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import messages from '../../i18n/dictionary/en.json';
import { NextIntlClientProvider } from 'next-intl';
import HistoryPage from './history-page';
import { LOCAL_KEYS } from '@/constants/local-keys';

describe('HistoryTableRow', () => {
  const testHistoryRecords = [
    {
      user: 'default user',
      requestDate: 1,
      requestMethod: 'GET',
      requestedUrl: 'http://jsonplaceholder.typicode.com/todos/1',
      innerUrl:
        'http://localhost:3000/en/rest-client/GET/aHR0cDovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvMQ==',
    },
    {
      user: 'default user',
      requestDate: 2,
      requestMethod: 'POST',
      requestedUrl: 'http://jsonplaceholder.typicode.com/todos/2',
      innerUrl:
        'http://localhost:3000/en/rest-client/POST/aHR0cDovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvMg==',
    },
  ];

  vi.mock(import('next-intl'), async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useLocale: vi.fn(() => 'en'),
    };
  });

  it('should render empty HistoryTable component without crash', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HistoryPage />
      </NextIntlClientProvider>
    );

    expect(
      screen.getByText(messages.HistoryPage.emptyMessage)
    ).toBeInTheDocument();
  });

  it('should render not empty HistoryTable component without crash', async () => {
    localStorage.setItem(
      LOCAL_KEYS.HISTORY,
      JSON.stringify(testHistoryRecords)
    );

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HistoryPage />
      </NextIntlClientProvider>
    );

    expect(
      screen.getByText(testHistoryRecords[0].requestedUrl)
    ).toBeInTheDocument();

    const deleteBtns = screen.getAllByTitle(
      messages.HistoryPage.buttons.delete
    );

    await act(async () => {
      deleteBtns[0].click();
    });

    expect(
      JSON.parse(localStorage.getItem(LOCAL_KEYS.HISTORY) ?? '').length
    ).toEqual(1);

    const clearBtn = screen.getByText(messages.HistoryPage.buttons.clear);
    expect(clearBtn).toBeInTheDocument();

    await act(async () => {
      clearBtn.click();
    });

    expect(
      JSON.parse(localStorage.getItem(LOCAL_KEYS.HISTORY) ?? '').length
    ).toEqual(0);
  });
});
