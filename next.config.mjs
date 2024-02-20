import withMdxRs from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    // typedRoutes: true,
    mdxRs: true,
  },
  redirects() {
    return [
      {
        source: "/products",
        destination: "/products/1",
        permanent: false,
      },
      {
        source: "/collections/:slug",
        destination: "/collections/:slug/1",
        permanent: false,
      },
      {
        source: "/categories/:slug",
        destination: "/categories/:slug/1",
        permanent: false,
      },
    ];
  },
};

export default withMdxRs()(nextConfig);
