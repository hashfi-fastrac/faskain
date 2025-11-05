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
    images: [""],
    thumbnail:
      "https://res.cloudinary.com/dikcmks1p/image/upload/v1762355552/thumbnailpolyester_jyoiwz.jpg",
    variants: {
      colors: [
        {
          name: "Maroon",
          code: "8012",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762314858/maroon_kmonfy.jpg",
          ],
        },
        {
          name: "Wood",
          code: "8013",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762314855/wood_wyie08.jpg",
          ],
        },
        {
          name: "Capucino",
          code: "8014",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762314854/capucino_bnfdgp.jpg",
          ],
        },
        {
          name: "Skin",
          code: "8015",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762314855/skin_syelok.jpg",
          ],
        },
        {
          name: "Coral",
          code: "8016",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762314855/coral_vnt6sk.jpg",
          ],
        },
        {
          name: "Milo",
          code: "8017",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762314856/milo_s1uryu.jpg",
          ],
        },
        {
          name: "Nude Peach",
          code: "8021",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762314856/nudepeach_n2vxaq.jpg",
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
    images: ["/products/cottonrayon/shimmer-hitam-9001-1.jpg"],
    thumbnail:
      "https://res.cloudinary.com/dikcmks1p/image/upload/v1762355531/thumbnailcottonrayon_ue7b71.jpg",
    variants: {
      colors: [
        {
          name: "Shimmer Hitam",
          code: "9001",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762315150/black_emffo5.jpg",
          ],
        },
        {
          name: "Shimmer HJ Mint",
          code: "9002",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762315152/hijaumint_af2paq.jpg",
          ],
        },
        {
          name: "Shimmer Off White",
          code: "9003",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762315151/offwhite_b2zfaa.jpg",
          ],
        },
        {
          name: "Shimmer Teracotta",
          code: "9004",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762315151/teracota_yt0c3q.jpg",
          ],
        },
        {
          name: "Shimmer Coffee",
          code: "9006",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762315152/coffe_sdw4wj.jpg",
          ],
        },
        {
          name: "Shimmer Abu Tua",
          code: "9007",
          images: [
            "https://res.cloudinary.com/dikcmks1p/image/upload/v1762315148/abutua_xidxzs.jpg",
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
