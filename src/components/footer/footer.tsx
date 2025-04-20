import { AUTHORS } from '@/constants/authors';
import { Avatar, Badge, Box, Link, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Footer() {
  const translate = useTranslations('Authors');
  return (
    <Box
      component="footer"
      sx={{
        marginTop: 'auto',
        padding: '5px 26px',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: { xs: 'unset', sm: '50px' },
        background:
          'linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.05) 100%)',
        backdropFilter: 'blur(1px)',
      }}
    >
      <Box display={'flex'} alignItems={'center'} gap={2}>
        {AUTHORS.map((author, index) => (
          <Link
            sx={{
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                scale: 1.05,
              },
            }}
            key={author.name}
            target="_blank"
            href={author.github}
          >
            <Badge
              sx={{ '& > span': { opacity: 0.5 } }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              badgeContent={index == 0 ? 'lead' : 'dev'}
              color="success"
            >
              <Avatar
                alt={author.name}
                src={author.avatar}
                sx={{ width: 40, height: 40 }}
              />
            </Badge>
            <Typography variant="body1">{translate(author.name)}</Typography>
          </Link>
        ))}
      </Box>
      <Typography variant="h5">©2025</Typography>
      <Link
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            scale: 1.05,
          },
        }}
        href="https://rs.school/courses/reactjs"
      >
        <Image
          src="/rss-logo.svg"
          alt="rs-school"
          width={40}
          height={40}
          title="RS School"
        />
      </Link>
    </Box>
  );
}
