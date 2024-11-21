module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui', 'database'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
    unoptimized: true,
  },
};
