precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_contrast;
uniform float u_intensity;
uniform float u_hue;

varying vec2 vUv;

const float PI = 3.14159265359;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = rot * p * 1.1;
    amplitude *= 0.5;
  }
  return value;
}

vec2 curl(vec2 p) {
  float eps = 0.001;
  float n1 = fbm(vec2(p.x, p.y + eps));
  float n2 = fbm(vec2(p.x, p.y - eps));
  float n3 = fbm(vec2(p.x + eps, p.y));
  float n4 = fbm(vec2(p.x - eps, p.y));
  return vec2(n1 - n2, n3 - n4);
}

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
  vec3 p = abs(fract(c.xxx + vec3(0.0, 1.0 / 3.0, 2.0 / 3.0)) * 6.0 - 3.0);
  vec3 rgb = c.z * mix(vec3(1.0), clamp(p - 1.0, 0.0, 1.0), c.y);
  return rgb;
}

vec3 applyHue(vec3 color, float shift) {
  vec3 hsv = rgb2hsv(color);
  hsv.x = fract(hsv.x + shift);
  return hsv2rgb(hsv);
}

void main() {
  vec2 resolution = max(u_resolution, vec2(1.0));
  vec2 st = vUv * 2.0 - 1.0;
  st.x *= resolution.x / resolution.y;

  float time = u_time * 0.06;
  vec2 pointer = (u_mouse / resolution) * 2.0 - 1.0;
  pointer.x *= resolution.x / resolution.y;

  vec2 advect = curl(st * 1.4 + time * 0.6);
  float base = fbm(st * 1.2 + advect * 0.3 + time);
  float detail = fbm(st * 3.0 - advect * 0.75 - time * 0.8);

  float field = mix(base, detail, 0.55);
  float ripple = 0.0;
  if (u_intensity > 0.0) {
    float dist = length(st - pointer);
    ripple = exp(-dist * 2.5) * sin(dist * 12.0 - time * 6.0);
  }

  float turbulence = field + ripple * u_intensity;
  turbulence = clamp(turbulence, 0.0, 1.0);
  float contrasted = pow(turbulence, max(0.2, u_contrast));

  vec3 deep = vec3(0.11, 0.16, 0.23);
  vec3 light = vec3(0.82, 0.88, 0.96);
  vec3 accent = vec3(0.24, 0.57, 0.96);

  vec3 color = mix(deep, light, contrasted);
  color += accent * 0.15 * (detail - 0.5);
  color = mix(color, accent, 0.1 + 0.2 * contrasted);
  color = applyHue(color, u_hue);

  float vignette = smoothstep(1.4, 0.2, length(st));
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
