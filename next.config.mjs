import withMdxRs from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    typedRoutes: true,
    mdxRs: true,
  },
};

export default withMdxRs()(nextConfig);
