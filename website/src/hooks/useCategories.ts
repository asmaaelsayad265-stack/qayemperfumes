import { useCallback, useState, useEffect } from "react";
import { categoriesApi, Category } from "@/services/categories";
import { retryWithBackoff } from "@/utils/retry";

interface UseCategoriesOptions {
  includeInactive?: boolean;
}

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCategories(options: UseCategoriesOptions = {}): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await retryWithBackoff(() =>
        options.includeInactive ? categoriesApi.getAll() : categoriesApi.getActive()
      );
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحميل التصنيفات");
    } finally {
      setLoading(false);
    }
  }, [options.includeInactive]);

  useEffect(() => {
    let mounted = true;
    
    const loadCategories = async () => {
      if (!mounted) return;
      await fetchCategories();
    };
    
    loadCategories();
    
    return () => {
      mounted = false;
    };
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}

interface UseCategoryResult {
  category: Category | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCategory(slug: string): UseCategoryResult {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await retryWithBackoff(() => categoriesApi.getBySlug(slug));
      setCategory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحميل التصنيف");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    
    let mounted = true;
    
    const loadCategory = async () => {
      if (!mounted) return;
      await fetchCategory();
    };
    
    loadCategory();
    
    return () => {
      mounted = false;
    };
  }, [slug, fetchCategory]);

  return { category, loading, error, refetch: fetchCategory };
}

export function useCategoryById(id: number | null): UseCategoryResult {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    if (!id) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await retryWithBackoff(() => categoriesApi.getById(id));
      setCategory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تحميل التصنيف");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let mounted = true;

    const loadCategory = async () => {
      if (!mounted) {
        return;
      }

      await fetchCategory();
    };

    loadCategory();

    return () => {
      mounted = false;
    };
  }, [fetchCategory]);

  return { category, loading, error, refetch: fetchCategory };
}
