import { VariableEditor } from '@/components/variable-editor/variable-editor';
import { Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function VariablePage() {
  const translate = useTranslations('VariablesPage');

  return (
    <Container
      maxWidth="sm"
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
        {translate('title')}
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 2, textAlign: 'center', fontSize: 20 }}
      >
        {translate('description')}
      </Typography>
      <VariableEditor />
    </Container>
  );
}
