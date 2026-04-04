/* =========================
   🌗 THEME TOGGLE
========================= */

const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  toggleBtn.textContent = "☀️";
} else {
  toggleBtn.textContent = "🌙";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    toggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});


/* =========================
   ⚙️ THREE JS HERO (UPDATED COLORS)
========================= */

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

  const geometry = new THREE.IcosahedronGeometry(3.2, 4);

  let wireMaterial = new THREE.LineBasicMaterial({
    color: 0xff7a18,
    transparent: true,
    opacity: 0.6
  });

  let pointsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08
  });

  const wireframe = new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    wireMaterial
  );

  const points = new THREE.Points(geometry, pointsMaterial);

  const group = new THREE.Group();
  group.add(wireframe);
  group.add(points);

  scene.add(group);

  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2);
    mouseY = (e.clientY - window.innerHeight / 2);
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    group.rotation.y += 0.003;
    group.rotation.x += 0.0015;

    targetX = mouseX * 0.0008;
    targetY = mouseY * 0.0008;

    group.rotation.y += (targetX - group.rotation.y) * 0.05;
    group.rotation.x += (targetY - group.rotation.x) * 0.05;

    const scale = 1 + Math.sin(time * 2) * 0.03;
    group.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

initThreeJS();

function scrollToAbout() {
  document.getElementById("about").scrollIntoView({
    behavior: "smooth"
  });
}