// src/data/products.ts
import type { Product } from "@/types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Multi kain mutilato 4 way spandex",
    description:
      "High-quality polyester fabric with 4-way stretch elasticity, perfect for various fashion and textile needs.",
    category: "kain-polos-polyester",
    price: 50000,
    discountPercentage: 10,
    rating: 4.8,
    stock: 100,
    tags: ["polyester", "spandex", "elastic"],
    brand: "HMW Textile",
    sku: "KPP-MULTI-4WAY",
    weight: 1,
    dimensions: {
      width: 150,
      height: 0.5,
      depth: 100,
    },
    warrantyInformation: "30 days fabric quality guarantee",
    shippingInformation: "Ships in 2-3 business days",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "30 days return",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      barcode: "8999123456789",
      qrCode: "https://example.com/qr/1",
    },
    images: [
      "/products/polyester/maroon-8012-1.jpg",
      "/products/polyester/maroon-8012-2.jpg",
      "/products/polyester/maroon-8012-3.jpg",
    ],
    thumbnail: "/products/polyester/maroon-8012-1.jpg",
    variants: {
      colors: [
        {
          name: "Maroon",
          code: "8012",
          images: [
            "/products/polyester/maroon-8012-1.jpg",
            "/products/polyester/maroon-8012-2.jpg",
            "/products/polyester/maroon-8012-3.jpg",
          ],
        },
        {
          name: "Wood",
          code: "8013",
          images: [
            "/products/polyester/wood-8013-1.jpg",
            "/products/polyester/wood-8013-2.jpg",
            "/products/polyester/wood-8013-3.jpg",
          ],
        },
        {
          name: "Capucino",
          code: "8014",
          images: [
            "/products/polyester/capucino-8014-1.jpg",
            "/products/polyester/capucino-8014-2.jpg",
            "/products/polyester/capucino-8014-3.jpg",
          ],
        },
        {
          name: "Skin",
          code: "8015",
          images: [
            "/products/polyester/skin-8015-1.jpg",
            "/products/polyester/skin-8015-2.jpg",
            "/products/polyester/skin-8015-3.jpg",
          ],
        },
        {
          name: "Coral",
          code: "8016",
          images: [
            "/products/polyester/coral-8016-1.jpg",
            "/products/polyester/coral-8016-2.jpg",
            "/products/polyester/coral-8016-3.jpg",
          ],
        },
        {
          name: "Milo",
          code: "8017",
          images: [
            "/products/polyester/milo-8017-1.jpg",
            "/products/polyester/milo-8017-2.jpg",
            "/products/polyester/milo-8017-3.jpg",
          ],
        },
        {
          name: "BW",
          code: "8018",
          images: [
            "/products/polyester/bw-8018-1.jpg",
            "/products/polyester/bw-8018-2.jpg",
            "/products/polyester/bw-8018-3.jpg",
          ],
        },
        {
          name: "Blue Denim",
          code: "8019",
          images: [
            "/products/polyester/blue-denim-8019-1.jpg",
            "/products/polyester/blue-denim-8019-2.jpg",
            "/products/polyester/blue-denim-8019-3.jpg",
          ],
        },
        {
          name: "Dusty Blue",
          code: "8020",
          images: [
            "/products/polyester/dusty-blue-8020-1.jpg",
            "/products/polyester/dusty-blue-8020-2.jpg",
            "/products/polyester/dusty-blue-8020-3.jpg",
          ],
        },
        {
          name: "Nude Peach",
          code: "8021",
          images: [
            "/products/polyester/nude-peach-8021-1.jpg",
            "/products/polyester/nude-peach-8021-2.jpg",
            "/products/polyester/nude-peach-8021-3.jpg",
          ],
        },
      ],
    },
  },
  {
    id: 2,
    title: "Multi kain cotton shimmer silk",
    description:
      "Cotton rayon fabric with elegant shimmer silk effect, provides luxurious look and comfortable wear.",
    category: "kain-polos-cottonrayon",
    price: 65000,
    discountPercentage: 15,
    rating: 4.9,
    stock: 80,
    tags: ["cotton", "rayon", "shimmer", "silk"],
    brand: "HMW Textile",
    sku: "KCR-SHIMMER-SILK",
    weight: 1,
    dimensions: {
      width: 150,
      height: 0.5,
      depth: 100,
    },
    warrantyInformation: "30 days fabric quality guarantee",
    shippingInformation: "Ships in 2-3 business days",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "30 days return",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      barcode: "8999123456790",
      qrCode: "https://example.com/qr/2",
    },
    images: [
      "/products/cottonrayon/shimmer-hitam-9001-1.jpg",
      "/products/cottonrayon/shimmer-hitam-9001-2.jpg",
      "/products/cottonrayon/shimmer-hitam-9001-3.jpg",
    ],
    thumbnail: "/products/cottonrayon/shimmer-hitam-9001-1.jpg",
    variants: {
      colors: [
        {
          name: "Shimmer Hitam",
          code: "9001",
          images: [
            "/products/cottonrayon/shimmer-hitam-9001-1.jpg",
            "/products/cottonrayon/shimmer-hitam-9001-2.jpg",
            "/products/cottonrayon/shimmer-hitam-9001-3.jpg",
          ],
        },
        {
          name: "Shimmer HJ Mint",
          code: "9002",
          images: [
            "/products/cottonrayon/shimmer-hj-mint-9002-1.jpg",
            "/products/cottonrayon/shimmer-hj-mint-9002-2.jpg",
            "/products/cottonrayon/shimmer-hj-mint-9002-3.jpg",
          ],
        },
        {
          name: "Shimmer Kubus",
          code: "9003",
          images: [
            "/products/cottonrayon/shimmer-kubus-9003-1.jpg",
            "/products/cottonrayon/shimmer-kubus-9003-2.jpg",
            "/products/cottonrayon/shimmer-kubus-9003-3.jpg",
          ],
        },
        {
          name: "Shimmer Teracotta",
          code: "9004",
          images: [
            "/products/cottonrayon/shimmer-teracotta-9004-1.jpg",
            "/products/cottonrayon/shimmer-teracotta-9004-2.jpg",
            "/products/cottonrayon/shimmer-teracotta-9004-3.jpg",
          ],
        },
        {
          name: "Shimmer Salem",
          code: "9005",
          images: [
            "/products/cottonrayon/shimmer-salem-9005-1.jpg",
            "/products/cottonrayon/shimmer-salem-9005-2.jpg",
            "/products/cottonrayon/shimmer-salem-9005-3.jpg",
          ],
        },
        {
          name: "Shimmer Coffee",
          code: "9006",
          images: [
            "/products/cottonrayon/shimmer-coffee-9006-1.jpg",
            "/products/cottonrayon/shimmer-coffee-9006-2.jpg",
            "/products/cottonrayon/shimmer-coffee-9006-3.jpg",
          ],
        },
        {
          name: "Shimmer Abu Tua",
          code: "9007",
          images: [
            "/products/cottonrayon/shimmer-abu-tua-9007-1.jpg",
            "/products/cottonrayon/shimmer-abu-tua-9007-2.jpg",
            "/products/cottonrayon/shimmer-abu-tua-9007-3.jpg",
          ],
        },
        {
          name: "Shimmer Navy",
          code: "9008",
          images: [
            "/products/cottonrayon/shimmer-navy-9008-1.jpg",
            "/products/cottonrayon/shimmer-navy-9008-2.jpg",
            "/products/cottonrayon/shimmer-navy-9008-3.jpg",
          ],
        },
        {
          name: "Shimmer HJ Lime",
          code: "9009",
          images: [
            "/products/cottonrayon/shimmer-hj-lime-9009-1.jpg",
            "/products/cottonrayon/shimmer-hj-lime-9009-2.jpg",
            "/products/cottonrayon/shimmer-hj-lime-9009-3.jpg",
          ],
        },
        {
          name: "Shimmer Silver",
          code: "9010",
          images: [
            "/products/cottonrayon/shimmer-silver-9010-1.jpg",
            "/products/cottonrayon/shimmer-silver-9010-2.jpg",
            "/products/cottonrayon/shimmer-silver-9010-3.jpg",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getAllProducts = (): Product[] => {
  return MOCK_PRODUCTS;
};

export const getProductById = (id: number): Product | undefined => {
  return MOCK_PRODUCTS.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return MOCK_PRODUCTS.filter((p) => p.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};
