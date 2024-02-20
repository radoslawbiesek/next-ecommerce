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
  redirects() {
    return [
      {
        source: "/products",
        destination: "/products/1",
        permanent: true,
      },
    ];
  },
};

export default withMdxRs()(nextConfig);
