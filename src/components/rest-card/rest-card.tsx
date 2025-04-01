import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n/navigation';

interface Props {
  title: string;
  description: string;
  selectedCard: number;
  index: number;
  href: string;
  setSelectedCard: (index: number) => void;
}

export function RestCard({
  title,
  selectedCard,
  description,
  setSelectedCard,
  index,
  href,
}: Readonly<Props>) {
  return (
    <Card>
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardActionArea
          onClick={() => setSelectedCard(index)}
          data-active={selectedCard === index ? '' : undefined}
          sx={{
            height: '100%',
            '&[data-active]': {
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: 'action.selectedHover',
              },
            },
          }}
        >
          <CardContent sx={{ height: '100%' }}>
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
