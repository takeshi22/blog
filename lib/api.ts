export const getStrapiPath = (path: string) => {
  
  return `${process.env.STRAPI_API_URL || "http://localhost:1337"}${path}`;
}