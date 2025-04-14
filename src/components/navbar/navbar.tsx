import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useTranslations } from 'next-intl';
import ApiIcon from '@mui/icons-material/Api';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import TuneIcon from '@mui/icons-material/Tune';
import Link from '@mui/material/Link';
import { ROUTES } from '@/constants';
import Button from '@mui/material/Button';

export function NavBar() {
  const translate = useTranslations('RestCards');

  return (
    <Box>
      <Tooltip title={translate('client.title')}>
        <Button>
          <Link
            href={ROUTES.REST_CLIENT}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ApiIcon />
          </Link>
        </Button>
      </Tooltip>
      <Tooltip title={translate('history.title')}>
        <Button>
          <Link
            href={ROUTES.HISTORY}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <HistoryEduIcon />
          </Link>
        </Button>
      </Tooltip>
      <Tooltip title={translate('variable.title')}>
        <Button>
          <Link
            href={ROUTES.VARIABLE}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <TuneIcon />
          </Link>
        </Button>
      </Tooltip>
    </Box>
  );
}
