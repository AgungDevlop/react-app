import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
}

export const SEO = ({ title, description, url }: SEOProps) => {
  return (
    <Helmet>
      <title>{title} | AgungDev</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} | AgungDev`} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | AgungDev`} />
      <meta name="twitter:description" content={description} />
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
};