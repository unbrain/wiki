/**
 * glass-cube-three.js
 * Universal High-Performance 3D Glass Crystal Cubes (Three.js)
 * 100% Mobile & Desktop Compatible (iOS Safari, Android, WeChat, Chrome, Firefox)
 * Features: Outer Glass Shell + Glowing Neon Edges + Inner Floating Crystal Core + Touch Physics Momentum
 */
(function initThreeGlassCubes() {
  function start() {
    var hero = document.getElementById('ub-hero');
    if (!hero || typeof THREE === 'undefined') return;

    // Check if canvas already exists
    var existingCanvas = document.getElementById('ub-cubeCanvas');
    if (existingCanvas) existingCanvas.remove();

    var canvas = document.createElement('canvas');
    canvas.id = 'ub-cubeCanvas';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;';
    hero.appendChild(canvas);

    // ── Three.js Scene & Camera ────────────────────────────────────
    var scene = new THREE.Scene();
    var width = hero.offsetWidth || window.innerWidth;
    var height = hero.offsetHeight || window.innerHeight;
    var aspect = width / height;

    var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL initialization failed:', e);
      return;
    }

    var isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    // ── Studio Lighting System ─────────────────────────────────────
    var ambientLight = new THREE.AmbientLight(0x1a2634, 2.0);
    scene.add(ambientLight);

    var keyLight = new THREE.DirectionalLight(0xFEFAE0, 3.2);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    var rimLight = new THREE.DirectionalLight(0x43D9AD, 2.8);
    rimLight.position.set(-8, -4, 4);
    scene.add(rimLight);

    var fillLight = new THREE.PointLight(0x4D5BCE, 2.0, 15);
    fillLight.position.set(0, 0, 5);
    scene.add(fillLight);

    // ── Create Dual Layer Glass Crystal Cube ───────────────────────
    function createGlassCube(size, edgeColor, coreColor) {
      var group = new THREE.Group();

      // 1. Outer Translucent Glass Box
      var boxGeo = new THREE.BoxGeometry(size, size, size);
      var glassMat;
      try {
        glassMat = new THREE.MeshPhysicalMaterial({
          color: 0x0c1e28,
          transparent: true,
          opacity: 0.65,
          roughness: 0.05,
          metalness: 0.1,
          transmission: 0.85,
          ior: 1.52,
          reflectivity: 0.9,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          side: THREE.DoubleSide
        });
      } catch (e) {
        glassMat = new THREE.MeshPhongMaterial({
          color: 0x0c1e28,
          transparent: true,
          opacity: 0.55,
          shininess: 100,
          side: THREE.DoubleSide
        });
      }

      var glassMesh = new THREE.Mesh(boxGeo, glassMat);
      group.add(glassMesh);

      // 2. Glowing Wireframe Edge Lines
      var edgesGeo = new THREE.EdgesGeometry(boxGeo);
      var edgesMat = new THREE.LineBasicMaterial({
        color: edgeColor,
        linewidth: 2,
        transparent: true,
        opacity: 0.9
      });
      var edgesMesh = new THREE.LineSegments(edgesGeo, edgesMat);
      group.add(edgesMesh);

      // 3. Floating Inner Core Octahedron
      var coreGeo = new THREE.OctahedronGeometry(size * 0.42, 0);
      var coreMat = new THREE.MeshPhongMaterial({
        color: coreColor,
        emissive: coreColor,
        emissiveIntensity: 0.45,
        transparent: true,
        opacity: 0.8,
        shininess: 90
      });
      var coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // 4. Inner Wireframe
      var coreEdgesGeo = new THREE.EdgesGeometry(coreGeo);
      var coreEdgesMat = new THREE.LineBasicMaterial({
        color: 0xFEFAE0,
        transparent: true,
        opacity: 0.7
      });
      var coreEdges = new THREE.LineSegments(coreEdgesGeo, coreEdgesMat);
      coreMesh.add(coreEdges);

      return {
        group: group,
        core: coreMesh,
        rotSpeed: { x: 0.006, y: 0.010, z: 0.004 },
        coreSpeed: { x: -0.015, y: 0.020 }
      };
    }

    // Cube A (Top-Left): Emerald / Cyber Mint
    var cubeA = createGlassCube(1.5, 0x43D9AD, 0x4D5BCE);
    scene.add(cubeA.group);

    // Cube B (Bottom-Right): Amber / Gold Crystal
    var cubeB = createGlassCube(1.7, 0xFEA55F, 0x43D9AD);
    scene.add(cubeB.group);

    // ── Responsive Layout Positioning ──────────────────────────────
    function updatePositions() {
      var w = hero.offsetWidth || window.innerWidth;
      var h = hero.offsetHeight || window.innerHeight;
      var isPortrait = h > w;

      if (isPortrait) {
        // Mobile portrait: position neatly above title and below buttons
        cubeA.group.position.set(-1.35, 2.35, 0);
        cubeA.group.scale.set(0.72, 0.72, 0.72);

        cubeB.group.position.set(1.35, -2.45, 0);
        cubeB.group.scale.set(0.80, 0.80, 0.80);
      } else {
        // Desktop landscape: flanking hero content
        var spreadX = Math.min(w / 380, 3.4);
        cubeA.group.position.set(-spreadX, 1.3, 0);
        cubeA.group.scale.set(1.0, 1.0, 1.0);

        cubeB.group.position.set(spreadX * 1.05, -1.3, 0);
        cubeB.group.scale.set(1.1, 1.1, 1.1);
      }
    }
    updatePositions();

    // ── Interactive Touch & Pointer Physics Momentum ──────────────
    var isDragging = false;
    var lastPointer = { x: 0, y: 0 };
    var velocity = { x: 0, y: 0 };
    var parallax = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 };

    function onPointerDown(e) {
      isDragging = true;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      lastPointer.x = clientX;
      lastPointer.y = clientY;
      velocity.x = 0;
      velocity.y = 0;
    }

    function onPointerMove(e) {
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;

      var rect = hero.getBoundingClientRect();
      parallax.targetX = ((clientX - rect.left) / rect.width - 0.5) * 0.4;
      parallax.targetY = ((clientY - rect.top) / rect.height - 0.5) * 0.4;

      if (isDragging) {
        var dx = clientX - lastPointer.x;
        var dy = clientY - lastPointer.y;
        lastPointer.x = clientX;
        lastPointer.y = clientY;

        velocity.x = dx * 0.008;
        velocity.y = dy * 0.008;

        cubeA.group.rotation.y += velocity.x;
        cubeA.group.rotation.x += velocity.y;
        cubeB.group.rotation.y += velocity.x * 1.1;
        cubeB.group.rotation.x += velocity.y * 1.1;
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

    // ── Viewport Resize Handling ───────────────────────────────────
    function onResize() {
      if (!hero) return;
      var w = hero.offsetWidth || window.innerWidth;
      var h = hero.offsetHeight || window.innerHeight;
      if (w < 2 || h < 2) return;

      var mobile = window.innerWidth < 768;
      renderer.setPixelRatio(mobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      updatePositions();
    }
    window.addEventListener('resize', onResize);

    // ── Visibility & Battery Optimization ──────────────────────────
    var isHeroVisible = true;
    var isTabActive = true;

    document.addEventListener('visibilitychange', function() {
      isTabActive = document.visibilityState === 'visible';
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        isHeroVisible = entries[0].isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(hero);
    }

    // ── Render Animation Loop ──────────────────────────────────────
    var clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      // Save 100% CPU/GPU when hero is off-screen or tab hidden
      if (!isHeroVisible || !isTabActive) return;

      var delta = Math.min(clock.getDelta(), 0.05);

      // Inertia decay
      if (!isDragging) {
        velocity.x *= 0.94;
        velocity.y *= 0.94;
        cubeA.group.rotation.y += velocity.x;
        cubeA.group.rotation.x += velocity.y;
        cubeB.group.rotation.y += velocity.x;
        cubeB.group.rotation.x += velocity.y;
      }

      // Smooth parallax
      parallax.currentX += (parallax.targetX - parallax.currentX) * 0.08;
      parallax.currentY += (parallax.targetY - parallax.currentY) * 0.08;
      camera.position.x = parallax.currentX * 1.2;
      camera.position.y = -parallax.currentY * 1.2;
      camera.lookAt(0, 0, 0);

      // Continuous Idle Rotations
      cubeA.group.rotation.x += cubeA.rotSpeed.x;
      cubeA.group.rotation.y += cubeA.rotSpeed.y;
      cubeA.group.rotation.z += cubeA.rotSpeed.z;
      cubeA.core.rotation.x  += cubeA.coreSpeed.x;
      cubeA.core.rotation.y  += cubeA.coreSpeed.y;

      cubeB.group.rotation.x -= cubeB.rotSpeed.x * 0.9;
      cubeB.group.rotation.y -= cubeB.rotSpeed.y * 1.1;
      cubeB.group.rotation.z += cubeB.rotSpeed.z * 0.8;
      cubeB.core.rotation.x  += cubeB.coreSpeed.x;
      cubeB.core.rotation.y  += cubeB.coreSpeed.y;

      renderer.render(scene, camera);
    }

    animate();
  }

  // Auto-init on load or when Three.js is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
