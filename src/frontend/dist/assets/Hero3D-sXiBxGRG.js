import { r as reactExports, j as jsxRuntimeExports } from "./index-DNh3SZbZ.js";
import { R as REVISION, C as Color, u as useFrame, A as AdditiveBlending, V as Vector3, S as Spherical, a as ShaderMaterial, b as Canvas, B as BackSide } from "./react-three-fiber.esm-wR7L9fLp.js";
const getVersion = () => parseInt(REVISION.replace(/\D+/g, ""));
const version = /* @__PURE__ */ getVersion();
class StarfieldMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: {
          value: 0
        },
        fade: {
          value: 1
        }
      },
      vertexShader: (
        /* glsl */
        `
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`
      ),
      fragmentShader: (
        /* glsl */
        `
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
      }`
      )
    });
  }
}
const genStar = (r) => {
  return new Vector3().setFromSpherical(new Spherical(r, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI));
};
const Stars = /* @__PURE__ */ reactExports.forwardRef(({
  radius = 100,
  depth = 50,
  count = 5e3,
  saturation = 0,
  factor = 4,
  fade = false,
  speed = 1
}, ref) => {
  const material = reactExports.useRef(null);
  const [position, color, size] = reactExports.useMemo(() => {
    const positions = [];
    const colors = [];
    const sizes = Array.from({
      length: count
    }, () => (0.5 + 0.5 * Math.random()) * factor);
    const color2 = new Color();
    let r = radius + depth;
    const increment = depth / count;
    for (let i = 0; i < count; i++) {
      r -= increment * Math.random();
      positions.push(...genStar(r).toArray());
      color2.setHSL(i / count, saturation, 0.9);
      colors.push(color2.r, color2.g, color2.b);
    }
    return [new Float32Array(positions), new Float32Array(colors), new Float32Array(sizes)];
  }, [count, depth, factor, radius, saturation]);
  useFrame((state) => material.current && (material.current.uniforms.time.value = state.clock.elapsedTime * speed));
  const [starfieldMaterial] = reactExports.useState(() => new StarfieldMaterial());
  return /* @__PURE__ */ reactExports.createElement("points", {
    ref
  }, /* @__PURE__ */ reactExports.createElement("bufferGeometry", null, /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-position",
    args: [position, 3]
  }), /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-color",
    args: [color, 3]
  }), /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-size",
    args: [size, 1]
  })), /* @__PURE__ */ reactExports.createElement("primitive", {
    ref: material,
    object: starfieldMaterial,
    attach: "material",
    blending: AdditiveBlending,
    "uniforms-fade-value": fade,
    depthWrite: false,
    transparent: true,
    vertexColors: true
  }));
});
function GoldOrb() {
  const meshRef = reactExports.useRef(null);
  const wireRef = reactExports.useRef(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.1;
      wireRef.current.rotation.z = t * 0.05;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [0, 0, 0], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [1.4, 64, 64] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color: "#1a1208",
          metalness: 0.9,
          roughness: 0.2,
          envMapIntensity: 1.5
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: wireRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [1.45, 16, 16] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color: "#C9A84C",
          wireframe: true,
          transparent: true,
          opacity: 0.35
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [1.55, 32, 32] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color: "#C9A84C",
          transparent: true,
          opacity: 0.04,
          side: BackSide
        }
      )
    ] })
  ] });
}
function FloatingIcosahedron() {
  const ref = reactExports.useRef(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.3;
      ref.current.rotation.y = t * 0.2;
      ref.current.position.x = Math.sin(t * 0.4) * 3.2;
      ref.current.position.y = Math.cos(t * 0.3) * 0.8;
      ref.current.position.z = Math.sin(t * 0.25) * 1;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [0.45, 0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#C9A84C", wireframe: true, transparent: true, opacity: 0.6 })
  ] });
}
function FloatingTorus() {
  const ref = reactExports.useRef(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.15;
      ref.current.position.x = Math.sin(t * 0.35 + Math.PI) * 3;
      ref.current.position.y = Math.cos(t * 0.28 + Math.PI) * 0.9;
      ref.current.position.z = Math.cos(t * 0.22) * 0.8;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [0.5, 0.15, 8, 24] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#C9A84C", wireframe: true, transparent: true, opacity: 0.5 })
  ] });
}
function FloatingOctahedron() {
  const ref = reactExports.useRef(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.4;
      ref.current.rotation.y = t * 0.25;
      ref.current.position.x = Math.cos(t * 0.45 + 1) * 2.8;
      ref.current.position.y = Math.sin(t * 0.38 + 2) * 1.2 - 1;
      ref.current.position.z = Math.cos(t * 0.3 + 0.5) * 1.2;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("octahedronGeometry", { args: [0.35, 0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#E8C97A", wireframe: true, transparent: true, opacity: 0.55 })
  ] });
}
function GoldParticles() {
  const count = 800;
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    velocities[i] = Math.random() * 0.5 + 0.2;
  }
  const pointsRef = reactExports.useRef(null);
  const posRef = reactExports.useRef(positions.slice());
  const velRef = reactExports.useRef(velocities);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!pointsRef.current) return;
    const pos = posRef.current;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += velRef.current[i] * 4e-3;
      pos[i * 3] += Math.sin(t * 0.3 + i) * 1e-3;
      if (pos[i * 3 + 1] > 7) {
        pos[i * 3 + 1] = -7;
      }
    }
    pointsRef.current.geometry.attributes.position.set(pos);
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("points", { ref: pointsRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("bufferGeometry", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "bufferAttribute",
      {
        attach: "attributes-position",
        args: [posRef.current, 3]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "pointsMaterial",
      {
        size: 0.025,
        color: "#C9A84C",
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true
      }
    )
  ] });
}
function SceneContent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.3, color: "#fff5e0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [5, 5, 5], intensity: 2, color: "#C9A84C" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-5, -5, -5], intensity: 0.5, color: "#4a3010" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Stars,
      {
        radius: 60,
        depth: 30,
        count: 2e3,
        factor: 2,
        saturation: 0.1,
        fade: true,
        speed: 0.3
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GoldParticles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GoldOrb, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingIcosahedron, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTorus, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingOctahedron, {})
  ] });
}
function Hero3D() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Canvas,
    {
      camera: { position: [0, 0, 6], fov: 55 },
      style: { background: "transparent" },
      gl: { antialias: true, alpha: true },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SceneContent, {}) })
    }
  );
}
export {
  Hero3D as default
};
