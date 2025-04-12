'use client';

import { ROUTES } from '@/constants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { RestCards } from '../rest-cards/rest-cards';
import { DeveloperCards } from '../developer-cards/developer-cards';

interface Props {
  username: string | null;
}

export function WelcomeSection({ username }: Props) {
  const translate = useTranslations('MainPage');

  const translateBtn = useTranslations('Buttons');

  return (
    <>
      {username ? (
        <Typography variant="h2" sx={{ textAlign: 'center', mt: 10 }}>
          {translate('welcome_user', { username })}
        </Typography>
      ) : (
        <Typography variant="h2" sx={{ textAlign: 'center', mt: 10 }}>
          {translate('welcome_message')}
        </Typography>
      )}
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 5 }}>
        {translate('about_app')}
      </Typography>
      {!username && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, gap: 2 }}>
          <Button variant="outlined">
            <Link
              href={ROUTES.SIGNIN}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {translateBtn('signin')}
            </Link>
          </Button>
          <Button variant="outlined">
            <Link
              href={ROUTES.SIGNUP}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {translateBtn('signup')}
            </Link>
          </Button>
        </Box>
      )}

      <RestCards />
      <DeveloperCards />
      <Typography>
        This text have only one purpose to check header! Do not forget to remove
        it after checking! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Alias ipsa iste nulla voluptate nisi. Veniam numquam nostrum
        dolore, aspernatur soluta officiis non ipsa? Modi cum provident soluta
        commodi deleniti neque? Nisi modi ut ipsam soluta consequuntur deleniti
        veritatis aliquid praesentium, placeat, dolorum asperiores delectus?
        Possimus saepe facere quod eos quaerat dolor minima est labore, eaque
        eius adipisci, quisquam laborum! Eius. Ratione eligendi culpa nesciunt,
        fugit alias non? Neque enim assumenda aspernatur optio, laboriosam a
        quos perspiciatis, soluta animi quam placeat cum consequatur reiciendis
        facilis repudiandae possimus eligendi et rem. Nisi. Nobis, aut facere.
        Exercitationem fugiat eveniet eos maiores? Quos cum illo placeat eum
        dolorum culpa non est fugiat hic, numquam recusandae commodi praesentium
        minima harum inventore eveniet perferendis? Magnam, sit? Ea alias
        suscipit magni? Aspernatur officiis, quos autem quisquam dolorem vel, ea
        dolorum dolor, nisi consequatur repellendus debitis. Autem ut, nam omnis
        eum voluptate possimus consectetur rerum qui sint labore! Numquam culpa
        laudantium voluptatum fugit quisquam consectetur aliquam modi quidem
        illo, explicabo recusandae. Veniam, perferendis qui? Voluptatibus
        accusantium velit eligendi assumenda, molestiae repellat veniam labore
        dolorem laboriosam placeat omnis cum?
      </Typography>
    </>
  );
}
