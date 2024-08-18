/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "@material-ui/icons",
      "date-fns",
    ],
  },
};
import withBundleAnalyzer from "@next/bundle-analyzer";

export default withBundleAnalyzer({
  enabled:
    process.env.ANALYZE === "true" && process.env.NODE_ENV === "production",
})(nextConfig);
