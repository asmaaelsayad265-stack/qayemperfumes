import { useCallback, useState, useEffect } from "react";
import { productsApi, Product } from "@/services/products";
import { retryWithBackoff } from "@/utils/retry";

interface UseProductsOptions {
  id?: number;
  featured?: boolean;
  bestSellers?: boolean;
  categoryId?: number;
  slug?: string;
  searchQuery?: string;
}

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let data: Product[];
      
      if (options.id) {
        const product = await retryWithBackoff(() => productsApi.getById(options.id!));
        data = [product];
      } else if (options.searchQuery) {
        data = await retryWithBackoff(() => productsApi.search(options.searchQuery!));
      } else if (options.slug) {
        const product = await retryWithBackoff(() => productsApi.getBySlug(options.slug!));
        data = [product];
      } else if (options.featured) {
        data = await retryWithBackoff(() => productsApi.getFeatured());
      } else if (options.bestSellers) {
        data = await retryWithBackoff(() => productsApi.getBestSellers());
      } else if (options.categoryId) {
        data = await retryWithBackoff(() => productsApi.getByCategory(options.categoryId!));
      } else {
        data = await retryWithBackoff(() => productsApi.getAll());
      }

      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحميل المنتجات");
    } finally {
      setLoading(false);
    }
  }, [options.id, options.searchQuery, options.slug, options.featured, options.bestSellers, options.categoryId]);

  useEffect(() => {
    let mounted = true;
    
    const loadProducts = async () => {
      if (!mounted) return;
      await fetchProducts();
    };
    
    loadProducts();
    
    return () => {
      mounted = false;
    };
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProduct(slug: string): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await retryWithBackoff(() => productsApi.getBySlug(slug));
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحميل المنتج");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    
    let mounted = true;
    
    const loadProduct = async () => {
      if (!mounted) return;
      await fetchProduct();
    };
    
    loadProduct();
    
    return () => {
      mounted = false;
    };
  }, [slug, fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
}

export function useProductById(id: number | null): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await retryWithBackoff(() => productsApi.getById(id));
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحميل المنتج");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let mounted = true;

    const loadProduct = async () => {
      if (!mounted) {
        return;
      }

      await fetchProduct();
    };

    loadProduct();

    return () => {
      mounted = false;
    };
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
}
