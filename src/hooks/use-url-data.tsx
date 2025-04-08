import { Field, initialField } from '@/components/fields/fields';
import { base64ToBytes } from '@/utils/converterBase64';
import { useSearchParams, useParams } from 'next/navigation';

export default function useUrlData() {
  const { slug } = useParams<{ slug: string[] }>();
  const [method, url, body] = slug ?? [];
  const decodeUrl = decodeURIComponent(url);
  const decodeBody = decodeURIComponent(body);
  const searchParams = useSearchParams();
  const headers = Array.from(searchParams.entries()).map(
    ([key, value], index): Field => ({
      id: index,
      isActive: true,
      fieldKey: key,
      value: decodeURIComponent(value),
    })
  );

  return {
    method: method,
    url: new TextDecoder().decode(base64ToBytes(decodeUrl)) || '',
    body: new TextDecoder().decode(base64ToBytes(decodeBody)) || '',
    headers: headers.length === 0 ? [initialField] : headers,
  };
}
