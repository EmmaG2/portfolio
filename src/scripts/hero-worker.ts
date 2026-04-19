import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let torus: THREE.Mesh;
let group: THREE.Group;
let material: THREE.MeshPhysicalMaterial;
let clock: THREE.Clock;

const pointer = { x: 0, y: 0 };
const smooth = { x: 0, y: 0 };

self.onmessage = (e) => {
  const { type, payload } = e.data;

  if (type === 'init') {
    const { canvas, width, height, pixelRatio, isMobile, accentColor } = payload;
    init(canvas, width, height, pixelRatio, isMobile, accentColor);
  } else if (type === 'resize') {
    const { width, height } = payload;
    if (camera) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    if (renderer) renderer.setSize(width, height, false);
  } else if (type === 'mousemove') {
    pointer.x = payload.x;
    pointer.y = payload.y;
  } else if (type === 'update-color') {
    if (material) material.color.set(payload.color);
  }
};

function init(canvas: OffscreenCanvas, width: number, height: number, pixelRatio: number, isMobile: boolean, accentColor: string) {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });

  renderer.setSize(width, height, false);
  renderer.setPixelRatio(pixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.z = isMobile ? 8.5 : 6.5;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;
  pmrem.dispose();

  const TUBE_SEG = isMobile ? 32 : 48;
  const RADIAL_SEG = isMobile ? 128 : 256;
  const geometry = new THREE.TorusGeometry(1.8, 0.65, TUBE_SEG, RADIAL_SEG);
  
  material = new THREE.MeshPhysicalMaterial({
    color: accentColor,
    metalness: 0.1,
    roughness: 0.02,
    transmission: 0.25,
    thickness: 2.0,
    ior: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    envMapIntensity: 2.5,
  });

  group = new THREE.Group();
  torus = new THREE.Mesh(geometry, material);
  torus.rotation.x = -Math.PI * 0.12;
  group.add(torus);
  scene.add(group);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);
  const light1 = new THREE.DirectionalLight(0xffffff, 4.0);
  light1.position.set(-3, 6, 4);
  scene.add(light1);
  const light2 = new THREE.PointLight(0xffffff, 8.0);
  light2.position.set(4, -1, 3);
  scene.add(light2);

  clock = new THREE.Clock();
  animate();
}

let isFirstFrame = true;

function animate() {
  const delta = Math.min(clock.getDelta(), 0.1);
  
  smooth.x += (pointer.x - smooth.x) * (delta * 2.5);
  smooth.y += (pointer.y - smooth.y) * (delta * 2.5);
  
  if (torus) torus.rotation.y += delta * 0.2;
  if (group) {
    group.rotation.y = smooth.x * 0.15;
    group.rotation.x = -smooth.y * 0.1;
  }
  
  renderer.render(scene, camera);

  if (isFirstFrame) {
    self.postMessage({ type: 'ready' });
    isFirstFrame = false;
  }

  requestAnimationFrame(animate);
}
