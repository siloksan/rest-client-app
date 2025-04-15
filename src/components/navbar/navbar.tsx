import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useTranslations } from 'next-intl';
import ApiIcon from '@mui/icons-material/Api';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import TuneIcon from '@mui/icons-material/Tune';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function NavBar() {
  const translate = useTranslations('RestCards');

  return (
    <Box>
      <Tooltip title={translate('client.title')}>
        <Button>
          <Link href={ROUTES.REST_CLIENT}>
            <Typography
              color="primary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <ApiIcon />
            </Typography>
          </Link>
        </Button>
      </Tooltip>
      <Tooltip title={translate('history.title')}>
        <Button>
          <Link
            href={ROUTES.HISTORY}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography
              color="primary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <HistoryEduIcon />
            </Typography>
          </Link>
        </Button>
      </Tooltip>
      <Tooltip title={translate('variable.title')}>
        <Button>
          <Link
            href={ROUTES.VARIABLE}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography
              color="primary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <TuneIcon />
            </Typography>
          </Link>
        </Button>
      </Tooltip>
    </Box>
  );
}
