import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import logoSource from '../../public/assets/logo26.svg?raw';

const TAU = Math.PI * 2;
const clamp = (v) => Math.max(0, Math.min(1, v));
const mix = (a, b, t) => a + (b - a) * t;
const ease = (t, a, b) => {
  const x = clamp((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};

export function createTimeScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, powerPreference: 'low-power' });
  const resources = new Set();
  const keep = (resource) => { resources.add(resource); return resource; };
  const dispose = () => {
    resources.forEach((resource) => resource.dispose());
    resources.clear();
    renderer.dispose();
  };

  try {
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const dark = new THREE.Color('#15110e');
    const cream = new THREE.Color('#f7f1e4');
    const amber = new THREE.Color('#d7aa63');
    scene.background = dark.clone();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 4000);
    camera.position.z = 1500;
    const stage = new THREE.Group();
    scene.add(stage);
    let width = 1;
    let height = 1;
    let seed = 260926;
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const material = (opacity = 1, color = cream) => keep(new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
    const line = (points, mat, parent = stage) => {
      const geometry = keep(new THREE.BufferGeometry().setFromPoints(points));
      const object = new THREE.Line(geometry, mat);
      parent.add(object);
      return object;
    };
    const circlePoints = (radius, count = 240) => Array.from({ length: count + 1 }, (_, i) => {
      const angle = i / count * TAU;
      return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    });

    // A sundial whose traces lift into three orbital planes.
    const dial = new THREE.Group();
    stage.add(dial);
    const dialMaterial = material(.65);
    const dialRing = line(circlePoints(227), dialMaterial, dial);
    const innerMaterial = material(.18);
    const innerRing = line(circlePoints(210), innerMaterial, dial);
    const ticks = [];
    for (let i = 0; i < 60; i++) {
      const angle = i / 60 * TAU;
      const r = i % 5 === 0 ? 241 : 234;
      ticks.push(new THREE.Vector3(227 * Math.cos(angle), 227 * Math.sin(angle), 0));
      ticks.push(new THREE.Vector3(r * Math.cos(angle), r * Math.sin(angle), 0));
    }
    const tickGeometry = keep(new THREE.BufferGeometry().setFromPoints(ticks));
    const tickMaterial = material(.5);
    dial.add(new THREE.LineSegments(tickGeometry, tickMaterial));
    const handMaterial = material(.95, amber);
    const hand = line([new THREE.Vector3(0, 0, 2), new THREE.Vector3(0, 206, 2)], handMaterial, dial);
    const echoes = Array.from({ length: 7 }, (_, i) => {
      const mat = material(.06 + i * .015, amber);
      return line([new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 206, 1)], mat, dial);
    });
    const pivot = new THREE.Mesh(
      keep(new THREE.CircleGeometry(3, 16)),
      keep(new THREE.MeshBasicMaterial({ color: amber, transparent: true, depthWrite: false }))
    );
    pivot.position.z = 3;
    dial.add(pivot);

    const orbits = Array.from({ length: 3 }, (_, i) => {
      const orbit = line(circlePoints(180 + i * 13), material(0, i === 1 ? amber : cream));
      return orbit;
    });

    // The first three SVG paths are the globe and the two hourglass ribbons.
    // Using the real outlines preserves the emblem's asymmetric curves and holes.
    const svgDocument = new DOMParser().parseFromString(logoSource, 'image/svg+xml');
    const pathMarkup = [...svgDocument.querySelectorAll('path')].slice(0, 3)
      .map((path) => `<path d="${path.getAttribute('d')}" fill="#ffffff" fill-rule="${path.getAttribute('fill-rule') || 'nonzero'}"/>`).join('');
    const paths = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg">${pathMarkup}</svg>`).paths;
    const emblem = new THREE.Group();
    stage.add(emblem);
    const solidMaterials = [];
    const silhouettes = [];
    const outlines = [];
    for (const path of paths) {
      const shapes = SVGLoader.createShapes(path);
      const geometry = keep(new THREE.ShapeGeometry(shapes, 28));
      geometry.translate(-476, -249, 0);
      geometry.scale(1, -1, 1);
      const mat = keep(new THREE.MeshBasicMaterial({ color: cream, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.z = 4;
      emblem.add(mesh);
      silhouettes.push(geometry);
      solidMaterials.push(mat);
      for (const subpath of path.subPaths) {
        const points = subpath.getPoints(16).map((p) => new THREE.Vector3(p.x - 476, 249 - p.y, 3));
        const outline = line(points, material(0), emblem);
        outlines.push(outline);
      }
    }

    // Past and future share the same contours as the present, at different depths.
    const timeLayers = [-1, 1].map((direction) => {
      const group = new THREE.Group();
      const mat = material(0, direction < 0 ? amber : cream);
      for (const outline of outlines) group.add(new THREE.Line(outline.geometry, mat));
      stage.add(group);
      return { group, mat, direction };
    });

    // Area-weighted triangle samples distribute the original grains over the
    // exact filled SVG. No replacement particle set is spawned during the reveal.
    const triangles = [];
    let area = 0;
    for (const geometry of silhouettes) {
      const positions = geometry.attributes.position;
      const indices = geometry.index;
      for (let i = 0; i < indices.count; i += 3) {
        const a = new THREE.Vector3().fromBufferAttribute(positions, indices.getX(i));
        const b = new THREE.Vector3().fromBufferAttribute(positions, indices.getX(i + 1));
        const c = new THREE.Vector3().fromBufferAttribute(positions, indices.getX(i + 2));
        area += new THREE.Triangle(a, b, c).getArea();
        triangles.push({ a, b, c, area });
      }
    }
    const count = Math.min(innerWidth, innerHeight) < 600 ? 1700 : 3200;
    const targets = new Float32Array(count * 3);
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const chosenArea = random() * area;
      let lo = 0, hi = triangles.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (triangles[mid].area < chosenArea) lo = mid + 1;
        else hi = mid;
      }
      const { a, b, c } = triangles[lo];
      const u = Math.sqrt(random());
      const v = random();
      targets[i * 3] = (1 - u) * a.x + u * (1 - v) * b.x + u * v * c.x;
      targets[i * 3 + 1] = (1 - u) * a.y + u * (1 - v) * b.y + u * v * c.y;
      targets[i * 3 + 2] = 5;
      for (let j = 0; j < 4; j++) seeds[i * 4 + j] = random();
      const color = cream.clone().lerp(amber, random() * .9);
      color.toArray(colors, i * 3);
    }
    const grainGeometry = keep(new THREE.BufferGeometry());
    grainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    grainGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const grainMaterial = keep(new THREE.ShaderMaterial({
      uniforms: { uOpacity: { value: 0 }, uSize: { value: renderer.getPixelRatio() * 1.6 } },
      transparent: true, depthWrite: false, vertexColors: true,
      vertexShader: `
        uniform float uSize;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 view = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * view;
          gl_PointSize = uSize;
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying vec3 vColor;
        void main() {
          float radius = length(gl_PointCoord - .5);
          float alpha = (1.0 - smoothstep(.22, .5, radius)) * uOpacity;
          gl_FragColor = vec4(vColor, alpha);
          #include <colorspace_fragment>
        }
      `
    }));
    const grains = new THREE.Points(grainGeometry, grainMaterial);
    grains.frustumCulled = false;
    stage.add(grains);

    const resize = (w, h) => {
      width = Math.max(1, w);
      height = Math.max(1, h);
      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
    };

    const render = (t) => {
      const lift = ease(t, 1.1, 2.35);
      const converge = ease(t, 3.15, 4.35);
      const resolve = ease(t, 3.85, 4.2);
      const sculptureFade = 1 - ease(t, 4.15, 4.45);
      const openingScale = Math.min(width * .68, height * .43, 365) / 498;
      stage.scale.setScalar(openingScale);
      stage.position.set(0, height * .06, 0);

      const dialOpacity = ease(t, 0, .5) * (1 - ease(t, 1.6, 2.6));
      dial.rotation.x = mix(.48, 0, lift);
      dial.rotation.z = -.16;
      dialMaterial.opacity = dialOpacity * .7;
      innerMaterial.opacity = dialOpacity * .18;
      tickMaterial.opacity = dialOpacity * .5;
      handMaterial.opacity = dialOpacity;
      pivot.material.opacity = dialOpacity;
      dialRing.geometry.setDrawRange(0, Math.floor(ease(t, 0, 1.05) * 241));
      innerRing.geometry.setDrawRange(0, Math.floor(ease(t, .2, 1.25) * 241));
      tickGeometry.setDrawRange(0, Math.floor(ease(t, .3, 1.3) * 60) * 2);
      const steppedTime = Math.floor(Math.min(t, 1.6) * 8) / 8;
      hand.rotation.z = -steppedTime * 3.4;
      echoes.forEach((echo, i) => {
        echo.rotation.z = hand.rotation.z + (i + 1) * .19;
        echo.material.opacity = dialOpacity * (1 - i / 8) * .15;
      });

      orbits.forEach((orbit, i) => {
        const angle = t * (i === 1 ? -.23 : .3) + i * 1.05;
        orbit.rotation.set(mix(.48, .55 + i * .65, lift), Math.sin(angle) * lift * .8, angle * lift);
        orbit.material.opacity = ease(t, 1.05, 1.85) * (1 - ease(t, 3.5, 4.3)) * (i === 1 ? .55 : .3);
      });
      outlines.forEach((outline) => {
        outline.material.opacity = ease(t, 1.65, 2.8) * (1 - resolve) * .55;
        const n = outline.geometry.attributes.position.count;
        outline.geometry.setDrawRange(0, Math.floor(ease(t, 1.4, 3.4) * n));
      });
      timeLayers.forEach(({ group, mat, direction }) => {
        const spread = 1 - converge;
        group.position.set(direction * 94 * spread, direction * 16 * spread, direction * 100 * spread);
        group.rotation.y = direction * .38 * spread;
        group.rotation.z = direction * .07 * spread;
        mat.opacity = ease(t, 2.55, 3.1) * (1 - ease(t, 3.75, 4.4)) * .22;
      });
      solidMaterials.forEach((mat) => { mat.opacity = resolve * sculptureFade; });

      // The clock slows to a stop, then the same flow splits in two directions.
      const flowTime = t < 2.8 ? t * .27 : .756 + Math.sin(Math.min(t - 2.8, 1.6) * 1.8) * .1;
      for (let i = 0; i < count; i++) {
        const s = i * 4;
        const k = i * 3;
        const a = seeds[s] * TAU;
        const r = 224 + (seeds[s + 1] - .5) * 9;
        const ringAngle = a - t * .45;
        const ringX = Math.cos(ringAngle) * r;
        const ringY = Math.sin(ringAngle) * r * .89;
        const direction = i % 2 === 0 ? 1 : -1;
        const reverse = ease(t, 2.8, 3.45) * (t - 2.8) * .14 * direction;
        const q = ((seeds[s + 2] + flowTime + reverse) % 1 + 1) % 1;
        const fy = 245 - q * 490;
        const radius = (6 + 142 * Math.pow(Math.abs(fy / 245), 1.65)) * Math.sqrt(seeds[s + 1]);
        const flowAngle = a + q * TAU * 1.25 + t * .25;
        const fx = Math.cos(flowAngle) * radius;
        const fz = Math.sin(flowAngle) * radius * .58;
        const travel = ease(t, .95 + seeds[s + 3] * .4, 2.15 + seeds[s + 3] * .3);
        const settle = ease(t, 3.2 + seeds[s + 3] * .25, 4.35 + seeds[s + 3] * .15);
        positions[k] = mix(mix(ringX, fx, travel), targets[k], settle);
        positions[k + 1] = mix(mix(ringY, fy, travel), targets[k + 1], settle);
        positions[k + 2] = mix(fz * travel, 5, settle);
      }
      grainGeometry.attributes.position.needsUpdate = true;
      grainMaterial.uniforms.uOpacity.value = ease(t, .45, 1.3) * (1 - ease(t, 4.05, 4.45)) * .88;
      renderer.render(scene, camera);
    };
    return { resize, render, dispose };
  } catch (error) {
    dispose();
    throw error;
  }
}
