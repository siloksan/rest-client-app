import { Box, Typography } from '@mui/material';
import { CodeEditor } from '../code-editor/code-editor';
import { useTranslations } from 'next-intl';

interface Props {
  status: number;
  value: string;
}

export function ResponseField({ status, value }: Props) {
  const translate = useTranslations('RestClient');
  return (
    <Box sx={{ mt: 'auto', pb: '1.5em' }}>
      <Typography align="center" variant="h5" mb={'.5em'}>
        {translate('response')}
      </Typography>
      <Typography component="span" mb={'.5em'}>
        {translate('status')}: {status}
      </Typography>
      <CodeEditor value={value} editable={false} />
    </Box>
  );
}
