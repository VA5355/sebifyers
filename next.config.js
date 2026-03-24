/** @type {import('next').NextConfig} */
const nextConfig = {
    // 🔒 Prevent watching outside project
  experimental: {
    externalDir: false,
  },

  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        'C:/hiberfil.sys',
        'C:/pagefile.sys',
        'C:/swapfile.sys',
      ],
    };
    return config;
  },
    async rewrites() {
    return [
      { source: "/api/:path*", destination: "https://fyerssebi.netlify.app/:path*" },
    ]
  },
}

module.exports = nextConfig
