import { Box, Typography } from '@mui/material';
import { CodeEditor } from '../code-editor/code-editor';

interface Props {
  status: number;
  value: string;
}

export function ResponseField({ status, value }: Props) {
  return (
    <Box sx={{ mt: 'auto', pb: '1.5em' }}>
      <Typography align="center" variant="h5" mb={'.5em'}>
        Response
      </Typography>
      <Typography component="span" mb={'.5em'}>
        Status: {status}
      </Typography>
      <CodeEditor value={value} editable={false} />
    </Box>
  );
}
