import { ImageResponse } from "next/og";

import { type ProductPageProps } from "@/app/product/[slug]/page";
import * as productsService from "@/services/products";

export const runtime = "edge";

export const alt = "next13 masters sklep";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function ProductOgImage({ params: { slug } }: ProductPageProps) {
  const product = await productsService.getBySlug(slug);
  const imageUrl = product?.images?.[0]?.url;
  const name = product?.name || "";

  return new ImageResponse(
    (
      <figure
        style={{
          position: "relative",
        }}
      >
        <img src={imageUrl} alt={name} width={size.width} height={size.height} style={{ objectFit: "contain" }} />
        <figcaption
          style={{
            fontSize: 50,
            position: "absolute",
            left: "50%",
            bottom: "10%",
            transform: "translate(-50%, 0)",
            backgroundColor: "white",
          }}
        >
          {name}
        </figcaption>
      </figure>
    ),
    {
      ...size,
    },
  );
}
