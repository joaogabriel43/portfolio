/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  // Projeto renomeado (finassistant → pondero): preserva links externos antigos.
  async redirects() {
    return [
      {
        source: "/projects/finassistant",
        destination: "/projects/pondero",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
