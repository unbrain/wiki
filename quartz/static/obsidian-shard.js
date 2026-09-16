/**
 * obsidian-shard.js
 * Pure Asymmetrical Knapped Obsidian Shard (Inspired by Obsidian App Icon)
 * High-Performance Hardware Raymarching Shader with Balanced Studio Lighting & 360° Orbit
 * Ported from callmejesus (SacredCrossBackground.vue) for unbrain. Obsidian Vault Wiki
 */
(function initObsidianEngine() {
  var shardInstance = null;

  function loadThree(cb) {
    if (typeof THREE !== 'undefined') {
      cb();
      return;
    }
    var existing = document.querySelector('script[data-three-loader]');
    if (existing) {
      existing.addEventListener('load', cb);
      return;
    }
    var s = document.createElement('script');
    s.setAttribute('data-three-loader', 'true');
    s.src = '/static/three.min.js';
    s.async = true;
    s.onload = cb;
    s.onerror = function() {
      console.warn('[Obsidian] Local three.min.js failed to load, falling back to CDN');
      var cdn = document.createElement('script');
      cdn.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      cdn.async = true;
      cdn.onload = cb;
      document.head.appendChild(cdn);
    };
    document.head.appendChild(s);
  }

  function createShard(hero) {
    // 移除旧 canvas
    var oldCube = document.getElementById('ub-cubeCanvas');
    if (oldCube) oldCube.remove();
    var oldCanvas = document.getElementById('ub-obsidianCanvas');
    if (oldCanvas) oldCanvas.remove();

    var canvas = document.createElement('canvas');
    canvas.id = 'ub-obsidianCanvas';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;';
    hero.appendChild(canvas);

    var renderer = null;
    var scene = null;
    var camera = null;
    var quadMesh = null;
    var shaderMaterial = null;
    var rafId = null;

    var lastTime = performance.now();
    var elapsed = 0;
    var isRunning = false;
    var isHeroVisible = true;
    var isTabActive = !document.hidden;

    var pointer = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      orbitAngleTarget: 0,
      orbitAngleCurrent: 0
    };

    var isDragging = false;
    var dragStartX = 0;
    var dragStartOrbit = 0;

    var VERT_SHADER = [
      'varying vec2 vUv;',
      'void main() {',
      '  vUv = uv;',
      '  gl_Position = vec4(position, 1.0);',
      '}'
    ].join('\n');

    var FRAG_SHADER = [
      'precision highp float;',
      'varying vec2 vUv;',
      'uniform vec2 uResolution;',
      'uniform float uTime;',
      'uniform vec2 uPointer;',
      'uniform float uOrbitAngle;',

      // Analytic smooth-max operator
      'float smax(float a, float b, float k) {',
      '    float h = max(k - abs(a - b), 0.0);',
      '    return max(a, b) + h * h * 0.25 / k;',
      '}',

      'mat2 rot2D(float a) {',
      '    float c = cos(a), s = sin(a);',
      '    return mat2(c, -s, s, c);',
      '}',

      /**
       * Pure Asymmetrical Knapped Obsidian Shard (Inspired by Obsidian App Icon)
       * 100% Zero Noise, Zero Artificial Wireframes, Perfectly Centered
       */
      'float mapSDF(vec3 p) {',
      '    vec3 pos = p;',
      '    pos.x += 0.055;',
      '    pos.y -= 0.12;',
      '    pos.xz = rot2D(uOrbitAngle + sin(uTime * 0.22) * 0.03) * pos.xz;',
      '    pos.yz = rot2D(uPointer.y * 0.45 + cos(uTime * 0.28) * 0.025) * pos.yz;',
      '    const float SCALE = 0.92;',
      '    vec3 q = pos * SCALE;',
      '    float d1 = dot(q, vec3(-0.638, 0.736, 0.147)) - 0.55;',
      '    float d2 = dot(q, vec3(0.536, 0.779, 0.214)) - 0.62;',
      '    float d3 = dot(q, vec3(-0.395, 0.079, 0.899)) - 0.16;',
      '    float d4 = dot(q, vec3(0.613, -0.099, 0.761)) - 0.18;',
      '    float d5 = dot(q, vec3(-0.916, -0.318, 0.199)) - 0.32;',
      '    float d6 = dot(q, vec3(0.871, 0.119, -0.445)) - 0.34;',
      '    float d7 = dot(q, vec3(0.344, -0.904, 0.147)) - 0.68;',
      '    float d8 = dot(q, vec3(-0.584, -0.730, -0.243)) - 0.52;',
      '    float d9 = -q.z - 0.15;',
      '    float d10 = dot(q, vec3(0.348, 0.448, -0.816)) - 0.22;',
      '    const float BEVEL = 0.010;',
      '    float d = smax(d1, d2, BEVEL);',
      '    d = smax(d, d3, BEVEL);',
      '    d = smax(d, d4, BEVEL);',
      '    d = smax(d, d5, BEVEL);',
      '    d = smax(d, d6, BEVEL);',
      '    d = smax(d, d7, BEVEL);',
      '    d = smax(d, d8, BEVEL);',
      '    d = smax(d, d9, BEVEL);',
      '    d = smax(d, d10, BEVEL);',
      '    return d / SCALE;',
      '}',

      'vec3 calcNormal(vec3 p) {',
      '    const vec2 e = vec2(0.002, -0.002);',
      '    return normalize(',
      '        e.xyy * mapSDF(p + e.xyy) +',
      '        e.yyx * mapSDF(p + e.yyx) +',
      '        e.yxy * mapSDF(p + e.yxy) +',
      '        e.xxx * mapSDF(p + e.xxx)',
      '    );',
      '}',

      // Balanced Studio Environment
      'vec3 balancedStudioEnvironment(vec3 d) {',
      '    float base = 0.04 + 0.03 * max(d.y, 0.0);',
      '    float keyLight = smoothstep(0.20, 0.70, d.y) * smoothstep(0.95, 0.50, d.y) * 1.6;',
      '    float bilateralRim = smoothstep(0.40, 0.96, abs(d.x)) * 0.95;',
      '    vec3 goldTone = vec3(0.96, 0.82, 0.48);',
      '    return mix(vec3(base), goldTone * (keyLight + bilateralRim), 0.82);',
      '}',

      'void main() {',
      '    vec2 ndc = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;',
      '    vec3 ro = vec3(0.0, 0.0, 5.0);',
      '    vec3 rd = normalize(vec3(ndc, -2.4));',

      '    float breath = 0.5 + 0.5 * sin(uTime * 1.05);',
      '    float auraFalloff = 3.4 - 0.8 * breath;',
      '    float auraIntensity = 0.05 + 0.06 * breath;',

      '    float bgDist = length(ndc - vec2(0.0, 0.12));',
      '    float aura = exp(-bgDist * auraFalloff) * auraIntensity;',
      '    vec3 goldTone = vec3(0.92, 0.76, 0.40);',

      '    float t = 1.0;',
      '    float d = 0.0;',
      '    for (int i = 0; i < 64; i++) {',
      '        vec3 p = ro + rd * t;',
      '        d = mapSDF(p);',
      '        if (d < 0.0008 || t > 9.0) break;',
      '        t += d * 0.85;',
      '    }',

      '    if (d < 0.0008 && t <= 9.0) {',
      '        vec3 p = ro + rd * t;',
      '        vec3 n = calcNormal(p);',
      '        vec3 v = -rd;',

      '        // 1. 深渊黑曜石矿物基底',
      '        float facetLightL = max(0.0, dot(n, normalize(vec3(-0.6, 0.6, 0.5)))) * 0.065;',
      '        float facetLightR = max(0.0, dot(n, normalize(vec3(0.6, 0.6, 0.5)))) * 0.065;',
      '        float topLight = max(0.0, dot(n, normalize(vec3(0.0, 1.0, 0.2)))) * 0.085;',
      '        vec3 obsidianBase = vec3(0.045, 0.038, 0.032) + vec3(facetLightL + facetLightR + topLight) * vec3(1.0, 0.96, 0.88);',

      '        // 2. 左右对称均衡的物理菲涅尔暗金流光',
      '        float fresnel = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 3.0);',
      '        vec3 reflDir = reflect(rd, n);',
      '        vec3 envRefl = balancedStudioEnvironment(reflDir);',
      '        vec3 antiqueGold = vec3(0.96, 0.82, 0.45);',
      '        float edgeBreath = 0.85 + 0.25 * breath;',
      '        vec3 goldFresnel = antiqueGold * envRefl * (fresnel * 2.2 * edgeBreath + 0.08);',

      '        vec3 color = obsidianBase + goldFresnel;',
      '        gl_FragColor = vec4(color, 1.0);',
      '    } else {',
      '        gl_FragColor = vec4(goldTone * aura * 1.5, aura * 1.2);',
      '    }',
      '}'
    ].join('\n');

    function updateDrawingBufferSize() {
      if (!renderer || !shaderMaterial) return;
      var drawSize = new THREE.Vector2();
      renderer.getDrawingBufferSize(drawSize);
      shaderMaterial.uniforms.uResolution.value.copy(drawSize);
    }

    function initScene() {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      var geometry = new THREE.PlaneGeometry(2, 2);

      shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: VERT_SHADER,
        fragmentShader: FRAG_SHADER,
        uniforms: {
          uResolution: { value: new THREE.Vector2(hero.offsetWidth || window.innerWidth, hero.offsetHeight || window.innerHeight) },
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uOrbitAngle: { value: 0 }
        },
        depthWrite: false,
        depthTest: false
      });

      quadMesh = new THREE.Mesh(geometry, shaderMaterial);
      scene.add(quadMesh);

      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setClearColor(0x000000, 0);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(hero.offsetWidth || window.innerWidth, hero.offsetHeight || window.innerHeight);

      updateDrawingBufferSize();
    }

    function animate(now) {
      if (!isRunning) return;
      rafId = requestAnimationFrame(animate);

      if (!isHeroVisible || !isTabActive) return;

      var dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += dt;

      pointer.currentX += (pointer.targetX - pointer.currentX) * Math.min(dt * 3.5, 1);
      pointer.currentY += (pointer.targetY - pointer.currentY) * Math.min(dt * 3.5, 1);
      pointer.orbitAngleCurrent += (pointer.orbitAngleTarget - pointer.orbitAngleCurrent) * Math.min(dt * 4.0, 1);

      if (shaderMaterial) {
        shaderMaterial.uniforms.uTime.value = elapsed;
        shaderMaterial.uniforms.uPointer.value.set(pointer.currentX, pointer.currentY);
        shaderMaterial.uniforms.uOrbitAngle.value = pointer.orbitAngleCurrent;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    }

    function start() {
      if (isRunning) return;
      isRunning = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(animate);
    }

    function stop() {
      isRunning = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function isInteractive(target) {
      return !!(target && target.closest && target.closest('a, button, input, textarea, select, [role="button"], #ub-nav, #ub-nav-drawer'));
    }

    function onMouseMove(e) {
      var normX = (e.clientX / window.innerWidth) * 2 - 1;
      var normY = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.targetX = normX;
      pointer.targetY = normY;
      if (!isDragging) {
        pointer.orbitAngleTarget = normX * Math.PI;
      }
    }

    function onMouseDown(e) {
      if (isInteractive(e.target)) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartOrbit = pointer.orbitAngleCurrent;
    }

    function onMouseUp() {
      isDragging = false;
    }

    function onMouseDragMove(e) {
      if (!isDragging) return;
      var deltaX = e.clientX - dragStartX;
      var radDelta = (deltaX / window.innerWidth) * (Math.PI * 2);
      pointer.orbitAngleTarget = dragStartOrbit + radDelta;
    }

    function onTouchStart(e) {
      if (e.touches && e.touches[0]) {
        if (isInteractive(e.target)) return;
        isDragging = true;
        dragStartX = e.touches[0].clientX;
        dragStartOrbit = pointer.orbitAngleCurrent;
      }
    }

    function onTouchMove(e) {
      if (e.touches && e.touches[0]) {
        var clientX = e.touches[0].clientX;
        var clientY = e.touches[0].clientY;
        pointer.targetX = (clientX / window.innerWidth) * 2 - 1;
        pointer.targetY = -(clientY / window.innerHeight) * 2 + 1;

        if (isDragging) {
          var deltaX = clientX - dragStartX;
          var radDelta = (deltaX / window.innerWidth) * (Math.PI * 2);
          pointer.orbitAngleTarget = dragStartOrbit + radDelta;
        }
      }
    }

    function onTouchEnd() {
      isDragging = false;
    }

    function onResize() {
      if (!renderer || !shaderMaterial || !hero) return;
      var w = hero.offsetWidth || window.innerWidth;
      var h = hero.offsetHeight || window.innerHeight;
      renderer.setSize(w, h);
      updateDrawingBufferSize();
    }

    function onVisibilityChange() {
      isTabActive = !document.hidden;
      if (isTabActive && isHeroVisible) {
        start();
      } else {
        stop();
      }
    }

    var heroObs = null;
    if ('IntersectionObserver' in window && hero) {
      heroObs = new IntersectionObserver(function(entries) {
        isHeroVisible = entries[0].isIntersecting;
        if (isHeroVisible && isTabActive) {
          start();
        } else {
          stop();
        }
      }, { threshold: 0.05 });
      heroObs.observe(hero);
    }

    initScene();
    start();

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousemove', onMouseDragMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return {
      destroy: function() {
        stop();
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mousemove', onMouseDragMove);
        window.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);

        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);

        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibilityChange);

        if (heroObs) heroObs.disconnect();

        if (quadMesh && quadMesh.geometry) {
          quadMesh.geometry.dispose();
        }
        if (shaderMaterial) {
          shaderMaterial.dispose();
        }
        if (renderer) {
          renderer.dispose();
        }
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }

        renderer = null;
        scene = null;
        camera = null;
        quadMesh = null;
        shaderMaterial = null;
        canvas = null;
      }
    };
  }

  function init() {
    var hero = document.getElementById('ub-hero');
    if (!hero) {
      if (shardInstance) {
        shardInstance.destroy();
        shardInstance = null;
      }
      return;
    }
    if (shardInstance) {
      shardInstance.destroy();
      shardInstance = null;
    }
    loadThree(function() {
      if (typeof THREE === 'undefined') return;
      var currentHero = document.getElementById('ub-hero');
      if (!currentHero) return;
      shardInstance = createShard(currentHero);
    });
  }

  window.initObsidianShard = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('nav', init);

  if (typeof window.addCleanup === 'function') {
    window.addCleanup(function() {
      if (shardInstance) {
        shardInstance.destroy();
        shardInstance = null;
      }
    });
  }
})();
