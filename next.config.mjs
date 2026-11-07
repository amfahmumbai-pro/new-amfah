const nextConfig = {
  output: "export",

  reactCompiler: true,

  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
