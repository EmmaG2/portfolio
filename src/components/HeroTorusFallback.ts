import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export function init(canvas: HTMLCanvasElement) {
  if (canvas.dataset.init === '1') return
  canvas.dataset.init = '1'

  const isMobile = window.innerWidth < 768
  const TUBE_SEG   = isMobile ? 32 : 48
  const RADIAL_SEG = isMobile ? 128 : 256

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark'
  const getAccentColor = (): string => 
    localStorage.getItem('fg-accent') ?? (isDark() ? '#E85C73' : '#C47A0A')

  const renderer = new THREE.WebGLRenderer({
    canvas, 
    antialias: true, 
    alpha: true, 
    powerPreference: 'high-performance'
  })
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene  = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = isMobile ? 8.5 : 6.5

  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTexture
  pmrem.dispose()

  const geometry = new THREE.TorusGeometry(1.8, 0.65, TUBE_SEG, RADIAL_SEG)
  const material = new THREE.MeshPhysicalMaterial({ 
      color: getAccentColor(),
      metalness: 0.1,
      roughness: 0.02,
      transmission: 0.25,
      thickness: 2.0,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      envMapIntensity: 2.5,
  })
  
  const group = new THREE.Group()
  const torus = new THREE.Mesh(geometry, material)
  torus.rotation.x = -Math.PI * 0.12
  group.add(torus)
  scene.add(group)

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
  scene.add(ambientLight)
  
  const light1 = new THREE.DirectionalLight(0xffffff, 4.0)
  light1.position.set(-3, 6, 4)
  scene.add(light1)
  
  const light2 = new THREE.PointLight(0xffffff, 8.0)
  light2.position.set(4, -1, 3)
  scene.add(light2)

  const pointer = { x: 0, y: 0 }, smooth = { x: 0, y: 0 }
  const clock = new THREE.Clock()

  function animate() {
    const delta = Math.min(clock.getDelta(), 0.1)
    smooth.x += (pointer.x - smooth.x) * (delta * 2.5)
    smooth.y += (pointer.y - smooth.y) * (delta * 2.5)
    torus.rotation.y += delta * 0.2
    group.rotation.y = smooth.x * 0.15
    group.rotation.x = -smooth.y * 0.1
    renderer.render(scene, camera)
  }

  renderer.setAnimationLoop(animate)

  const resizeObserver = new ResizeObserver(() => {
      const w = window.innerWidth, h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
  })
  resizeObserver.observe(document.body)

  const onMove = (x: number, y: number) => {
    pointer.x = (x / window.innerWidth - 0.5) * 2
    pointer.y = (y / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY))
  window.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true })

  const updateLook = () => {
    material.color.set(getAccentColor())
    material.needsUpdate = true
  }
  document.addEventListener('theme-changed',  updateLook as EventListener)
  document.addEventListener('accent-changed', updateLook as EventListener)

  document.addEventListener('astro:before-swap', () => {
    renderer.setAnimationLoop(null)
    resizeObserver.disconnect()
    geometry.dispose(); material.dispose()
    envTexture.dispose(); renderer.dispose()
    document.removeEventListener('theme-changed', updateLook as EventListener)
    document.removeEventListener('accent-changed', updateLook as EventListener)
  }, { once: true })
}
