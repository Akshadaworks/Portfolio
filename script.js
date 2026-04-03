function initThreeJS() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 🔥 BIGGER + SMOOTHER SPHERE
  const geometry = new THREE.IcosahedronGeometry(3.2, 4);

  // 🔵 WIREFRAME (VISIBLE NOW)
  const wireMaterial = new THREE.LineBasicMaterial({
    color: 0x00f3ff,
    transparent: true,
    opacity: 0.6
  });

  const wireframe = new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    wireMaterial
  );

  // 🟣 DOTS (MORE VISIBLE)
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0x9d2eff,
    size: 0.08,
    transparent: true,
    opacity: 1
  });

  const points = new THREE.Points(geometry, pointsMaterial);

  // 🔥 GROUP
  const group = new THREE.Group();
  group.add(wireframe);
  group.add(points);

  // 👉 POSITION FIX (NOT TOO FAR)
  group.position.x = window.innerWidth > 768 ? 1.5 : 0;

  scene.add(group);

  // 🖱️ MOUSE INTERACTION
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  const halfX = window.innerWidth / 2;
  const halfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - halfX);
    mouseY = (e.clientY - halfY);
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // 🔄 BASE ROTATION
    group.rotation.y += 0.003;
    group.rotation.x += 0.0015;

    // 🧠 SMOOTH FOLLOW
    targetX = mouseX * 0.0008;
    targetY = mouseY * 0.0008;

    group.rotation.y += (targetX - group.rotation.y) * 0.05;
    group.rotation.x += (targetY - group.rotation.x) * 0.05;

    // 💓 BREATHING EFFECT
    const scale = 1 + Math.sin(time * 2) * 0.03;
    group.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
  }

  animate();

  // 📱 RESPONSIVE
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    group.position.x = window.innerWidth > 768 ? 1.5 : 0;
  });
}

// INIT
initThreeJS();