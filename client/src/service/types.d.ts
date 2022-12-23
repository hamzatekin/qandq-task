interface OmdbResponse {
  Response: 'True' | 'False';
  Error?: string;
  totalResults?: number;
}

interface OmdbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface OmdbSearchResponse extends OmdbResponse {
  Search: OmdbMovie[];
}
