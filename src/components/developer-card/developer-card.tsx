import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Author } from '@/constants/authors';
import { useTranslations } from 'next-intl';
import Link from '@mui/material/Link';

interface Props {
  author: Author;
}

export function DeveloperCard({ author }: Props) {
  const translate = useTranslations('Authors');

  return (
    <Card
      sx={{
        flex: '1 1px',
        minWidth: '250px',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 1,
      }}
    >
      <Link
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            scale: 1.05,
          },
          mb: 2,
        }}
        target="_blank"
        href={author.github}
      >
        <Badge
          sx={{ '& > span': { opacity: 0.5 } }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={<GitHubIcon fontSize="small" />}
          color="success"
        >
          <Avatar
            alt="Remy Sharp"
            src={author.avatar}
            sx={{ width: 56, height: 56, border: '#90caf9 1px solid' }}
          />
        </Badge>
      </Link>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign={'center'}
        >
          {translate(author.name)}
        </Typography>
        <Typography gutterBottom textAlign={'center'}>
          {translate(author.role)}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', textAlign: 'center' }}
        >
          {translate(author.description)}
        </Typography>
      </CardContent>
    </Card>
  );
}
