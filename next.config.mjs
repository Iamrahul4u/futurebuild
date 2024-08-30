/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    config.resolve.alias.canvas = false;
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
      {
        protocol: "https",
        hostname: "futurbuild-jobs-resume.s3.us-east-1.amazonaws.com",
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
    instrumentationHook: false,
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "@material-ui/icons",
      "date-fns",
      "@upstash/ratelimit",
      "@upstash/redis",
      "@vercel/kv",
      "@node-rs/argon2",
      "@node-rs/bcrypt",
      "@prisma/client",
      "@prisma/extension-accelerate",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-aspect-ratio",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-context-menu",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-hover-card",
      "@radix-ui/react-label",
      "@radix-ui/react-menubar",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-progress",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slider",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "@radix-ui/react-toolbar",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-tree",
      "@radix-ui/react-tree-view",
      "@radix-ui/react-toggle-group",
      "@radix-ui/react-toggle",
      "@vercel/otel",
      "@aws-sdk/client-s3",
      "@aws-sdk/s3-request-presigner",
      "@hookform/resolvers",
      "@lucia-auth/adapter-prisma",
      "@monaco-editor/react",
      "@next/bundle-analyzer",
      "zod-prisma-types",
      "zod",
      "vaul",
      "sonner",
      "react-resizable-panels",
    ],
  },
};
import withBundleAnalyzer from "@next/bundle-analyzer";

export default withBundleAnalyzer({
  enabled:
    process.env.ANALYZE === "true" && process.env.NODE_ENV === "production",
})(nextConfig);
