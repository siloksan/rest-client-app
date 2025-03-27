'use client';

import { ROUTES } from '@/constants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

interface Props {
  username: string | null;
}

export function WelcomeSection({ username }: Props) {
  return (
    <>
      {username ? (
        <Typography variant="h2" sx={{ textAlign: 'center', mt: 10 }}>
          Welcome Back {username}!
        </Typography>
      ) : (
        <Typography variant="h2" sx={{ textAlign: 'center', mt: 10 }}>
          Welcome!
        </Typography>
      )}
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 5 }}>
        REST Client is a lightweight API testing tool designed to simplify
        working with RESTful services. Whether you are debugging an API, testing
        endpoints, or managing request history, REST Client provides an
        intuitive and efficient experience. With built-in authentication,
        request history tracking, and support for various HTTP methods, you can
        seamlessly interact with any API. Start exploring now—sign in to begin
        your API journey!
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
              Sign in
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
              Sign up
            </Link>
          </Button>
        </Box>
      )}
      <Button sx={{ mt: 5 }}>
        <Link
          href={ROUTES.REST_CLIENT}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Rest client(protected route only for authorized users)
        </Link>
      </Button>
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
