export interface Country {
  cca2: string;
  currencies: any[] | { [key: string]: Currency };
  languages: { [key: string]: string };
}

export interface Currency {
  name: string;
  symbol: string;
}
