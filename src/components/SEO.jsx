import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// اضافه شدن پراپ schemaMarkup
export default function SEO({ title, description, image, lang, schemaMarkup }) {
  const location = useLocation();
  const currentUrl = `https://rojdagroup.com${location.pathname}`;
  const defaultImage = "/RojdaLogistic (4).png"; 
  const metaImage = image || defaultImage;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />

      {/* 🚀 جادوی سئو: تزریق کدهای ساختاریافته برای هوش مصنوعی گوگل */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
}