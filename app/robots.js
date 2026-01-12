export const revalidate = false;

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.ecusave.com/sitemap.xml',
  };
}
