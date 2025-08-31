export interface Language {
    code: string;
    name: string;
}

export type Translations = {
    [key: string]: string;
};

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  structuredData: object;
}