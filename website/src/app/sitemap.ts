import type { MetadataRoute } from "next";

interface ProductSitemapItem {
  slug: string;
  updated_at?: string;
}

interface CategorySitemapItem {
  slug: string;
  updated_at?: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qayemperfumes.vercel.app";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function normalizeResource<T>(payload: T[] | { data?: T[] }): T[] {
  return Array.isArray(payload) ? payload : payload.data ?? [];
}

async function fetchSitemapItems<T>(path: string): Promise<T[]> {
  if (!apiUrl?.startsWith("http")) {
    return [];
  }

  try {
    const response = await fetch(`${apiUrl}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    return normalizeResource<T>(await response.json());
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    fetchSitemapItems<ProductSitemapItem>("/products"),
    fetchSitemapItems<CategorySitemapItem>("/categories/active"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/perfumes/men",
    "/perfumes/women",
    "/perfumes/best-sellers",
    "/offers",
    "/perfumes/special-editions",
    "/perfumes/summer",
    "/perfumes/winter",
    "/about",
    "/contact",
    "/reviews",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/categories/${category.slug}`,
    lastModified: category.updated_at ? new Date(category.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
