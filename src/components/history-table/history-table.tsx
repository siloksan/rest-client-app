import { HistoryRecordType } from '@/types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { HistoryTableRow } from './history-table-row';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Button from '@mui/material/Button';
import { TablePagination, Typography } from '@mui/material';

interface HistoryTableProps {
  historyRecords: HistoryRecordType[];
  deleteRecord: (key: number) => void;
  deleteAllRecords: () => void;
}

type OrderType = 'asc' | 'desc';

function sorter(
  order: OrderType
): (a: HistoryRecordType, b: HistoryRecordType) => number {
  return order === 'asc'
    ? (a, b) => b.requestDate - a.requestDate
    : (a, b) => a.requestDate - b.requestDate;
}

interface HistoryTableHeadProps {
  onSortHandler: (event: React.MouseEvent<unknown>) => void;
  order: OrderType;
  deleteAllRecords: () => void;
}

function HistoryTableHead({
  order,
  onSortHandler,
  deleteAllRecords,
}: Readonly<HistoryTableHeadProps>) {
  const translateHistoryPage = useTranslations('HistoryPage');

  return (
    <TableHead>
      <TableRow
        sx={{
          '& > th': {
            backgroundColor: 'rgba(0, 10, 20, 0.1)',
          },
        }}
      >
        <TableCell
          align="center"
          sortDirection={order}
          sx={{ borderRadius: '4px 0 0 0' }}
        >
          <TableSortLabel
            active={true}
            direction={order}
            onClick={onSortHandler}
          >
            {translateHistoryPage('fields.time')}
          </TableSortLabel>
        </TableCell>
        <TableCell align="center">
          {translateHistoryPage('fields.method')}
        </TableCell>
        <TableCell align="center">
          {translateHistoryPage('fields.request')}
        </TableCell>
        <TableCell align="right" colSpan={3} sx={{ borderRadius: '0 4px 0 0' }}>
          <Button
            aria-label="clear"
            size="small"
            variant="contained"
            color="error"
            onClick={deleteAllRecords}
          >
            <DeleteSweepIcon fontSize="medium" />
            <Typography variant="button" sx={{ lineHeight: 'normal' }}>
              {translateHistoryPage('buttons.clear')}
            </Typography>
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function HistoryTable({
  historyRecords,
  deleteRecord,
  deleteAllRecords,
}: Readonly<HistoryTableProps>) {
  const [order, setOrder] = useState<OrderType>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const translateHistoryPage = useTranslations('HistoryPage');

  const handleSort = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - historyRecords.length)
      : 0;

  const visibleRows = useMemo(
    () =>
      [...historyRecords]
        .sort(sorter(order))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [historyRecords, order, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            stickyHeader
          >
            <HistoryTableHead
              order={order}
              onSortHandler={handleSort}
              deleteAllRecords={deleteAllRecords}
            />
            <TableBody>
              {visibleRows.map((row: HistoryRecordType) => {
                return (
                  <HistoryTableRow
                    key={row.requestDate}
                    historyRecord={row}
                    deleteRecord={deleteRecord}
                  />
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={historyRecords.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={translateHistoryPage('labelRowsPerPage')}
          sx={{
            backgroundColor: 'rgba(0, 10, 20, 0.1)',
          }}
        />
      </Paper>
    </Box>
  );
}
