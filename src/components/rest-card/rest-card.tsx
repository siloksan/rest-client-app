import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n/navigation';

interface Props {
  title: string;
  description: string;
  href: string;
}

export function RestCard({ title, description, href }: Readonly<Props>) {
  return (
    <Card
      sx={{
        flex: '1 1px',
        minWidth: '250px',
        maxWidth: '400px',
      }}
    >
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardActionArea
          sx={{
            height: '100%',
          }}
        >
          <CardContent sx={{ height: '100%', textAlign: 'center' }}>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
