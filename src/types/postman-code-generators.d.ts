declare module 'postman-code-generators' {
  import { Request } from 'postman-collection';
  export interface CodegenOptions {
    indentCount?: number;
    indentType?: 'Space' | 'Tab';
    trimRequestBody?: boolean;
    followRedirect?: boolean;
  }

  export function convert(
    language: string,
    variant: string,
    request: Request,
    options: CodegenOptions,
    callback: (error: Error | null, snippet?: string) => void
  ): void;
}
