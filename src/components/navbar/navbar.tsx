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
    <Box sx={{ display: 'flex' }}>
      <Tooltip title={translate('client.title')}>
        <Link href={ROUTES.REST_CLIENT}>
          <Button>
            <Typography
              color="primary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <ApiIcon />
            </Typography>
          </Button>
        </Link>
      </Tooltip>
      <Tooltip title={translate('history.title')}>
        <Link href={ROUTES.HISTORY}>
          <Button>
            <Typography
              color="primary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <HistoryEduIcon />
            </Typography>
          </Button>
        </Link>
      </Tooltip>
      <Tooltip title={translate('variable.title')}>
        <Link href={ROUTES.VARIABLE}>
          <Button>
            <Typography
              color="primary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <TuneIcon />
            </Typography>
          </Button>
        </Link>
      </Tooltip>
    </Box>
  );
}
