const nextConfig = {
  publicRuntimeConfig: {
    AppName: "SANDBOX",
  },
  eslint: {
    dirs: ["."],
  },
  poweredByHeader: false,
  trailingSlash: true,
  transpilePackages: ["antd"],
  reactStrictMode: false,
};

module.exports = nextConfig;
