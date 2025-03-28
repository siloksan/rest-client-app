import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LanguageSwitcher() {
  const [locale, setLocale] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentLocale = pathname.split('/')[1];
    setLocale(currentLocale || 'en');
  }, [pathname]);

  const handleChange = (event: SelectChangeEvent) => {
    const newLocale = event.target.value;
    setLocale(newLocale);

    const pathParts = pathname.split('/');
    pathParts[1] = newLocale;

    const newPathname = pathParts.join('/');

    router.push(newPathname);
  };
  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="language">Language</InputLabel>
        <Select
          labelId="language"
          id="language-select"
          value={locale}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value="en">en</MenuItem>
          <MenuItem value="ru">ru</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
