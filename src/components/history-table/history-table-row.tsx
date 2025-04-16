import { HistoryRecordType, Methods } from '@/types';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HistoryIcon from '@mui/icons-material/History';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { showSnackbar } from '@/store/snackbar/snackbar-store';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';

interface HistoryTableRowProps {
  historyRecord: HistoryRecordType;
  deleteRecord: (key: number) => void;
}

const methodColor: {
  [key: string]:
    | 'secondary'
    | 'success'
    | 'warning'
    | 'primary'
    | 'info'
    | 'default'
    | 'error';
} = {
  [Methods.GET]: 'success',
  [Methods.POST]: 'secondary',
  [Methods.DELETE]: 'warning',
  [Methods.PUT]: 'primary',
  [Methods.PATCH]: 'info',
};

export function HistoryTableRow({
  historyRecord,
  deleteRecord,
}: Readonly<HistoryTableRowProps>) {
  const locale = useLocale();
  const translateHistoryPage = useTranslations('HistoryPage');

  return (
    <TableRow
      tabIndex={-1}
      sx={{
        '&:nth-of-type(even)': {
          backgroundColor: 'rgba(128, 128, 128, 0.1)',
        },
      }}
    >
      <TableCell padding="normal" align="left">
        {new Date(historyRecord.requestDate).toLocaleString(locale)}
      </TableCell>
      <TableCell align="center">
        <Chip
          label={historyRecord.requestMethod}
          color={methodColor[historyRecord.requestMethod]}
          sx={{ lineHeight: 'normal' }}
        />
      </TableCell>
      <TableCell align="left" variant="body">
        {historyRecord.requestedUrl}
      </TableCell>
      <TableCell align="right">
        <IconButton
          aria-label="clip"
          size="medium"
          title={translateHistoryPage('buttons.copy')}
          onClick={() => {
            navigator.clipboard
              .writeText(historyRecord.requestedUrl)
              .then(() => {
                showSnackbar(
                  <Alert severity="success">
                    {translateHistoryPage('copyMessage')}
                  </Alert>
                );
              })
              .catch((err) => {
                showSnackbar(<Alert severity="error">{err?.message}</Alert>);
              });
          }}
        >
          <ContentCopyIcon fontSize="medium" />
        </IconButton>
      </TableCell>
      <TableCell align="right">
        <Link
          href={historyRecord.innerUrl}
          title={translateHistoryPage('buttons.reuse')}
        >
          <HistoryIcon
            fontSize="medium"
            sx={{
              boxSizing: 'border-box',
              width: 43,
              height: 43,
              padding: 1,
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: 'ButtonShadow',
              },
            }}
          />
        </Link>
      </TableCell>
      <TableCell align="center">
        <IconButton
          aria-label="delete"
          size="medium"
          title={translateHistoryPage('buttons.delete')}
          onClick={() => deleteRecord(historyRecord.requestDate)}
        >
          <DeleteForeverIcon fontSize="medium" color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
