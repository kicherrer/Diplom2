/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        bufferutil: false,
        'utf-8-validate': false,
        'supports-color': false,
      };
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      'punycode': false,
    };
    config.externals = [...(config.externals || []), 'bufferutil', 'utf-8-validate'];
    return config;
  },
};

module.exports = nextConfig;
