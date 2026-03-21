import { Badge } from "@/components/ui/badge";
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
  ChevronDown,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, lazy, useState } from "react";
import { toast } from "sonner";

const Hero3D = lazy(() => import("./components/Hero3D"));
const AboutScene3D = lazy(() => import("./components/AboutScene3D"));
const ProductDetailPage = lazy(() => import("./components/ProductDetailPage"));

// ─── Static Products ───────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Gucci 9028 Sunglasses",
    subtitle: "Gold Brown Frame",
    price: 285,
    category: "Eyewear",
    image:
      "/assets/uploads/Screenshot_2026-03-20-22-02-51-72_6012fa4d4ddec268fc5c7112cbb265e7-1.jpg",
    description:
      "Iconic Gucci craftsmanship meets contemporary edge. Gold-toned hardware with rich brown gradient lenses.",
  },
  {
    id: 2,
    name: "Richard Mille WC-803",
    subtitle: "Pink Titanium",
    price: 4200,
    category: "Watches",
    image:
      "/assets/uploads/Screenshot_2026-03-20-22-02-59-14_6012fa4d4ddec268fc5c7112cbb265e7-2.jpg",
    description:
      "An exquisite fusion of haute horlogerie and feminine elegance. Skeletonized movement in blush titanium.",
  },
  {
    id: 3,
    name: "G-Shock GST B100",
    subtitle: "Black & Gold Edition",
    price: 189,
    category: "Watches",
    image:
      "/assets/uploads/Screenshot_2026-03-20-22-03-01-87_6012fa4d4ddec268fc5c7112cbb265e7-3.jpg",
    description:
      "Uncompromising toughness with refined aesthetics. Carbon core guard meets gold ion-plated hardware.",
  },
  {
    id: 4,
    name: "Fossil Scarlette Watch",
    subtitle: "Women's Analog",
    price: 320,
    category: "Watches",
    image:
      "/assets/uploads/Screenshot_2026-03-20-22-02-47-64_6012fa4d4ddec268fc5c7112cbb265e7-4.jpg",
    description:
      "Delicate rose gold case with a mesh bracelet and sunray dial — effortless everyday luxury.",
  },
  {
    id: 5,
    name: "Onitsuka Tiger Mexico 66",
    subtitle: "Cream & Khaki",
    price: 160,
    category: "Footwear",
    image:
      "/assets/uploads/Screenshot_2026-03-20-22-03-06-28_6012fa4d4ddec268fc5c7112cbb265e7-5.jpg",
    description:
      "A heritage silhouette reborn. Clean cream leather with earthy khaki accents, born in 1966.",
  },
  {
    id: 6,
    name: "Luminor Panerai GMT",
    subtitle: "Luna-Rossa Edition",
    price: 3800,
    category: "Watches",
    image:
      "/assets/uploads/Screenshot_2026-03-20-22-02-45-02_6012fa4d4ddec268fc5c7112cbb265e7-6.jpg",
    description:
      "Born from a sailing legend. Cushion case in polished steel with GMT complication and red accents.",
  },
];

type CartItem = { productId: number; quantity: number };
type Product = (typeof PRODUCTS)[0];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
  onAdd,
  onSelect,
}: {
  product: Product;
  index: number;
  onAdd: (id: number) => void;
  onSelect: (product: Product) => void;
}) {
  return (
    <motion.article
      data-ocid={`product.item.${index}`}
      className="product-card bg-card border border-border overflow-hidden group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Clickable body */}
      <button
        type="button"
        className="w-full text-left cursor-pointer"
        onClick={() => onSelect(product)}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "4/5" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* 3D view hint on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="bg-background/80 backdrop-blur-sm border border-primary/40 text-primary text-xs tracking-widest uppercase font-body px-4 py-2">
              View in 3D
            </span>
          </div>
          <span className="absolute top-4 left-4 text-xs tracking-widest uppercase font-body font-medium px-3 py-1 border border-primary/40 text-primary bg-background/60 backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {/* Info */}
        <div className="p-5 pb-3">
          <p className="text-muted-foreground text-xs tracking-widest uppercase font-body mb-1">
            {product.subtitle}
          </p>
          <h3 className="font-display text-lg leading-snug mb-2 text-foreground">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-2 font-body">
            {product.description}
          </p>
        </div>
      </button>

      {/* Price + Add (outside clickable body) */}
      <div className="px-5 pb-5 flex items-center justify-between gap-3">
        <span className="font-display text-xl text-primary">
          {formatPrice(product.price)}
        </span>
        <button
          type="button"
          data-ocid={`product.add_button.${index}`}
          className="group/btn relative overflow-hidden border border-primary/60 text-primary px-4 py-2 text-xs tracking-widest uppercase font-body font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product.id);
          }}
        >
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}

// ─── Cart Item Row ─────────────────────────────────────────────────────────────
function CartItemRow({
  item,
  index,
  onUpdate,
  onRemove,
}: {
  item: CartItem;
  index: number;
  onUpdate: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}) {
  const product = PRODUCTS.find((p) => p.id === item.productId);
  if (!product) return null;

  return (
    <div
      data-ocid={`cart.item.${index}`}
      className="flex gap-4 py-4 border-b border-border last:border-0"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-20 object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm leading-snug text-foreground mb-0.5">
          {product.name}
        </p>
        <p className="text-xs text-muted-foreground font-body mb-3">
          {formatPrice(product.price)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-6 h-6 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              onClick={() =>
                item.quantity > 1
                  ? onUpdate(item.productId, item.quantity - 1)
                  : onRemove(item.productId)
              }
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center text-sm font-body">
              {item.quantity}
            </span>
            <button
              type="button"
              className="w-6 h-6 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              onClick={() => onUpdate(item.productId, item.quantity + 1)}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-sm text-primary">
              {formatPrice(product.price * item.quantity)}
            </span>
            <button
              type="button"
              data-ocid={`cart.delete_button.${index}`}
              className="text-muted-foreground hover:text-destructive transition-colors"
              onClick={() => onRemove(item.productId)}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cart.reduce((s, i) => {
    const p = PRODUCTS.find((x) => x.id === i.productId);
    return s + (p ? p.price * i.quantity : 0);
  }, 0);

  const categories = [
    "All",
    ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
  ];
  const filtered =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  function addToCart(productId: number) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
    const product = PRODUCTS.find((p) => p.id === productId);
    toast.success("Added to cart", { description: product?.name });
  }

  function updateQty(productId: number, qty: number) {
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: qty } : i,
      ),
    );
  }

  function removeItem(productId: number) {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
    toast("Item removed");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.10 0.005 60)",
            border: "1px solid oklch(0.22 0.02 75)",
            color: "oklch(0.95 0.015 80)",
          },
        }}
      />

      {/* ── Sticky Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            data-ocid="nav.link"
            className="font-display text-xl tracking-[0.15em] uppercase text-primary"
          >
            The Vault Co
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {["Collection", "About", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                data-ocid={"nav.link"}
                className="text-xs tracking-widest uppercase font-body text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Cart */}
          <button
            type="button"
            data-ocid="nav.cart_button"
            className="relative flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center font-body"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "oklch(0.06 0.005 60)" }}
      >
        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        </div>

        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, oklch(0.06 0.005 60) 100%)",
          }}
        />

        {/* Hero Text */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-primary text-xs tracking-[0.4em] uppercase font-body mb-6"
          >
            Curated Luxury
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] mb-6"
          >
            <span className="gold-shimmer">THE VAULT CO</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-muted-foreground text-sm tracking-widest uppercase font-body mb-10"
          >
            Curated Luxury. Elevated Style.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <button
              type="button"
              data-ocid="hero.primary_button"
              className="group inline-flex items-center gap-3 border border-primary/60 text-primary px-8 py-4 text-xs tracking-widest uppercase font-body font-medium transition-all duration-500 hover:bg-primary hover:text-primary-foreground hover:gap-5"
              onClick={() =>
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs tracking-widest uppercase font-body">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.8,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Collection Section ── */}
      <section id="collection" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase font-body mb-4">
              The Collection
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Vault Exclusives
            </h2>
            <div className="w-16 h-px bg-primary mx-auto" />
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={"collection.tab"}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 text-xs tracking-widest uppercase font-body transition-all duration-300 border ${
                  activeFilter === cat
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border"
            >
              {filtered.map((product, i) => (
                <div key={product.id} className="bg-background">
                  <ProductCard
                    product={product}
                    index={i + 1}
                    onAdd={addToCart}
                    onSelect={setSelectedProduct}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="relative py-32 overflow-hidden">
        {/* 3D background */}
        <div className="absolute inset-0 opacity-40">
          <Suspense fallback={null}>
            <AboutScene3D />
          </Suspense>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase font-body mb-6">
              Our Philosophy
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-8 leading-tight">
              The Vault
              <br />
              <em className="italic text-primary">Philosophy</em>
            </h2>
            <div className="w-16 h-px bg-primary mx-auto mb-10" />
            <p className="text-muted-foreground leading-loose font-body text-base md:text-lg mb-6">
              At TheVaultCo, we believe luxury is not a price tag — it is a
              feeling. Every piece in our curated collection is selected for its
              exceptional craftsmanship, timeless design, and the story it
              carries.
            </p>
            <p className="text-muted-foreground leading-loose font-body text-base md:text-lg mb-10">
              We partner with the world's most distinguished maisons and
              independent artisans to bring you access to objects of true
              desire. From statement timepieces to refined footwear — The Vault
              is where elevated style begins.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { value: "6+", label: "Iconic Brands" },
                { value: "100%", label: "Authenticated" },
                { value: "∞", label: "Timeless" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-3xl text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground font-body">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id="contact" className="py-24 px-6 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary text-xs tracking-[0.4em] uppercase font-body mb-4">
              Get In Touch
            </p>
            <h2 className="font-display text-4xl text-foreground mb-4">
              Private Clientele
            </h2>
            <div className="w-16 h-px bg-primary mx-auto mb-8" />
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              For bespoke styling, private viewings, or exclusive acquisitions,
              our dedicated concierge team is at your service.
            </p>
            <a
              href="mailto:hello@thevaultco.com"
              data-ocid="contact.link"
              className="inline-flex items-center gap-3 border border-primary/60 text-primary px-8 py-4 text-xs tracking-widest uppercase font-body font-medium transition-all duration-500 hover:bg-primary hover:text-primary-foreground"
            >
              hello@thevaultco.com
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="font-display text-2xl tracking-[0.15em] uppercase text-primary mb-1">
                The Vault Co
              </p>
              <p className="text-xs tracking-widest text-muted-foreground font-body uppercase">
                Curated Luxury. Elevated Style.
              </p>
            </div>
            <nav className="flex items-center gap-8">
              {["Collection", "About", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-xs tracking-widest uppercase font-body text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
          <Separator className="my-8 bg-border" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-body">
            <p>© {new Date().getFullYear()} TheVaultCo. All rights reserved.</p>
            <p>
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Cart Sheet ── */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent
          data-ocid="cart.sheet"
          side="right"
          className="w-full sm:max-w-md flex flex-col p-0 bg-card border-l border-border"
        >
          <SheetHeader className="px-6 pt-6 pb-5 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-display text-lg text-foreground flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Your Cart
                {cartCount > 0 && (
                  <Badge className="bg-primary/20 text-primary border border-primary/30 font-body text-xs">
                    {cartCount}
                  </Badge>
                )}
              </SheetTitle>
              <button
                type="button"
                data-ocid="cart.close_button"
                onClick={() => setCartOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div
                data-ocid="cart.empty_state"
                className="flex flex-col items-center justify-center h-full py-24 text-center"
              >
                <ShoppingBag className="w-12 h-12 text-muted mb-4 opacity-30" />
                <p className="font-display text-lg text-foreground mb-2">
                  Your cart is empty
                </p>
                <p className="text-xs text-muted-foreground font-body tracking-wider uppercase mb-6">
                  Discover our collection
                </p>
                <button
                  type="button"
                  className="border border-primary/60 text-primary px-6 py-3 text-xs tracking-widest uppercase font-body hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  onClick={() => setCartOpen(false)}
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              <div>
                {cart.map((item, i) => (
                  <CartItemRow
                    key={item.productId}
                    item={item}
                    index={i + 1}
                    onUpdate={updateQty}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="px-6 pb-8 pt-5 border-t border-border space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest uppercase text-muted-foreground font-body">
                  Subtotal
                </span>
                <span className="font-display text-2xl text-primary">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-body">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                type="button"
                data-ocid="cart.submit_button"
                className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-widest uppercase font-body font-medium flex items-center justify-center gap-3 hover:bg-primary/90 transition-colors"
                onClick={() => toast.success("Proceeding to checkout…")}
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                data-ocid="cart.delete_button"
                className="w-full py-3 text-xs tracking-widest uppercase font-body text-muted-foreground hover:text-destructive transition-colors"
                onClick={() => {
                  setCart([]);
                  toast("Cart cleared");
                }}
              >
                Clear Cart
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ── Product Detail 3D Overlay ── */}
      <AnimatePresence>
        {selectedProduct && (
          <Suspense fallback={null}>
            <ProductDetailPage
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAdd={addToCart}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}
