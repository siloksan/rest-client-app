import { act, render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { HistoryTableRow } from './history-table-row';
import messages from '../../i18n/dictionary/en.json';
import { NextIntlClientProvider } from 'next-intl';
import * as snackBarStore from '@/store/snackbar/snackbar-store';

describe('HistoryTableRow', () => {
  const testHistoryRecord = {
    user: 'test',
    requestDate: 123,
    requestMethod: 'GET',
    requestedUrl: 'http://jsonplaceholder.typicode.com/todos/1',
    innerUrl:
      'http://localhost:3000/en/rest-client/GET/aHR0cDovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvMQ==',
  };
  const mockedDeleteRecord = vi.fn();
  const mockedCopyResolve = vi.fn(() => Promise.resolve());
  const mockedCopyReject = vi.fn(() =>
    Promise.reject(new Error('Forced error'))
  );

  vi.mock(import('next-intl'), async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useLocale: vi.fn(() => 'en'),
    };
  });

  it('should render HistoryTableRow component without crash', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => null);
    Object.assign(navigator, {
      clipboard: {
        writeText: mockedCopyResolve,
      },
    });

    const mockedShowSnackbar = vi
      .spyOn(snackBarStore, 'showSnackbar')
      .mockImplementation(() => null);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <table>
          <tbody>
            <HistoryTableRow
              historyRecord={testHistoryRecord}
              deleteRecord={mockedDeleteRecord}
            />
          </tbody>
        </table>
      </NextIntlClientProvider>
    );
    const deleteBtn = screen.getByTitle(messages.HistoryPage.buttons.delete);
    const copyBtn = screen.getByTitle(messages.HistoryPage.buttons.copy);
    expect(deleteBtn).toBeInTheDocument();

    deleteBtn.click();
    expect(mockedDeleteRecord).toBeCalled();

    await act(async () => {
      copyBtn.click();
    });

    expect(mockedCopyResolve).toBeCalledWith(testHistoryRecord.requestedUrl);
    expect(mockedShowSnackbar).toBeCalledTimes(1);

    Object.assign(navigator, {
      clipboard: {
        writeText: mockedCopyReject,
      },
    });
    await act(async () => {
      try {
        await act(async () => {
          copyBtn.click();
        });
      } catch (error) {
        expect(error).toEqual(new Error('Something went wrong'));
        expect(mockedShowSnackbar).toBeCalledTimes(1);
      }
    });
  });
});
