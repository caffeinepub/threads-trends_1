import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Category,
  useAddProduct,
  useAddToCart,
  useClearCart,
  useGetAllProducts,
  useGetCart,
  useRemoveFromCart,
  useUpdateCartItem,
} from "./hooks/useQueries";
import type { CartItem, Product } from "./hooks/useQueries";

// Static seed products
const SEED_PRODUCTS = [
  {
    name: "Classic White Tee",
    description:
      "A timeless essential — ultra-soft cotton tee with a relaxed fit, perfect for any occasion.",
    price: 29n,
    category: Category.tops,
    imageUrl: "https://picsum.photos/seed/classicwhitetee/400/500",
  },
  {
    name: "Striped Polo",
    description:
      "Bold horizontal stripes on a breathable piqué polo. Weekend-ready and effortlessly cool.",
    price: 45n,
    category: Category.tops,
    imageUrl: "https://picsum.photos/seed/stripedpolo/400/500",
  },
  {
    name: "Floral Blouse",
    description:
      "A breezy floral-print blouse with flutter sleeves. The kind of top that gets compliments.",
    price: 55n,
    category: Category.tops,
    imageUrl: "https://picsum.photos/seed/floralblouse/400/500",
  },
  {
    name: "Slim Fit Jeans",
    description:
      "Mid-rise stretch denim with a slim cut. Moves with you from morning to midnight.",
    price: 79n,
    category: Category.bottoms,
    imageUrl: "https://picsum.photos/seed/slimfitjeans/400/500",
  },
  {
    name: "Pleated Skirt",
    description:
      "Flowing pleated midi skirt in rich fabric. Pairs beautifully with everything in your wardrobe.",
    price: 65n,
    category: Category.bottoms,
    imageUrl: "https://picsum.photos/seed/pleatedskirt/400/500",
  },
  {
    name: "Cargo Shorts",
    description:
      "Relaxed-fit cargo shorts with zippered pockets. Built for adventure, styled for the city.",
    price: 49n,
    category: Category.bottoms,
    imageUrl: "https://picsum.photos/seed/cargoshorts/400/500",
  },
  {
    name: "Leather Belt",
    description:
      "Full-grain leather belt with a brushed silver buckle. The finishing touch every outfit needs.",
    price: 35n,
    category: Category.accessories,
    imageUrl: "https://picsum.photos/seed/leatherbelt/400/500",
  },
  {
    name: "Canvas Tote Bag",
    description:
      "Heavy-duty waxed canvas tote with interior pockets. Stylish enough for brunch, sturdy enough for the market.",
    price: 40n,
    category: Category.accessories,
    imageUrl: "https://picsum.photos/seed/canvastote/400/500",
  },
  {
    name: "Silk Scarf",
    description:
      "Hand-rolled edges on pure silk twill. A luxurious accent for any season, any look.",
    price: 60n,
    category: Category.accessories,
    imageUrl: "https://picsum.photos/seed/silkscarf/400/500",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  tops: "bg-primary/10 text-primary border-primary/20",
  bottoms: "bg-secondary/20 text-secondary-foreground border-secondary/30",
  accessories: "bg-accent/30 text-accent-foreground border-accent/40",
};

const CATEGORY_LABEL: Record<string, string> = {
  tops: "Tops",
  bottoms: "Bottoms",
  accessories: "Accessories",
};

type FilterTab = "all" | Category;

function formatPrice(price: bigint) {
  return `$${Number(price)}`;
}

function ProductCard({
  product,
  index,
  onAddToCart,
}: { product: Product; index: number; onAddToCart: (id: bigint) => void }) {
  const [adding, setAdding] = useState(false);

  async function handleAdd() {
    setAdding(true);
    await onAddToCart(product.id);
    setAdding(false);
  }

  return (
    <motion.div
      data-ocid={`product.item.${index}`}
      className="product-card bg-card rounded-2xl overflow-hidden shadow-card border border-border group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[product.category]}`}
        >
          {CATEGORY_LABEL[product.category]}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display font-700 text-base leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-display font-800 text-xl text-primary">
            {formatPrice(product.price)}
          </span>
          <Button
            data-ocid={`product.add_button.${index}`}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-xs font-semibold px-4"
            onClick={handleAdd}
            disabled={adding}
          >
            {adding ? (
              <span className="inline-flex items-center gap-1">
                <span className="w-3 h-3 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Adding
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Plus className="w-3 h-3" />
                Add to Cart
              </span>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function CartItemRow({
  item,
  product,
  index,
  onUpdate,
  onRemove,
}: {
  item: CartItem;
  product: Product | undefined;
  index: number;
  onUpdate: (id: bigint, qty: bigint) => void;
  onRemove: (id: bigint) => void;
}) {
  if (!product) return null;
  const qty = Number(item.quantity);

  return (
    <div
      data-ocid={`cart.item.${index}`}
      className="cart-item flex gap-3 p-3 rounded-xl transition-colors"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="font-display font-600 text-sm leading-snug">
          {product.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatPrice(product.price)} each
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="w-6 h-6 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              onClick={() =>
                qty > 1
                  ? onUpdate(item.productId, BigInt(qty - 1))
                  : onRemove(item.productId)
              }
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-7 text-center text-sm font-semibold">{qty}</span>
            <button
              type="button"
              className="w-6 h-6 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              onClick={() => onUpdate(item.productId, BigInt(qty + 1))}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-700 text-sm text-primary">
              {formatPrice(product.price * BigInt(qty))}
            </span>
            <button
              type="button"
              data-ocid={`cart.delete_button.${index}`}
              className="w-6 h-6 rounded-full bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground text-destructive transition-colors flex items-center justify-center"
              onClick={() => onRemove(item.productId)}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const seeded = useRef(false);

  const { data: products = [] } = useGetAllProducts();
  const { data: cartItems = [] } = useGetCart();
  const addProduct = useAddProduct();
  const addToCart = useAddToCart();
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();

  // Seed products on first load if backend is empty
  useEffect(() => {
    if (seeded.current) return;
    if (products.length === 0 && addProduct.status !== "pending") {
      seeded.current = true;
      Promise.all(
        SEED_PRODUCTS.map((p) => addProduct.mutateAsync(p).catch(() => {})),
      ).catch(() => {});
    }
  }, [products.length, addProduct]);

  // Use seed products as fallback while backend loads
  const displayProducts: Product[] =
    products.length > 0
      ? products
      : SEED_PRODUCTS.map((p, i) => ({ ...p, id: BigInt(i + 1) }));

  const filteredProducts =
    activeTab === "all"
      ? displayProducts
      : displayProducts.filter((p) => p.category === activeTab);

  const cartCount = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity),
    0,
  );

  const subtotal = cartItems.reduce((acc, item) => {
    const product = displayProducts.find((p) => p.id === item.productId);
    return acc + (product ? Number(product.price) * Number(item.quantity) : 0);
  }, 0);

  async function handleAddToCart(productId: bigint) {
    const existing = cartItems.find((i) => i.productId === productId);
    try {
      if (existing) {
        await updateCartItem.mutateAsync({
          productId,
          quantity: existing.quantity + 1n,
        });
      } else {
        await addToCart.mutateAsync({ productId, quantity: 1n });
      }
      toast.success("Added to cart!", {
        description: "Item added to your bag.",
      });
    } catch {
      toast.error("Failed to add to cart");
    }
  }

  async function handleUpdateQty(productId: bigint, quantity: bigint) {
    try {
      await updateCartItem.mutateAsync({ productId, quantity });
    } catch {
      toast.error("Failed to update cart");
    }
  }

  async function handleRemove(productId: bigint) {
    try {
      await removeFromCart.mutateAsync(productId);
      toast.success("Removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  }

  const TABS: { value: FilterTab; label: string; ocid: string }[] = [
    { value: "all", label: "All Items", ocid: "nav.tab.1" },
    { value: Category.tops, label: "Tops", ocid: "nav.tab.2" },
    { value: Category.bottoms, label: "Bottoms", ocid: "nav.tab.3" },
    { value: Category.accessories, label: "Accessories", ocid: "nav.tab.4" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display font-800 text-lg tracking-tight">
              Threads&nbsp;&amp;&nbsp;Trends
            </span>
          </div>
          <button
            type="button"
            data-ocid="nav.cart_button"
            className="relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">My Bag</span>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="relative h-[420px] sm:h-[500px]">
            <img
              src="/assets/generated/hero-fashion.dim_1600x600.jpg"
              alt="Threads & Trends hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container max-w-7xl mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="max-w-xl"
                >
                  <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
                    New Season Collection
                  </p>
                  <h1 className="font-display font-800 text-4xl sm:text-6xl text-white leading-[1.05] mb-4">
                    Dress Bold.
                    <br />
                    Live Bright.
                  </h1>
                  <p className="text-white/80 text-base sm:text-lg mb-6 leading-relaxed">
                    Clothing and accessories that celebrate color, confidence,
                    and self-expression.
                  </p>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-3 font-bold text-base"
                    onClick={() =>
                      document
                        .getElementById("shop")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Shop the Collection <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop Section */}
        <section id="shop" className="container max-w-7xl mx-auto px-4 py-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab.value}
                data-ocid={tab.ocid}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                  activeTab === tab.value
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product, i) => (
                <ProductCard
                  key={String(product.id)}
                  product={product}
                  index={i + 1}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <p className="font-display text-xl">
                No items in this category yet.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-display font-600 text-base mb-1">
            Threads &amp; Trends
          </p>
          <p>Your everyday destination for bold, beautiful fashion.</p>
          <p className="mt-4">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* Cart Sheet */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent
          data-ocid="cart.sheet"
          side="right"
          className="w-full sm:max-w-md flex flex-col p-0"
        >
          <SheetHeader className="px-5 pt-5 pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-display font-800 text-lg flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                My Bag{" "}
                {cartCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground">
                    {cartCount}
                  </Badge>
                )}
              </SheetTitle>
              <button
                type="button"
                data-ocid="cart.close_button"
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="font-display text-lg">Your bag is empty</p>
                <p className="text-sm mt-1">Add some items to get started!</p>
                <Button
                  className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                {cartItems.map((item, i) => (
                  <CartItemRow
                    key={String(item.productId)}
                    item={item}
                    product={displayProducts.find(
                      (p) => p.id === item.productId,
                    )}
                    index={i + 1}
                    onUpdate={handleUpdateQty}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="px-5 pb-6 pt-4 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Subtotal</span>
                <span className="font-display font-800 text-2xl text-primary">
                  ${subtotal}
                </span>
              </div>
              <Separator />
              <div className="space-y-2">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold text-base py-5">
                  Checkout <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl text-sm"
                  onClick={() =>
                    clearCart
                      .mutateAsync()
                      .then(() => toast.success("Cart cleared"))
                      .catch(() => {})
                  }
                >
                  Clear bag
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
