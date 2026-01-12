/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.js': ['.js', '.jsx', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.js'],
    };
    return config;
  },
};

export default nextConfig;
