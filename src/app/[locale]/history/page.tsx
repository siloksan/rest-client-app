'use client';

import HistoryTable from '@/components/history-table/history-table';
import { ROUTES } from '@/constants';
import { LOCAL_KEYS } from '@/constants/local-keys';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Link } from '@/i18n/navigation';
import { HistoryRecordType } from '@/types';
import { Box, Card, Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Page() {
  const translate = useTranslations('RestCards');
  const translatePage = useTranslations('HistoryPage');
  const { storedValue, setStoredValue } = useLocalStorage<HistoryRecordType[]>(
    LOCAL_KEYS.HISTORY,
    []
  );

  const deleteRecord = (requestDate: number) => {
    setStoredValue(
      storedValue.filter(
        (record: HistoryRecordType) => record.requestDate != requestDate
      )
    );
  };

  const deleteAllRecords = () => {
    setStoredValue([]);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'background.paper',
      }}
    >
      <Typography
        variant="h1"
        sx={{ mb: 1, textAlign: 'center', fontSize: 40 }}
      >
        {translate('history.title')}
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 5, textAlign: 'center', fontSize: 20 }}
      >
        {translate('history.description')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {storedValue.length ? (
          <HistoryTable
            historyRecords={storedValue}
            deleteRecord={deleteRecord}
            deleteAllRecords={deleteAllRecords}
          />
        ) : (
          <Box>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              {translatePage('emptyMessage')}
            </Typography>
            <Card sx={{ width: 200, padding: 1, textAlign: 'center' }}>
              <Link href={ROUTES.REST_CLIENT}>
                <Typography variant="h6" component="div">
                  {translate('client.title')}
                </Typography>
              </Link>
            </Card>
          </Box>
        )}
      </Box>
    </Container>
  );
}
