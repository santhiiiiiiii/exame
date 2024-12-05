/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['deckofcardsapi.com'], // Permite imagens do domínio deckofcardsapi.com
  },
};

module.exports = nextConfig;
