function downloadResume() {
  window.open("resume.pdf", "_blank");
}

// SPHERE ANIMATION
function initSphere() {
  const canvas = document.getElementById("hero-canvas");

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
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 🔷 GEOMETRY
  const geometry = new THREE.IcosahedronGeometry(3.2, 3);

  // 🔵 WIREFRAME
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f5ff,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });

  const wireSphere = new THREE.Mesh(geometry, wireMaterial);

  // 🟣 DOTS (VERTEX POINTS)
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0x7c3aed,
    size: 0.05,
    transparent: true,
    opacity: 0.9,
  });

  const points = new THREE.Points(geometry, pointsMaterial);

  // 🔥 GROUP (IMPORTANT)
  const group = new THREE.Group();
  group.add(wireSphere);
  group.add(points);

  // POSITION RIGHT
  group.position.x = window.innerWidth > 768 ? 2.5 : 0;

  scene.add(group);

  // 🖱️ MOUSE INTERACTION
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // 🔄 ROTATION
    group.rotation.y += 0.003;
    group.rotation.x += 0.0015;

    // 🧠 SMOOTH FOLLOW
    group.rotation.y += (mouseX - group.rotation.y) * 0.02;
    group.rotation.x += (mouseY - group.rotation.x) * 0.02;

    // 💓 BREATHING EFFECT
    const scale = 1 + Math.sin(time * 2) * 0.03;
    group.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
  }

  animate();

  // 📱 RESPONSIVE
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    group.position.x = window.innerWidth > 768 ? 2.5 : 0;
  });
}

initSphere();