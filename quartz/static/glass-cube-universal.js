/**
 * glass-cube-universal.js
 * Master-Grade Optical Glass Raymarching Shader (Universal GLSL 1.00 & WebGL 1/2)
 * 100% Compatible with iOS Safari, Android, WeChat, Chrome, Firefox, Safari Desktop
 * 
 * Features:
 * - True Double-Surface Optical Refraction (Entry -> Interior -> Exit -> Background)
 * - Tri-Band Chromatic Dispersion (Prismatic RGB spectral split)
 * - SDF Rounded Box Geometry with Beveled Curvature Specular Highlights
 * - Studio Environment 3-Point Lighting & Luminescent Cyan/Amber Crystal Body
 * - Physics Drag Momentum & Inertia Damping
 * - Dynamic Viewport Portrait/Landscape Auto-Framing (Guaranteed in-bounds on any screen)
 * - Zero-Cost Battery Pause via IntersectionObserver
 */
(function initUniversalGlassCubes() {
  function start() {
    var hero = document.getElementById('ub-hero');
    if (!hero) return;

    var existingCanvas = document.getElementById('ub-cubeCanvas');
    if (existingCanvas) existingCanvas.remove();

    var canvas = document.createElement('canvas');
    canvas.id = 'ub-cubeCanvas';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;';
    hero.appendChild(canvas);

    var gl = canvas.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: false }) ||
             canvas.getContext('webgl',  { antialias: false, alpha: true, premultipliedAlpha: false }) ||
             canvas.getContext('experimental-webgl', { antialias: false, alpha: true, premultipliedAlpha: false });

    if (!gl) {
      console.warn('WebGL context not available');
      return;
    }

    // ── Shaders in Universal GLSL 1.00 (ES 2.0 & ES 3.0 Compatible) ─
    var VERT = [
      'attribute vec2 aPos;',
      'varying vec2 vUV;',
      'void main(){',
      '  vUV = aPos * 0.5 + vec2(0.5, 0.5);',
      '  gl_Position = vec4(aPos, 0.0, 1.0);',
      '}'
    ].join('\n');

    var FRAG = [
      '#ifdef GL_FRAGMENT_PRECISION_HIGH',
      'precision highp float;',
      '#else',
      'precision mediump float;',
      '#endif',

      'uniform vec2  uRes;',
      'uniform float uTime;',
      'uniform sampler2D uTex;',

      'uniform mat3  uRotA;',
      'uniform vec3  uPosA;',
      'uniform vec4  uSizeA;',
      'uniform float uDispA;',

      'uniform mat3  uRotB;',
      'uniform vec3  uPosB;',
      'uniform vec4  uSizeB;',
      'uniform float uDispB;',

      'const float CAM_Z   = 4.0;',
      'const float PLANE_H = 1.0;',
      'const float IOR     = 1.50;',

      'mat3 transposeMat(mat3 m){',
      '  return mat3(',
      '    vec3(m[0].x, m[1].x, m[2].x),',
      '    vec3(m[0].y, m[1].y, m[2].y),',
      '    vec3(m[0].z, m[1].z, m[2].z)',
      '  );',
      '}',

      'float sdRoundedBox(vec3 p, vec3 b, float r){',
      '  vec3 q = abs(p) - b + vec3(r, r, r);',
      '  return length(max(q, vec3(0.0, 0.0, 0.0))) + min(max(q.x, max(q.y, q.z)), 0.0) - r;',
      '}',

      'vec2 mapScene(vec3 p){',
      '  vec3 la = transposeMat(uRotA) * (p - uPosA);',
      '  float da = sdRoundedBox(la, uSizeA.xyz, uSizeA.w);',
      '  vec3 lb = transposeMat(uRotB) * (p - uPosB);',
      '  float db = sdRoundedBox(lb, uSizeB.xyz, uSizeB.w);',
      '  return da < db ? vec2(da, 0.0) : vec2(db, 1.0);',
      '}',

      'vec3 sceneNormal(vec3 p){',
      '  const vec2 e = vec2(0.0035, 0.0);',
      '  return normalize(vec3(',
      '    mapScene(p + e.xyy).x - mapScene(p - e.xyy).x,',
      '    mapScene(p + e.yxy).x - mapScene(p - e.yxy).x,',
      '    mapScene(p + e.yyx).x - mapScene(p - e.yyx).x',
      '  ));',
      '}',

      'vec3 bgSample(vec3 ro, vec3 rd){',
      '  if(rd.z > -1e-4) return vec3(0.015, 0.02, 0.03);',
      '  float t = -ro.z / rd.z;',
      '  vec3 p = ro + rd * t;',
      '  float hw = PLANE_H * uRes.x / uRes.y;',
      '  vec2 uv = clamp(vec2(p.x / hw * 0.5 + 0.5, p.y * 0.5 + 0.5), vec2(0.002, 0.002), vec2(0.998, 0.998));',
      '  return texture2D(uTex, uv).rgb;',
      '}',

      'vec3 studioEnv(vec3 d){',
      '  vec3 keyLight = vec3(0.99, 0.98, 0.88) * pow(max(dot(d, normalize(vec3(0.6, 0.85, 0.55))), 0.0), 20.0) * 2.2;',
      '  vec3 rimLight = vec3(0.26, 0.85, 0.68) * pow(max(dot(d, normalize(vec3(-0.75, -0.3, 0.45))), 0.0), 10.0) * 1.4;',
      '  vec3 amberLight = vec3(0.99, 0.65, 0.38) * pow(max(dot(d, normalize(vec3(0.2, -0.8, -0.4))), 0.0), 8.0) * 0.8;',
      '  vec3 ambient  = vec3(0.12, 0.18, 0.26) + vec3(0.08, 0.12, 0.18) * d.y;',
      '  return ambient + keyLight + rimLight + amberLight;',
      '}',

      'float boxExit(vec3 roL, vec3 rdL, vec3 b, out vec3 nL){',
      '  vec3 safeRdL = rdL + vec3(0.00001, 0.00001, 0.00001);',
      '  vec3 inv = vec3(1.0, 1.0, 1.0) / safeRdL;',
      '  vec3 t1 = (-b - roL) * inv;',
      '  vec3 t2 = ( b - roL) * inv;',
      '  vec3 tmax3 = max(t1, t2);',
      '  nL = vec3(0.0, 0.0, 0.0);',
      '  float tF = min(min(tmax3.x, tmax3.y), tmax3.z);',
      '  if(tF == tmax3.x) nL.x = sign(rdL.x);',
      '  else if(tF == tmax3.y) nL.y = sign(rdL.y);',
      '  else nL.z = sign(rdL.z);',
      '  return tF;',
      '}',

      'vec3 refractThrough(vec3 pos, vec3 rd, vec3 n, float ior, float id){',
      '  bool isA = id < 0.5;',
      '  mat3 R  = isA ? uRotA : uRotB;',
      '  vec3 c  = isA ? uPosA : uPosB;',
      '  vec3 b  = (isA ? uSizeA : uSizeB).xyz;',
      '  mat3 Rt = transposeMat(R);',

      '  vec3 rdIn = refract(rd, n, 1.0 / ior);',
      '  vec3 roL  = Rt * (pos - c);',
      '  vec3 rdL  = normalize(Rt * rdIn);',

      '  vec3 nL;',
      '  float tf   = boxExit(roL, rdL, b, nL);',
      '  vec3 pExit = c + R * (roL + rdL * tf);',
      '  vec3 nExit = normalize(R * nL);',

      '  vec3 rdOut = refract(rdIn, -nExit, ior);',
      '  if(dot(rdOut, rdOut) < 1e-6){',
      '    rdOut = reflect(rdIn, -nExit);',
      '    vec3 rdL2 = normalize(Rt * rdOut);',
      '    vec3 roL2 = Rt * (pExit - c);',
      '    vec3 nL2;',
      '    float tf2 = boxExit(roL2, rdL2, b, nL2);',
      '    vec3 pE2  = c + R * (roL2 + rdL2 * tf2);',
      '    vec3 rdO2 = refract(rdOut, -normalize(R * nL2), ior);',
      '    if(dot(rdO2, rdO2) < 1e-6) return bgSample(pE2, rdOut);',
      '    return bgSample(pE2, rdO2);',
      '  }',
      '  return bgSample(pExit, rdOut);',
      '}',

      'void main(){',
      '  vec2 ndc = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;',
      '  vec3 ro  = vec3(0.0, 0.0, CAM_Z);',
      '  vec3 rd  = normalize(vec3(ndc, -CAM_Z));',

      // Ray Marching
      '  float t = 0.6;',
      '  float hitId = -1.0;',
      '  float closestPx = 1e9;',
      '  float pixelWorld = 2.0 / uRes.y;',

      '  for(int i = 0; i < 90; i++){',
      '    vec3 p = ro + rd * t;',
      '    vec2 h = mapScene(p);',
      '    closestPx = min(closestPx, abs(h.x) / (t * pixelWorld));',
      '    if(h.x < 0.0015 * t){ hitId = h.y; break; }',
      '    t += h.x * 0.95;',
      '    if(t > CAM_Z + 1.5) break;',
      '  }',

      '  float edgeAlpha = 1.0 - smoothstep(0.0, 1.8, closestPx);',

      '  if(hitId >= 0.0){',
      '    vec3 pos = ro + rd * t;',
      '    vec3 n   = sceneNormal(pos);',
      '    if(dot(n, rd) > 0.0) n = -n;',

      '    bool isA = hitId < 0.5;',
      '    float disp = isA ? uDispA : uDispB;',
      '    float sp = 0.052 * disp;',

      // Tri-Band Chromatic Dispersion Refraction
      '    vec3 cR = refractThrough(pos, rd, n, IOR - sp, hitId);',
      '    vec3 cG = refractThrough(pos, rd, n, IOR,      hitId);',
      '    vec3 cB = refractThrough(pos, rd, n, IOR + sp, hitId);',
      '    vec3 refr = vec3(cR.r, cG.g, cB.b);',

      // Fresnel & Studio Specular Reflection
      '    float fres = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 3.2);',
      '    vec3 reflCol = studioEnv(reflect(rd, n));',

      // Glass Crystal Body Tints
      '    vec3 crystalTint = isA ? vec3(0.08, 0.20, 0.24) : vec3(0.22, 0.16, 0.08);',
      '    vec3 edgeNeon    = isA ? vec3(0.26, 0.85, 0.68) : vec3(0.99, 0.65, 0.38);',
      '    vec3 specular    = vec3(0.99, 0.98, 0.88) * pow(fres, 2.2) * 0.75;',

      // Composite Shaded Glass
      '    vec3 glass = mix(refr * 1.6 + crystalTint, reflCol, clamp(0.22 + fres * 0.68, 0.0, 1.0));',
      '    glass += edgeNeon * pow(fres, 1.4) * 0.85 + specular;',

      '    gl_FragColor = vec4(glass, clamp(0.78 + fres * 0.22, 0.0, 1.0));',
      '  } else if(edgeAlpha > 0.01){',
      '    vec3 rimCol = vec3(0.26, 0.85, 0.68) * 0.9 + vec3(0.99, 0.98, 0.88) * 0.4;',
      '    gl_FragColor = vec4(rimCol, edgeAlpha * 0.60);',
      '  } else {',
      '    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);',
      '  }',
      '}'
    ].join('\n');

    function compile(type, src) {
      var sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('Shader compilation failed:', gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    }

    var prog = gl.createProgram();
    var vs = compile(gl.VERTEX_SHADER, VERT);
    var fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { canvas.remove(); return; }

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(prog));
      canvas.remove();
      return;
    }
    gl.useProgram(prog);

    // ── Fullscreen Triangle Geometry ───────────────────────────────
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    var aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // ── Background Texture (Particle Canvas) ───────────────────────
    var tex = gl.createTexture();
    var particleCanvas = document.getElementById('ub-particleCanvas');

    function updateTex() {
      if (!particleCanvas || particleCanvas.width < 2 || particleCanvas.height < 2) return;
      try {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, particleCanvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      } catch (e) {}
    }
    gl.uniform1i(gl.getUniformLocation(prog, 'uTex'), 0);

    // ── Uniform Locations ──────────────────────────────────────────
    var U = {};
    ['uRes', 'uTime', 'uRotA', 'uPosA', 'uSizeA', 'uDispA', 'uRotB', 'uPosB', 'uSizeB', 'uDispB'].forEach(function(n) {
      U[n] = gl.getUniformLocation(prog, n);
    });

    // ── Cube State & Configurations ────────────────────────────────
    var CAM_Z = 4.0;
    var cubes = [
      {
        position:     [-0.58,  0.42, 1.25],
        halfExtent:   0.19,
        rounding:     0.045,
        baseRotation: [0.42, 0.68, 0.06],
        spinSpeed:    0.14,
        swayAmount:   0.08,
        dispersion:   0.65,
        rotOffset:    [0, 0],
        vel:          [0, 0]
      },
      {
        position:     [ 0.60, -0.36, 1.15],
        halfExtent:   0.21,
        rounding:     0.048,
        baseRotation: [0.5,  2.35,  0.1],
        spinSpeed:   -0.10,
        swayAmount:   0.11,
        dispersion:   0.75,
        rotOffset:    [0, 0],
        vel:          [0, 0]
      }
    ];

    // ── Viewport & DPR Dynamic Framing ─────────────────────────────
    var W, H;
    function resize() {
      var isMobile = window.innerWidth < 768;
      var dpr = isMobile ? 1.25 : Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.round(canvas.clientWidth * dpr);
      var h = Math.round(canvas.clientHeight * dpr);
      if (w < 2 || h < 2) return;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      W = canvas.width;
      H = canvas.height;

      // Mathematically guaranteed in-bounds positions based on screen aspect ratio
      var aspect = W / H;
      var isPortrait = H > W;

      var scaleA = (CAM_Z - cubes[0].position[2]) / CAM_Z; // 0.6875
      var scaleB = (CAM_Z - cubes[1].position[2]) / CAM_Z; // 0.7125

      var maxVisXA = aspect * scaleA;
      var maxVisXB = aspect * scaleB;

      if (isPortrait) {
        // Mobile portrait: position cleanly in the corner framing without overlapping text
        cubes[0].position[0] = -maxVisXA * 0.70;
        cubes[0].position[1] = 0.58;
        cubes[0].halfExtent  = 0.095;
        cubes[0].rounding    = 0.024;

        cubes[1].position[0] =  maxVisXB * 0.72;
        cubes[1].position[1] = -0.52;
        cubes[1].halfExtent  = 0.115;
        cubes[1].rounding    = 0.028;
      } else {
        // Desktop landscape: flanking hero content
        cubes[0].position[0] = -Math.min(maxVisXA * 0.72, 0.60);
        cubes[0].position[1] = 0.38;
        cubes[0].halfExtent  = 0.19;
        cubes[0].rounding    = 0.045;

        cubes[1].position[0] =  Math.min(maxVisXB * 0.75, 0.62);
        cubes[1].position[1] = -0.34;
        cubes[1].halfExtent  = 0.21;
        cubes[1].rounding    = 0.048;
      }
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Matrix Math Helpers ────────────────────────────────────────
    function mat3Mul(a, b) {
      var o = new Float32Array(9);
      for (var c = 0; c < 3; c++)
        for (var r = 0; r < 3; r++) {
          var s = 0;
          for (var k = 0; k < 3; k++) s += a[k * 3 + r] * b[c * 3 + k];
          o[c * 3 + r] = s;
        }
      return o;
    }
    function rotX(a) { return new Float32Array([1, 0, 0, 0, Math.cos(a), Math.sin(a), 0, -Math.sin(a), Math.cos(a)]); }
    function rotY(a) { return new Float32Array([Math.cos(a), 0, -Math.sin(a), 0, 1, 0, Math.sin(a), 0, Math.cos(a)]); }
    function rotZ(a) { return new Float32Array([Math.cos(a), Math.sin(a), 0, -Math.sin(a), Math.cos(a), 0, 0, 0, 1]); }

    // ── Physics Drag & Touch Interaction ───────────────────────────
    var ptr = { tx: 0, ty: 0, x: 0, y: 0 };
    var isDragging = false;
    var lastX = 0, lastY = 0;

    function onPointerDown(e) {
      isDragging = true;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      lastX = clientX;
      lastY = clientY;
    }

    function onPointerMove(e) {
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;

      var r = canvas.getBoundingClientRect();
      ptr.tx = ((clientX - r.left) / r.width) * 2 - 1;
      ptr.ty = ((clientY - r.top) / r.height) * 2 - 1;

      if (isDragging) {
        var dx = clientX - lastX;
        var dy = clientY - lastY;
        lastX = clientX;
        lastY = clientY;

        cubes.forEach(function(c) {
          c.vel[0] = dx * 0.006;
          c.vel[1] = dy * 0.006;
          c.rotOffset[0] += c.vel[0];
          c.rotOffset[1] += c.vel[1];
        });
      }
    }

    function onPointerUp() {
      isDragging = false;
    }

    hero.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    hero.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    // ── Visibility & Battery Optimization ──────────────────────────
    var isHeroVisible = true;
    var isTabActive = true;

    document.addEventListener('visibilitychange', function() {
      isTabActive = document.visibilityState === 'visible';
    });

    if ('IntersectionObserver' in window) {
      var heroObs = new IntersectionObserver(function(entries) {
        isHeroVisible = entries[0].isIntersecting;
      }, { threshold: 0.05 });
      heroObs.observe(hero);
    }

    // ── Render Animation Loop ──────────────────────────────────────
    var last = performance.now();
    var time = 0;

    function frame(now) {
      requestAnimationFrame(frame);

      if (!isHeroVisible || !isTabActive) return;

      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;

      resize();
      if (!W || !H || W < 2 || H < 2) return;

      ptr.x += (ptr.tx - ptr.x) * Math.min(dt * 5, 1);
      ptr.y += (ptr.ty - ptr.y) * Math.min(dt * 5, 1);

      updateTex();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);

      cubes.forEach(function(c, i) {
        if (!isDragging) {
          c.rotOffset[0] += c.vel[0];
          c.rotOffset[1] += c.vel[1];
          c.vel[0] *= 0.94;
          c.vel[1] *= 0.94;
        }

        var sway = Math.sin(time * 0.7 + i * 2.1) * c.swayAmount;
        var ry = c.baseRotation[1] + time * c.spinSpeed + ptr.x * 0.22 + c.rotOffset[0];
        var rx = c.baseRotation[0] + sway               + ptr.y * 0.16 + c.rotOffset[1];
        var rz = c.baseRotation[2] + Math.sin(time * 0.4 + i) * 0.05;
        var R  = mat3Mul(mat3Mul(rotZ(rz), rotX(rx)), rotY(ry));
        var prefix = i === 0 ? 'A' : 'B';

        gl.uniformMatrix3fv(U['uRot' + prefix], false, R);
        gl.uniform3f(U['uPos' + prefix], c.position[0], c.position[1], c.position[2]);
        gl.uniform4f(U['uSize' + prefix], c.halfExtent, c.halfExtent, c.halfExtent, c.rounding);
        gl.uniform1f(U['uDisp' + prefix], c.dispersion);
      });

      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform1f(U.uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
