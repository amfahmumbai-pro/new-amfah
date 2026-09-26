const nextConfig = {
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
import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());