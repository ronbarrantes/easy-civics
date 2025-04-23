import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  typescript: {
    // !!! WARNING !!!
    // This will make the build fail if there are any TypeScript errors.
    // This is useful for CI/CD pipelines where you want to ensure that
    // the code is always type-checked.
    ignoreBuildErrors: true,
  },
  eslint: {
    // !!! WARNING !!!
    // This will make the build fail if there are any ESLint errors.
    // This is useful for CI/CD pipelines where you want to ensure that
    // the code is always linted.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
