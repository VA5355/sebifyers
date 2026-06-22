/** @type {import('next').NextConfig} */
import   CopyPlugin from "copy-webpack-plugin";
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
        '**/screens/**',
        'C:/hiberfil.sys',
        'C:/pagefile.sys',
        'C:/swapfile.sys',
      ],
    },
     config.plugins.push(
      new CopyPlugin({
        patterns: [
        //  { from: 'src/assets/extra-files', to: 'static/extra-files' }, // Copies folder to .next/static/extra-files
          { from: 'public/SPY.csv', to: 'SPY.csv' },         // Copies file to root of .next output
        ],
      })
    );
    return config;
  },
    async rewrites() {
    return [
      { source: "/api/:path*", destination: "https://onedinaar.com/:path*" },
    ]
  },
}
export default nextConfig;
//module.exports = nextConfig
