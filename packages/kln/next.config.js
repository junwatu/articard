const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: "loose",
  },
  distDir: "build",
  exportPathMap: function () {
    return {
      "/": { page: "/" },
    };
  },
};

export default nextConfig;
