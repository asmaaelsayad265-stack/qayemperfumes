// Mock data for the luxury admin dashboard
// Static data only — no API, no DB, no CRUD

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: "active" | "draft" | "archived";
  image: string;
  description: string;
  notes: string[];
  createdAt: string;
  salesCount: number;
  revenue: number;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  image: string;
  createdAt: string;
  isActive: boolean;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "new" | "preparing" | "shipped" | "completed" | "canceled";
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "failed";
  shippingAddress: string;
  createdAt: string;
  notes?: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinedAt: string;
  lastOrderAt: string;
  isVIP: boolean;
}

export interface AdminInventoryItem {
  id: string;
  productName: string;
  variant: string;
  quantityOnHand: number;
  reserved: number;
  available: number;
  reorderPoint: number;
  location: string;
}

export interface AnalyticsData {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  monthlyRevenue: { month: string; revenue: number }[];
  ordersByStatus: { status: string; count: number }[];
  topSellingProducts: { name: string; sales: number; revenue: number }[];
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
}

export const mockProducts: AdminProduct[] = [
  {
    id: "PRD-001",
    name: "عطر الملوك الأسود",
    slug: "black-royal",
    category: "رجالي",
    price: 850,
    originalPrice: 990,
    stock: 45,
    status: "active",
    image: "/perfumes/black-royal.jpg",
    description: "عطر فاخر يجمع بين العود الأسود والزعفران والمسك، مستوحى من فخامة الملوك.",
    notes: ["عود أسود", "زعفران", "مسك", "خشب الصندل"],
    createdAt: "2026-01-15",
    salesCount: 234,
    revenue: 198900,
  },
  {
    id: "PRD-002",
    name: "ذهب الصحراء",
    slug: "desert-gold",
    category: "نسائي",
    price: 720,
    stock: 38,
    status: "active",
    image: "/perfumes/desert-gold.jpg",
    description: "عطر شرقي دافئ بمزيج من العنبر والفانيليا والتوابل الذهبية.",
    notes: ["عنبر", "فانيليا", "قرفة", "زهور برتقال"],
    createdAt: "2026-02-10",
    salesCount: 189,
    revenue: 136080,
  },
  {
    id: "PRD-003",
    name: "ليالي العود",
    slug: "oud-nights",
    category: "رجالي",
    price: 1200,
    stock: 12,
    status: "active",
    image: "/perfumes/oud-nights.jpg",
    description: "عطر العود الممتاز مع لمسات من الورد البلغاري والجلد الفاخر.",
    notes: ["عود ممتاز", "ورد بلغاري", "جلد", "بتشولي"],
    createdAt: "2026-01-20",
    salesCount: 156,
    revenue: 187200,
  },
  {
    id: "PRD-004",
    name: "وردة القصر",
    slug: "palace-rose",
    category: "نسائي",
    price: 950,
    stock: 25,
    status: "active",
    image: "/perfumes/palace-rose.jpg",
    description: "عطر الورد الفاخر مع مسك الغزال والعنبر النادر.",
    notes: ["ورد تركي", "مسك غزال", "عنبر", "ياسمين"],
    createdAt: "2026-03-05",
    salesCount: 198,
    revenue: 188100,
  },
  {
    id: "PRD-005",
    name: "خشب العاج",
    slug: "ivory-wood",
    category: "رجالي",
    price: 680,
    originalPrice: 780,
    stock: 60,
    status: "active",
    image: "/perfumes/ivory-wood.jpg",
    description: "عطر خشبي منعش بمزيج فريد من خشب الأرز والحمضيات.",
    notes: ["أرز", "برغموت", "جريب فروت", "مسك"],
    createdAt: "2026-02-01",
    salesCount: 312,
    revenue: 212160,
  },
  {
    id: "PRD-006",
    name: "عنبر الأصيل",
    slug: "pure-amber",
    category: "يونيسكس",
    price: 1100,
    stock: 8,
    status: "active",
    image: "/perfumes/pure-amber.jpg",
    description: "عطر العنبر النقي مع لمسات من اللبان والمر.",
    notes: ["عنبر", "لبان", "مر", "صمغ عربي"],
    createdAt: "2026-01-10",
    salesCount: 89,
    revenue: 97900,
  },
  {
    id: "PRD-007",
    name: "ياسمين الشرق",
    slug: "eastern-jasmine",
    category: "نسائي",
    price: 580,
    stock: 42,
    status: "active",
    image: "/perfumes/eastern-jasmine.jpg",
    description: "عطر الياسمين الشرق بلمسة من العود الخفيف والمسك.",
    notes: ["ياسمين", "عود", "مسك", "خوخ"],
    createdAt: "2026-02-20",
    salesCount: 267,
    revenue: 154860,
  },
  {
    id: "PRD-008",
    name: "سلطان العود",
    slug: "sultan-oud",
    category: "رجالي",
    price: 1500,
    stock: 5,
    status: "active",
    image: "/perfumes/sultan-oud.jpg",
    description: "أفخم عطر في المجموعة - عود كمبودي نادر مع زعفران قندهار.",
    notes: ["عود كمبودي", "زعفران", "جلد نادر", "عنبر"],
    createdAt: "2026-01-05",
    salesCount: 67,
    revenue: 100500,
  },
  {
    id: "PRD-009",
    name: "غيمة مسك",
    slug: "musk-cloud",
    category: "نسائي",
    price: 450,
    stock: 78,
    status: "draft",
    image: "/perfumes/musk-cloud.jpg",
    description: "عطر المسك الأبيض الناعم مع لمحات من الزهور البيضاء.",
    notes: ["مسك أبيض", "فريزيا", "زنبق", "فانيليا"],
    createdAt: "2026-04-01",
    salesCount: 0,
    revenue: 0,
  },
  {
    id: "PRD-010",
    name: "صيف الذهب",
    slug: "golden-summer",
    category: "يونيسكس",
    price: 390,
    stock: 120,
    status: "draft",
    image: "/perfumes/golden-summer.jpg",
    description: "عطر صيفي منعش برائحة الحمضيات والعنبر الخفيف.",
    notes: ["ليمون", "نعناع", "عنبر", "أزهار"],
    createdAt: "2026-04-10",
    salesCount: 0,
    revenue: 0,
  },
  {
    id: "PRD-011",
    name: "بخور ملكي",
    slug: "royal-incense",
    category: "رجالي",
    price: 1300,
    originalPrice: 1600,
    stock: 3,
    status: "active",
    image: "/perfumes/royal-incense.jpg",
    description: "عطر البخور الملكي الفاخر بمزيج من اللبان العماني والعود.",
    notes: ["لبان عماني", "عود", "صندل", "مر"],
    createdAt: "2026-02-15",
    salesCount: 45,
    revenue: 58500,
  },
  {
    id: "PRD-012",
    name: "زهرة النخيل",
    slug: "palm-flower",
    category: "نسائي",
    price: 520,
    stock: 55,
    status: "archived",
    image: "/perfumes/palm-flower.jpg",
    description: "عطر زهري استوائي مستوحى من واحات النخيل العربية.",
    notes: ["زهور استوائية", "جوز هند", "مسك", "عنبر"],
    createdAt: "2025-11-01",
    salesCount: 423,
    revenue: 219960,
  },
];

export const mockCategories: AdminCategory[] = [
  {
    id: "CAT-001",
    name: "رجالي",
    slug: "men",
    description: "مجموعة العطور الرجالية الفاخرة",
    productCount: 5,
    image: "/categories/men.jpg",
    createdAt: "2026-01-01",
    isActive: true,
  },
  {
    id: "CAT-002",
    name: "نسائي",
    slug: "women",
    description: "مجموعة العطور النسائية الراقية",
    productCount: 5,
    image: "/categories/women.jpg",
    createdAt: "2026-01-01",
    isActive: true,
  },
  {
    id: "CAT-003",
    name: "يونيسكس",
    slug: "unisex",
    description: "عطور تناسب الجنسين بتوازن فريد",
    productCount: 2,
    image: "/categories/unisex.jpg",
    createdAt: "2026-01-15",
    isActive: true,
  },
  {
    id: "CAT-004",
    name: "هدايا",
    slug: "gifts",
    description: "مجموعات هدايا فاخرة ومناسبة للمناسبات",
    productCount: 0,
    image: "/categories/gifts.jpg",
    createdAt: "2026-03-01",
    isActive: true,
  },
  {
    id: "CAT-005",
    name: "عطور محدودة",
    slug: "limited-edition",
    description: "إصدارات محدودة ونادرة",
    productCount: 0,
    image: "/categories/limited.jpg",
    createdAt: "2026-02-01",
    isActive: false,
  },
];

export const mockOrders: AdminOrder[] = [
  {
    id: "ORD-001",
    customerName: "أحمد السعيد",
    customerEmail: "ahmed@example.com",
    customerPhone: "+966 55 123 4567",
    items: [
      { product: "عطر الملوك الأسود", quantity: 1, price: 850 },
      { product: "ذهب الصحراء", quantity: 2, price: 720 },
    ],
    total: 2290,
    status: "completed",
    paymentMethod: "بطاقة ائتمان",
    paymentStatus: "paid",
    shippingAddress: "الرياض، حي النخيل، شارع العليا",
    createdAt: "2026-06-28",
  },
  {
    id: "ORD-002",
    customerName: "سارة عبدالله",
    customerEmail: "sara@example.com",
    customerPhone: "+966 50 987 6543",
    items: [{ product: "وردة القصر", quantity: 1, price: 950 }],
    total: 950,
    status: "shipped",
    paymentMethod: "تحويل بنكي",
    paymentStatus: "paid",
    shippingAddress: "جدة، حي الشاطئ، شارع فلسطين",
    createdAt: "2026-06-30",
  },
  {
    id: "ORD-003",
    customerName: "محمد الفهد",
    customerEmail: "mohammed@example.com",
    customerPhone: "+966 54 456 7890",
    items: [
      { product: "سلطان العود", quantity: 1, price: 1500 },
      { product: "بخور ملكي", quantity: 1, price: 1300 },
      { product: "عنبر الأصيل", quantity: 1, price: 1100 },
    ],
    total: 3900,
    status: "preparing",
    paymentMethod: "بطاقة ائتمان",
    paymentStatus: "paid",
    shippingAddress: "الدمام، حي المزروعية، شارع 23",
    createdAt: "2026-07-01",
  },
  {
    id: "ORD-004",
    customerName: "نورة الشمري",
    customerEmail: "noura@example.com",
    customerPhone: "+966 56 789 0123",
    items: [
      { product: "ياسمين الشرق", quantity: 2, price: 580 },
      { product: "غيمة مسك", quantity: 1, price: 450 },
    ],
    total: 1610,
    status: "new",
    paymentMethod: "أبل باي",
    paymentStatus: "paid",
    shippingAddress: "الخبر، حي العقربية، شارع الملك سعود",
    createdAt: "2026-07-03",
  },
  {
    id: "ORD-005",
    customerName: "فيصل المالكي",
    customerEmail: "faisal@example.com",
    customerPhone: "+966 53 321 6547",
    items: [{ product: "عود أسود", quantity: 1, price: 1200 }],
    total: 1200,
    status: "canceled",
    paymentMethod: "مدى",
    paymentStatus: "failed",
    shippingAddress: "مكة، حي العزيزية، شارع الحج",
    createdAt: "2026-06-25",
  },
  {
    id: "ORD-006",
    customerName: "هند القحطاني",
    customerEmail: "hnd@example.com",
    customerPhone: "+966 55 555 5555",
    items: [
      { product: "ذهب الصحراء", quantity: 1, price: 720 },
      { product: "عنبر الأصيل", quantity: 1, price: 1100 },
    ],
    total: 1820,
    status: "new",
    paymentMethod: "بطاقة ائتمان",
    paymentStatus: "pending",
    shippingAddress: "أبها، حي الضباب، شارع 18",
    createdAt: "2026-07-04",
  },
  {
    id: "ORD-007",
    customerName: "خالد الزهراني",
    customerEmail: "khalid@example.com",
    customerPhone: "+966 59 444 3333",
    items: [
      { product: "خشب العاج", quantity: 3, price: 680 },
      { product: "عطر الملوك الأسود", quantity: 1, price: 850 },
    ],
    total: 2890,
    status: "preparing",
    paymentMethod: "تحويل بنكي",
    paymentStatus: "paid",
    shippingAddress: "الطائف، حي الشهداء، شارع الجيش",
    createdAt: "2026-07-02",
  },
  {
    id: "ORD-008",
    customerName: "رنا الحربي",
    customerEmail: "rana@example.com",
    customerPhone: "+966 57 222 1111",
    items: [{ product: "وردة القصر", quantity: 2, price: 950 }],
    total: 1900,
    status: "completed",
    paymentMethod: "أبل باي",
    paymentStatus: "paid",
    shippingAddress: "المدينة، حي العوالي، شارع أحد",
    createdAt: "2026-06-20",
  },
];

export const mockCustomers: AdminCustomer[] = [
  {
    id: "CUS-001",
    name: "أحمد السعيد",
    email: "ahmed@example.com",
    phone: "+966 55 123 4567",
    ordersCount: 12,
    totalSpent: 28450,
    joinedAt: "2025-09-15",
    lastOrderAt: "2026-06-28",
    isVIP: true,
  },
  {
    id: "CUS-002",
    name: "سارة عبدالله",
    email: "sara@example.com",
    phone: "+966 50 987 6543",
    ordersCount: 8,
    totalSpent: 15680,
    joinedAt: "2025-11-20",
    lastOrderAt: "2026-06-30",
    isVIP: true,
  },
  {
    id: "CUS-003",
    name: "محمد الفهد",
    email: "mohammed@example.com",
    phone: "+966 54 456 7890",
    ordersCount: 5,
    totalSpent: 23400,
    joinedAt: "2026-01-10",
    lastOrderAt: "2026-07-01",
    isVIP: true,
  },
  {
    id: "CUS-004",
    name: "نورة الشمري",
    email: "noura@example.com",
    phone: "+966 56 789 0123",
    ordersCount: 3,
    totalSpent: 4820,
    joinedAt: "2026-03-05",
    lastOrderAt: "2026-07-03",
    isVIP: false,
  },
  {
    id: "CUS-005",
    name: "فيصل المالكي",
    email: "faisal@example.com",
    phone: "+966 53 321 6547",
    ordersCount: 2,
    totalSpent: 2400,
    joinedAt: "2026-04-12",
    lastOrderAt: "2026-06-25",
    isVIP: false,
  },
  {
    id: "CUS-006",
    name: "هند القحطاني",
    email: "hnd@example.com",
    phone: "+966 55 555 5555",
    ordersCount: 7,
    totalSpent: 10890,
    joinedAt: "2025-12-01",
    lastOrderAt: "2026-07-04",
    isVIP: true,
  },
  {
    id: "CUS-007",
    name: "خالد الزهراني",
    email: "khalid@example.com",
    phone: "+966 59 444 3333",
    ordersCount: 4,
    totalSpent: 12350,
    joinedAt: "2026-02-18",
    lastOrderAt: "2026-07-02",
    isVIP: false,
  },
  {
    id: "CUS-008",
    name: "رنا الحربي",
    email: "rana@example.com",
    phone: "+966 57 222 1111",
    ordersCount: 6,
    totalSpent: 9210,
    joinedAt: "2025-10-25",
    lastOrderAt: "2026-06-20",
    isVIP: false,
  },
  {
    id: "CUS-009",
    name: "ماجد الدوسري",
    email: "majed@example.com",
    phone: "+966 58 777 8888",
    ordersCount: 1,
    totalSpent: 390,
    joinedAt: "2026-06-15",
    lastOrderAt: "2026-06-15",
    isVIP: false,
  },
  {
    id: "CUS-010",
    name: "ليلى العتيبي",
    email: "laila@example.com",
    phone: "+966 54 999 0000",
    ordersCount: 15,
    totalSpent: 32100,
    joinedAt: "2025-08-01",
    lastOrderAt: "2026-06-22",
    isVIP: true,
  },
];

export const mockInventory: AdminInventoryItem[] = [
  {
    id: "INV-001",
    productName: "عطر الملوك الأسود",
    variant: "50ml",
    quantityOnHand: 45,
    reserved: 3,
    available: 42,
    reorderPoint: 10,
    location: "مستودع أ - رف 1",
  },
  {
    id: "INV-002",
    productName: "عطر الملوك الأسود",
    variant: "100ml",
    quantityOnHand: 20,
    reserved: 5,
    available: 15,
    reorderPoint: 5,
    location: "مستودع أ - رف 1",
  },
  {
    id: "INV-003",
    productName: "ذهب الصحراء",
    variant: "50ml",
    quantityOnHand: 38,
    reserved: 4,
    available: 34,
    reorderPoint: 10,
    location: "مستودع أ - رف 2",
  },
  {
    id: "INV-004",
    productName: "ذهب الصحراء",
    variant: "100ml",
    quantityOnHand: 15,
    reserved: 2,
    available: 13,
    reorderPoint: 5,
    location: "مستودع أ - رف 2",
  },
  {
    id: "INV-005",
    productName: "ليالي العود",
    variant: "50ml",
    quantityOnHand: 12,
    reserved: 1,
    available: 11,
    reorderPoint: 5,
    location: "مستودع أ - رف 3",
  },
  {
    id: "INV-006",
    productName: "ليالي العود",
    variant: "100ml",
    quantityOnHand: 5,
    reserved: 2,
    available: 3,
    reorderPoint: 3,
    location: "مستودع أ - رف 3",
  },
  {
    id: "INV-007",
    productName: "وردة القصر",
    variant: "50ml",
    quantityOnHand: 25,
    reserved: 3,
    available: 22,
    reorderPoint: 8,
    location: "مستودع ب - رف 1",
  },
  {
    id: "INV-008",
    productName: "سلطان العود",
    variant: "50ml",
    quantityOnHand: 5,
    reserved: 1,
    available: 4,
    reorderPoint: 3,
    location: "مستودع أ - رف 1 (مقفل)",
  },
  {
    id: "INV-009",
    productName: "خشب العاج",
    variant: "100ml",
    quantityOnHand: 60,
    reserved: 8,
    available: 52,
    reorderPoint: 15,
    location: "مستودع ب - رف 2",
  },
  {
    id: "INV-010",
    productName: "عنبر الأصيل",
    variant: "30ml",
    quantityOnHand: 8,
    reserved: 2,
    available: 6,
    reorderPoint: 5,
    location: "مستودع أ - رف 4",
  },
  {
    id: "INV-011",
    productName: "بخور ملكي",
    variant: "50ml",
    quantityOnHand: 3,
    reserved: 1,
    available: 2,
    reorderPoint: 5,
    location: "مستودع أ - رف 4",
  },
  {
    id: "INV-012",
    productName: "ياسمين الشرق",
    variant: "50ml",
    quantityOnHand: 42,
    reserved: 5,
    available: 37,
    reorderPoint: 10,
    location: "مستودع ب - رف 1",
  },
];

export const mockAnalytics: AnalyticsData = {
  totalProducts: 12,
  totalCategories: 5,
  totalOrders: 8,
  totalCustomers: 10,
  totalRevenue: 17460,
  revenueChange: 12.5,
  ordersChange: 8.3,
  customersChange: 15.2,
  monthlyRevenue: [
    { month: "يناير", revenue: 8500 },
    { month: "فبراير", revenue: 9200 },
    { month: "مارس", revenue: 11200 },
    { month: "أبريل", revenue: 9800 },
    { month: "مايو", revenue: 12400 },
    { month: "يونيو", revenue: 15800 },
  ],
  ordersByStatus: [
    { status: "new", count: 2 },
    { status: "preparing", count: 2 },
    { status: "shipped", count: 1 },
    { status: "completed", count: 2 },
    { status: "canceled", count: 1 },
  ],
  topSellingProducts: [
    { name: "خشب العاج", sales: 312, revenue: 212160 },
    { name: "ياسمين الشرق", sales: 267, revenue: 154860 },
    { name: "عطر الملوك الأسود", sales: 234, revenue: 198900 },
    { name: "وردة القصر", sales: 198, revenue: 188100 },
    { name: "ذهب الصحراء", sales: 189, revenue: 136080 },
  ],
};

export const statusLabels: Record<string, string> = {
  new: "جديد",
  preparing: "قيد التحضير",
  shipped: "تم الشحن",
  completed: "مكتمل",
  canceled: "ملغي",
  active: "نشط",
  draft: "مسودة",
  archived: "مؤرشف",
  paid: "تم الدفع",
  pending: "قيد الانتظار",
  failed: "فشل",
};

export const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  preparing: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  shipped: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  canceled: "bg-red-500/20 text-red-400 border-red-500/30",
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  draft: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  archived: "bg-red-500/20 text-red-400 border-red-500/30",
  paid: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  failed: "bg-red-500/20 text-red-400 border-red-500/30",
};
