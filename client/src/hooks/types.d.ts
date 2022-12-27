interface MutationConfig {
  useSuccessMessage?: boolean | null;
  useErrorMessage?: boolean | null;
  successMessage?: string | null;
  errorMessage?: string | null;
}

interface Movie {
  id: string;
  title: string;
  description: string;
  year: number | null;
  rating: number | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface RecommendMoviePayload {
  imdbId: string;
  to: string;
}
