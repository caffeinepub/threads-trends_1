const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ProductDetail3D-6LN1R_P5.js","assets/index-DNh3SZbZ.js","assets/index-BG_fVV_I.css","assets/react-three-fiber.esm-wR7L9fLp.js"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, j as jsxRuntimeExports, A as AnimatePresence, m as motion, r as reactExports, S as ShoppingBag, u as ue, _ as __vitePreload } from "./index-DNh3SZbZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
const ProductDetail3D = reactExports.lazy(() => __vitePreload(() => import("./ProductDetail3D-6LN1R_P5.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0));
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  }).format(price);
}
function ProductDetailPage({
  product,
  onClose,
  onAdd
}) {
  function handleAddToCart() {
    onAdd(product.id);
    ue.success("Added to cart", { description: product.name });
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "product.detail.modal",
      className: "fixed inset-0 z-50 flex flex-col md:flex-row",
      style: { background: "oklch(0.06 0.005 60)" },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.35 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            "data-ocid": "product.detail.close_button",
            className: "absolute top-6 left-6 z-10 flex items-center gap-2 text-xs tracking-widest uppercase font-body text-muted-foreground hover:text-primary transition-colors duration-300 group",
            onClick: onClose,
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.2 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 transition-transform group-hover:-translate-x-1" }),
              "Back to Collection"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "w-full md:w-1/2 h-[60vh] md:h-full",
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                reactExports.Suspense,
                {
                  fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full h-full flex items-center justify-center",
                      style: { background: "oklch(0.06 0.005 60)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border border-primary/40 animate-spin" })
                    }
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProductDetail3D,
                    {
                      imageUrl: product.image,
                      productName: product.name
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  className: "absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 font-body tracking-widest uppercase hidden md:block",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 1 },
                  children: "Drag to rotate · Scroll to zoom"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block w-px bg-border/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 md:py-20 overflow-y-auto",
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: {
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94]
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-xs tracking-[0.4em] uppercase font-body mb-3", children: product.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground mb-2", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm tracking-widest uppercase font-body mb-6", children: product.subtitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-px bg-primary mb-8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body leading-relaxed text-base mb-8", children: product.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-4xl text-primary mb-10", children: formatPrice(product.price) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 max-w-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "product.detail.submit_button",
                    className: "w-full bg-primary text-primary-foreground py-4 text-xs tracking-widest uppercase font-body font-medium flex items-center justify-center gap-3 hover:bg-primary/90 transition-colors duration-300",
                    onClick: handleAddToCart,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                      "Add to Cart"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "product.detail.secondary_button",
                    className: "w-full border border-primary/60 text-primary py-4 text-xs tracking-widest uppercase font-body font-medium flex items-center justify-center gap-3 hover:bg-primary/10 transition-colors duration-300",
                    onClick: onClose,
                    children: "View in Collection"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center gap-3 text-muted-foreground/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-px bg-border" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-widest uppercase font-body", children: "Authenticated by TheVaultCo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-px bg-border" })
              ] })
            ]
          }
        )
      ]
    }
  ) });
}
export {
  ProductDetailPage as default
};
