import { locales } from '@/constants';
import { usePathname, useRouter } from '@/i18n/navigation';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = useLocale();
  const translate = useTranslations('LanguageSwitcher');

  const handleChange = (event: SelectChangeEvent) => {
    const newLocale = event.target.value;

    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: newLocale }
    );
  };
  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="language">{translate('label')}</InputLabel>
        <Select
          labelId="language"
          id="language-select"
          value={locale}
          label="Language"
          onChange={handleChange}
        >
          {locales.map((locale) => (
            <MenuItem value={locale} key={locale}>
              {locale}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
