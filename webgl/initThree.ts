import * as THREE from 'three';

export type HeroUniforms = {
  u_time: { value: number };
  u_resolution: { value: any };
  u_mouse: { value: any };
  u_contrast: { value: number };
  u_intensity: { value: number };
  u_hue: { value: number };
};

export type ShaderSource = {
  vertex: string;
  fragment: string;
};

export type HeroThreeContext = {
  renderer: any;
  scene: any;
  camera: any;
  uniforms: HeroUniforms;
  mesh: any;
  resize: () => void;
  render: (time: number) => void;
  dispose: () => void;
};

export function createHeroContext(canvas: HTMLCanvasElement, shaderSource: ShaderSource): HeroThreeContext {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.autoClear = false;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms: HeroUniforms = {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_contrast: { value: 0.85 },
    u_intensity: { value: 0.6 },
    u_hue: { value: 0.0 }
  };

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: shaderSource.vertex,
    fragmentShader: shaderSource.fragment,
    depthTest: false,
    depthWrite: false
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const resize = () => {
    const { clientWidth, clientHeight } = canvas;
    if (clientWidth === 0 || clientHeight === 0) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(clientWidth, clientHeight, false);
    uniforms.u_resolution.value.set(clientWidth, clientHeight);
  };

  const render = (time: number) => {
    uniforms.u_time.value = time;
    renderer.render(scene, camera);
  };

  const dispose = () => {
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };

  resize();

  return { renderer, scene, camera, uniforms, mesh, resize, render, dispose };
}
