import { VariableEditor } from '@/components/variable-editor/variable-editor';
import { Container, Typography } from '@mui/material';

export default async function Page() {
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
        sx={{ mb: 5, textAlign: 'center', fontSize: 40 }}
      >
        Variables
      </Typography>
      <VariableEditor />
    </Container>
  );
}
