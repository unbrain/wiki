/**
 * glass-cube.js  v4 — Physics Inertia + Raymarching Glass Cubes
 * Ported from glass-poster with SDF rounded box + chromatic dispersion + studioEnv
 * Includes smooth momentum damping & drag physics.
 */
(function initGlassCube() {

  var hero = document.getElementById('ub-hero');
  if (!hero) return;

  var canvas = document.createElement('canvas');
  canvas.id = 'ub-cubeCanvas';
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;';
  hero.appendChild(canvas);

  var gl = canvas.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: false });
  if (!gl) { canvas.remove(); return; }

  // ── Shaders ──────────────────────────────────────────────────────
  var VERT = '#version 300 es\nlayout(location=0) in vec2 aPos;\nvoid main(){ gl_Position = vec4(aPos, 0.0, 1.0); }';

  var FRAG = [
    '#version 300 es',
    'precision highp float;',

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
    'const float IOR     = 1.48;',

    'float sdRoundedBox(vec3 p, vec3 b, float r){',
    '  vec3 q = abs(p) - b + r;',
    '  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;',
    '}',

    'vec2 mapScene(vec3 p){',
    '  vec3 la = transpose(uRotA)*(p-uPosA);',
    '  float da = sdRoundedBox(la, uSizeA.xyz, uSizeA.w);',
    '  vec3 lb = transpose(uRotB)*(p-uPosB);',
    '  float db = sdRoundedBox(lb, uSizeB.xyz, uSizeB.w);',
    '  return da<db ? vec2(da,0.0) : vec2(db,1.0);',
    '}',

    'vec3 sceneNormal(vec3 p){',
    '  const vec2 e = vec2(0.0035,0.0);',
    '  return normalize(vec3(',
    '    mapScene(p+e.xyy).x - mapScene(p-e.xyy).x,',
    '    mapScene(p+e.yxy).x - mapScene(p-e.yxy).x,',
    '    mapScene(p+e.yyx).x - mapScene(p-e.yyx).x));',
    '}',

    'vec3 bgSample(vec3 ro, vec3 rd){',
    '  if(rd.z > -1e-4) return vec3(0.039);',
    '  float t = -ro.z / rd.z;',
    '  vec3 p = ro + rd*t;',
    '  float hw = PLANE_H * uRes.x/uRes.y;',
    '  vec2 uv = clamp(vec2(p.x/hw*0.5+0.5, p.y*0.5+0.5), vec2(0.002), vec2(0.998));',
    '  return texture(uTex, uv).rgb;',
    '}',

    'vec3 studioEnv(vec3 d){',
    '  float base  = 0.55 + 0.22*d.y;',
    '  float band1 = smoothstep(0.50,0.64,d.y)*smoothstep(0.92,0.74,d.y)*1.0;',
    '  float band2 = smoothstep(-0.12,0.02,d.y)*smoothstep(0.28,0.08,d.y)*0.45;',
    '  float side  = smoothstep(0.55,0.95,abs(d.x))*0.12;',
    '  return vec3((base+band1+band2+side)*0.88);',
    '}',

    'float boxExit(vec3 roL, vec3 rdL, vec3 b, out vec3 nL){',
    '  vec3 inv = 1.0/rdL;',
    '  vec3 t1 = (-b-roL)*inv;',
    '  vec3 t2 = ( b-roL)*inv;',
    '  vec3 tmax3 = max(t1,t2);',
    '  nL = vec3(0.0);',
    '  float tF = min(min(tmax3.x,tmax3.y),tmax3.z);',
    '  if(tF==tmax3.x) nL.x=sign(rdL.x);',
    '  else if(tF==tmax3.y) nL.y=sign(rdL.y);',
    '  else nL.z=sign(rdL.z);',
    '  return tF;',
    '}',

    'vec3 refractThrough(vec3 pos, vec3 rd, vec3 n, float ior, float id){',
    '  bool isA = id<0.5;',
    '  mat3 R  = isA ? uRotA : uRotB;',
    '  vec3 c  = isA ? uPosA : uPosB;',
    '  vec3 b  = (isA ? uSizeA : uSizeB).xyz;',
    '  mat3 Rt = transpose(R);',

    '  vec3 rdIn = refract(rd, n, 1.0/ior);',
    '  vec3 roL  = Rt*(pos-c);',
    '  vec3 rdL  = normalize(Rt*rdIn);',

    '  vec3 nL;',
    '  float tf   = boxExit(roL, rdL, b, nL);',
    '  vec3 pExit = c + R*(roL+rdL*tf);',
    '  vec3 nExit = normalize(R*nL);',

    '  vec3 rdOut = refract(rdIn, -nExit, ior);',
    '  if(dot(rdOut,rdOut)<1e-6){',
    '    rdOut = reflect(rdIn,-nExit);',
    '    vec3 rdL2 = normalize(Rt*rdOut);',
    '    vec3 roL2 = Rt*(pExit-c);',
    '    vec3 nL2;',
    '    float tf2 = boxExit(roL2,rdL2,b,nL2);',
    '    vec3 pE2  = c+R*(roL2+rdL2*tf2);',
    '    vec3 rdO2 = refract(rdOut,-normalize(R*nL2),ior);',
    '    if(dot(rdO2,rdO2)<1e-6) return bgSample(pE2,rdOut);',
    '    return bgSample(pE2,rdO2);',
    '  }',
    '  return bgSample(pExit,rdOut);',
    '}',

    'out vec4 fragColor;',

    'void main(){',
    '  vec2 ndc = (gl_FragCoord.xy*2.0-uRes)/uRes.y;',
    '  vec3 ro  = vec3(0.0,0.0,CAM_Z);',
    '  vec3 rd  = normalize(vec3(ndc,-CAM_Z));',

    '  float t=0.6; float hitId=-1.0; float closestPx=1e9;',
    '  float pixelWorld = 2.0/uRes.y;',
    '  for(int i=0;i<90;i++){',
    '    vec3 p = ro+rd*t;',
    '    vec2 h = mapScene(p);',
    '    closestPx = min(closestPx, abs(h.x)/(t*pixelWorld));',
    '    if(h.x<0.0015*t){ hitId=h.y; break; }',
    '    t+=h.x*0.95;',
    '    if(t>CAM_Z+1.5) break;',
    '  }',

    '  float alpha = 1.0-smoothstep(0.35,1.6,closestPx);',

    '  if(hitId >= 0.0){',
    '    vec3 pos = ro+rd*t;',
    '    vec3 n   = sceneNormal(pos);',
    '    if(dot(n,rd)>0.0) n=-n;',

    '    bool isA = hitId<0.5;',
    '    float disp = isA ? uDispA : uDispB;',
    '    float sp = 0.045*disp;',

    '    vec3 cR = refractThrough(pos,rd,n,IOR-sp,hitId);',
    '    vec3 cG = refractThrough(pos,rd,n,IOR,   hitId);',
    '    vec3 cB = refractThrough(pos,rd,n,IOR+sp,hitId);',
    '    vec3 refr = clamp((vec3(cR.r,cG.g,cB.b)-0.5)*1.15+0.5,0.0,1.0);',

    '    float fres = pow(1.0-clamp(dot(n,-rd),0.0,1.0),4.0);',
    '    vec3 reflCol = studioEnv(reflect(rd,n));',
    '    vec3 glass = mix(refr, reflCol, clamp(0.04+fres*0.55,0.0,1.0));',
    '    glass += vec3(0.97,0.98,0.88)*pow(fres,1.6)*0.32;',

    '    fragColor = vec4(glass, 1.0);',
    '  } else if(alpha > 0.01){',
    '    vec3 rimCol = studioEnv(reflect(rd, vec3(0.0, 1.0, 0.0)));',
    '    fragColor = vec4(rimCol, alpha * 0.4);',
    '  } else {',
    '    fragColor = vec4(0.0, 0.0, 0.0, 0.0);',
    '  }',
    '}',
  ].join('\n');

  function compile(type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(sh));
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
    canvas.remove(); return;
  }
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  var tex = gl.createTexture();
  var particleCanvas = document.getElementById('ub-particleCanvas');

  function updateTex() {
    if (!particleCanvas) return;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, particleCanvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  }
  gl.uniform1i(gl.getUniformLocation(prog, 'uTex'), 0);

  var U = {};
  ['uRes','uTime','uRotA','uPosA','uSizeA','uDispA','uRotB','uPosB','uSizeB','uDispB'].forEach(function(n) {
    U[n] = gl.getUniformLocation(prog, n);
  });

  var W, H;
  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.round(canvas.clientWidth  * dpr);
    var h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    W = canvas.width; H = canvas.height;
  }
  resize();
  window.addEventListener('resize', resize);

  function mat3Mul(a, b) {
    var o = new Float32Array(9);
    for (var c = 0; c < 3; c++)
      for (var r = 0; r < 3; r++) {
        var s = 0;
        for (var k = 0; k < 3; k++) s += a[k*3+r] * b[c*3+k];
        o[c*3+r] = s;
      }
    return o;
  }
  function rotX(a) { return new Float32Array([1,0,0, 0,Math.cos(a),Math.sin(a), 0,-Math.sin(a),Math.cos(a)]); }
  function rotY(a) { return new Float32Array([Math.cos(a),0,-Math.sin(a), 0,1,0, Math.sin(a),0,Math.cos(a)]); }
  function rotZ(a) { return new Float32Array([Math.cos(a),Math.sin(a),0, -Math.sin(a),Math.cos(a),0, 0,0,1]); }

  var cubes = [
    {
      position:    [-0.60,  0.42, 1.25],
      halfExtent:  0.15,
      rounding:    0.035,
      baseRotation:[0.42, 0.68, 0.06],
      spinSpeed:   0.14,
      swayAmount:  0.08,
      dispersion:  0.55,
      rotOffset:   [0, 0],
      vel:         [0, 0],
    },
    {
      position:    [ 0.62, -0.38, 1.15],
      halfExtent:  0.17,
      rounding:    0.038,
      baseRotation:[0.5,  2.35,  0.1],
      spinSpeed:  -0.10,
      swayAmount:  0.11,
      dispersion:  0.65,
      rotOffset:   [0, 0],
      vel:         [0, 0],
    },
  ];

  // ── Physics & Interaction ─────────────────────────────────────────
  var ptr = { tx:0, ty:0, x:0, y:0 };
  var isDragging = false;
  var lastX = 0, lastY = 0;

  hero.addEventListener('mousedown', function(e) {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });
  window.addEventListener('mouseup', function() { isDragging = false; });
  window.addEventListener('mousemove', function(e) {
    var r = canvas.getBoundingClientRect();
    ptr.tx = ((e.clientX-r.left)/r.width)*2 - 1;
    ptr.ty = ((e.clientY-r.top)/r.height)*2 - 1;

    if (isDragging) {
      var dx = e.clientX - lastX;
      var dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      cubes.forEach(function(c) {
        c.vel[0] = dx * 0.005;
        c.vel[1] = dy * 0.005;
        c.rotOffset[0] += c.vel[0];
        c.rotOffset[1] += c.vel[1];
      });
    }
  });

  // Touch
  hero.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      isDragging = true;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    }
  }, { passive: true });
  window.addEventListener('touchend', function() { isDragging = false; });
  window.addEventListener('touchmove', function(e) {
    if (isDragging && e.touches.length === 1) {
      var dx = e.touches[0].clientX - lastX;
      var dy = e.touches[0].clientY - lastY;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      cubes.forEach(function(c) {
        c.vel[0] = dx * 0.005;
        c.vel[1] = dy * 0.005;
        c.rotOffset[0] += c.vel[0];
        c.rotOffset[1] += c.vel[1];
      });
    }
  }, { passive: true });

  // ── Render loop ──────────────────────────────────────────────────
  var last = performance.now();
  var time = 0;
  var running = true;

  document.addEventListener('visibilitychange', function() {
    running = document.visibilityState === 'visible';
  });

  function frame(now) {
    requestAnimationFrame(frame);
    var dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!running) return;
    time += dt;

    resize();
    ptr.x += (ptr.tx - ptr.x) * Math.min(dt*5, 1);
    ptr.y += (ptr.ty - ptr.y) * Math.min(dt*5, 1);

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

      var sway = Math.sin(time*0.7 + i*2.1) * c.swayAmount;
      var ry = c.baseRotation[1] + time*c.spinSpeed + ptr.x*0.22 + c.rotOffset[0];
      var rx = c.baseRotation[0] + sway           + ptr.y*0.16 + c.rotOffset[1];
      var rz = c.baseRotation[2] + Math.sin(time*0.4+i)*0.05;
      var R  = mat3Mul(mat3Mul(rotZ(rz), rotX(rx)), rotY(ry));
      var prefix = i === 0 ? 'A' : 'B';
      gl.uniformMatrix3fv(U['uRot'+prefix], false, R);
      gl.uniform3f(U['uPos'+prefix], c.position[0], c.position[1], c.position[2]);
      gl.uniform4f(U['uSize'+prefix], c.halfExtent, c.halfExtent, c.halfExtent, c.rounding);
      gl.uniform1f(U['uDisp'+(i===0?'A':'B')], c.dispersion);
    });

    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform1f(U.uTime, time);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  requestAnimationFrame(frame);
})();
