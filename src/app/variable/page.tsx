import { VariableEditor } from '@/components/variable-editor/variable-editor';
import { Container } from '@mui/material';

export default async function Variable() {
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
      <VariableEditor />
    </Container>
  );
}
