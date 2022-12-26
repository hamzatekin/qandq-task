export const SwaggerDocument = {
  api: 'api',
  title: 'Movify',
  description: 'The Movify API',
  version: '1.0',
  tags: [
    {
      name: 'movie',
      description: 'Movie related endpoints',
    },
  ],
} as const;

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
