export const revalidate = false;

export default function sitemap() {
  return [
    {
      url: 'https://ecusave.com/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
