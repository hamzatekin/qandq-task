interface CreatedBy {
  gravatar_hash: string;
  id: string;
  name: string;
  username: string;
}

interface MovieDbMoviesResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieDbMoviesResponse {
  average_rating: number;
  backdrop_path: string;
  comments: Record<string, any>;
  created_by: CreatedBy;
  description: string;
  id: number;
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  object_ids: Record<string, string>;
  page: number;
  poster_path: string;
  public: boolean;
  results: MovieDbMoviesResult[];
  revenue: number;
  runtime: number;
  sort_by: string;
  total_pages: number;
  total_results: number;
}
