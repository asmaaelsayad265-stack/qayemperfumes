/*
  Run this in the browser console to capture the FIRST runtime mismatch
  between Laravel JSON responses and TS expectations.

  Usage:
    1) Open the page that hangs
    2) Paste the output of calling window.__auditFeaturedAndCategories()
*/

import apiClient from '@/services/api';

type AuditLog = {
  endpoint: string;
  axiosResponseShape: unknown;
  afterUnwrap: unknown;
  firstTypeDrift: string | null;
};

function safeKeys(x: unknown): string[] {
  if (!x || typeof x !== 'object') return [];
  try {
    return Object.keys(x as Record<string, unknown>);
  } catch {
    return [];
  }
}

function firstMismatch(expected: string[], actual: string[]): string | null {
  // very shallow heuristic: compare presence of known keys
  for (const k of expected) {
    if (!actual.includes(k)) return `missing key: ${k}`;
  }
  return null;
}

// Expected from Laravel resources (see backend/Http/Resources/*Resource.php)
const expectedCategoryKeys = [
  'id',
  'name_ar',
  'name_en',
  'slug',
  'description_ar',
  'description_en',
  'image',
  'sort_order',
  'is_active',
  'created_at',
  'updated_at',
];

const expectedProductKeys = [
  'id',
  'name_ar',
  'name_en',
  'slug',
  'description_ar',
  'description_en',
  'price',
  'original_price',
  'category_id',
  'status',
  'season',
  'gender',
  'is_featured',
  'is_best_seller',
  'is_limited_edition',
  'image',
  'created_at',
  'updated_at',
  // optional: category/images/notes/reviews/inventory
];

async function fetchAndAudit(endpoint: string) {
  const response = await apiClient.get(endpoint);
  return response.data;
}

async function auditFeaturedAndCategories(): Promise<AuditLog[]> {
  const { unwrapResource } = await import('@/services/api');

  const logs: AuditLog[] = [];

  const featured = await fetchAndAudit('/products/featured');
  const featuredAfter = unwrapResource(featured);
  const firstFeatured = Array.isArray(featuredAfter) ? featuredAfter[0] : null;
  const driftFeatured =
    firstFeatured && typeof firstFeatured === 'object'
      ? firstMismatch(expectedProductKeys, safeKeys(firstFeatured))
      : 'expected array of products, got non-array';

  logs.push({
    endpoint: '/api/v1/products/featured',
    axiosResponseShape: featured,
    afterUnwrap: featuredAfter,
    firstTypeDrift: driftFeatured,
  });

  const activeCategories = await fetchAndAudit('/categories/active');
  const categoriesAfter = unwrapResource(activeCategories);
  const firstCategory = Array.isArray(categoriesAfter) ? categoriesAfter[0] : null;
  const driftCategories =
    firstCategory && typeof firstCategory === 'object'
      ? firstMismatch(expectedCategoryKeys, safeKeys(firstCategory))
      : 'expected array of categories, got non-array';

  logs.push({
    endpoint: '/api/v1/categories/active',
    axiosResponseShape: activeCategories,
    afterUnwrap: categoriesAfter,
    firstTypeDrift: driftCategories,
  });

  return logs;
}

// Expose on window for quick manual runs.
if (typeof window !== 'undefined') {
  const win = window as Window & { __auditFeaturedAndCategories?: () => Promise<AuditLog[]> };
  win.__auditFeaturedAndCategories = async () => {
    const logs = await auditFeaturedAndCategories();
    console.log('[data-flow-audit] result', logs);
    return logs;
  };
}


