export enum Methods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATH = 'PATH',
}

export interface Variable {
  key: string;
  name: string;
  value: string;
  active: boolean;
}
