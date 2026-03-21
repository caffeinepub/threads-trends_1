import { j as jsxRuntimeExports, r as reactExports } from "./index-DNh3SZbZ.js";
import { b as Canvas, u as useFrame } from "./react-three-fiber.esm-wR7L9fLp.js";
function RotatingTorus() {
  const ref = reactExports.useRef(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.12;
      ref.current.rotation.y = t * 0.08;
      ref.current.rotation.z = t * 0.05;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [2.2, 0.06, 6, 80] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#C9A84C", transparent: true, opacity: 0.2 })
  ] });
}
function RotatingTorusKnot() {
  const ref = reactExports.useRef(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.1;
      ref.current.rotation.y = t * 0.15;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusKnotGeometry", { args: [1.2, 0.04, 128, 8, 2, 3] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#E8C97A", transparent: true, opacity: 0.15 })
  ] });
}
function AboutScene3D() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Canvas,
    {
      camera: { position: [0, 0, 6], fov: 50 },
      style: { background: "transparent" },
      gl: { antialias: true, alpha: true },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.5, color: "#C9A84C" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotatingTorus, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotatingTorusKnot, {})
      ] })
    }
  );
}
export {
  AboutScene3D as default
};
