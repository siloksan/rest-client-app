import { BODY_TYPES } from '@/constants';

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export interface Variable {
  key: string;
  name: string;
  value: string;
}

export type HistoryRecordType = {
  user: string;
  requestDate: number;
  requestMethod: string;
  requestedUrl: string;
  innerUrl: string;
};

export type BodyTypeNamesType = (typeof BODY_TYPES)[number]['name'];
