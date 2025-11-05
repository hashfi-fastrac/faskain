// src/lib/api.ts
import type { Product, AuthResponse, LoginCredentials } from "@/types";
import { STORAGE_KEYS, TEST_USER } from "@/constants";
import {
  getAllProducts as getMockProducts,
  getProductById as getMockProductById,
  getProductsByCategory as getMockProductsByCategory,
  searchProducts as searchMockProducts,
} from "@/data/products";

// Simulate delay for realistic experience
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllCatalogProducts = async (): Promise<Product[]> => {
  await delay(500);
  return getMockProducts();
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  await delay(300);
  return getMockProductsByCategory(category);
};

export const getProductById = async (id: number): Promise<Product> => {
  await delay(300);
  const product = getMockProductById(id);
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  await delay(400);
  return searchMockProducts(query);
};

// Mock Authentication
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  await delay(800);

  // Validate with test user
  if (
    credentials.username === TEST_USER.username &&
    credentials.password === TEST_USER.password
  ) {
    const mockUser: AuthResponse = {
      id: 1,
      username: "emilys",
      email: "emily@example.com",
      firstName: "Emily",
      lastName: "Johnson",
      gender: "female",
      image: "https://dummyjson.com/icon/emilys/128",
      token: "mock-jwt-token-" + Date.now(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockUser.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
    }

    return mockUser;
  }

  throw new Error("Invalid credentials");
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  await delay(300);

  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (userStr) {
      return JSON.parse(userStr);
    }
  }

  throw new Error("Not authenticated");
};

export const logoutUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};
