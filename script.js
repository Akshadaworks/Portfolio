/* =========================
   THEME TOGGLE
========================= */
const toggleBtn = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  toggleBtn.textContent = "☀️";
} else {
  toggleBtn.textContent = "🌙";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  toggleBtn.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

/* =========================
   MOBILE DRAWER
========================= */
const hamburger = document.getElementById("hamburger");
const drawer = document.getElementById("mobile-drawer");

hamburger.addEventListener("click", () => {
  drawer.classList.toggle("open");
});

function closeDrawer() {
  drawer.classList.remove("open");
}

document.addEventListener("click", (e) => {
  if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
    drawer.classList.remove("open");
  }
});

/* =========================
   SCROLL REVEAL
========================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Staggered children
const childObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll(".reveal-child");
      siblings.forEach((child, i) => {
        setTimeout(() => {
          child.classList.add("visible");
        }, i * 100);
      });
    }
  });
}, { threshold: 0.1 });

// Observe parent sections that contain reveal-children
document.querySelectorAll(".section").forEach(section => {
  const children = section.querySelectorAll(".reveal-child");
  if (children.length > 0) childObserver.observe(section);
});

/* =========================
   NAVBAR SCROLL EFFECT
========================= */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 40) {
    navbar.style.borderBottomColor = "var(--border)";
  } else {
    navbar.style.borderBottomColor = "transparent";
  }
});

/* =========================
   THREE.JS HERO
========================= */
function initThreeJS() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Main icosahedron
  const geometry = new THREE.IcosahedronGeometry(3.0, 4);

  const wireMaterial = new THREE.LineBasicMaterial({
    color: 0xc96a1a,
    transparent: true,
    opacity: 0.45
  });

  const pointsMaterial = new THREE.PointsMaterial({
    color: 0xe8823a,
    size: 0.055,
    transparent: true,
    opacity: 0.7
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

  // Small orbiting ring
  const ringGeo = new THREE.TorusGeometry(4.5, 0.015, 8, 80);
  const ringMat = new THREE.LineBasicMaterial({
    color: 0xc96a1a,
    transparent: true,
    opacity: 0.2
  });
  const ring = new THREE.Line(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  scene.add(ring);

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0007;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0007;
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    group.rotation.y += 0.002;
    group.rotation.x += 0.001;

    group.rotation.y += (mouseX - group.rotation.y) * 0.04;
    group.rotation.x += (mouseY - group.rotation.x) * 0.04;

    const scale = 1 + Math.sin(time * 1.5) * 0.025;
    group.scale.set(scale, scale, scale);

    ring.rotation.z += 0.003;

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

/* =========================
   STACKED EXPERIENCE CARDS
========================= */
(function () {
  const cards = Array.from(document.querySelectorAll('.exp-card'));
  if (!cards.length) return;

  const NAVBAR_H = 80;
  const CARD_PEEK = 12;

  function updateCards() {
    cards.forEach((card, i) => {
      const stickyTop = NAVBAR_H + i * CARD_PEEK;
      const nextCard = cards[i + 1];

      // Card is covered when the NEXT card has slid over it
      const isCovered = nextCard
        ? nextCard.getBoundingClientRect().top < stickyTop + 80
        : false;

      card.classList.toggle('is-covered', isCovered);

      if (isCovered) {
        // How many cards are now on top of this one
        const depth = cards.slice(i + 1).filter(c =>
          c.getBoundingClientRect().top < stickyTop + 80
        ).length;

        const scale = Math.max(0.93, 1 - depth * 0.018);
        card.style.transform = `scale(${scale})`;
        card.style.transformOrigin = 'top center';
      } else {
        card.style.transform = '';
        card.style.transformOrigin = '';
      }
    });
  }

  window.addEventListener('scroll', updateCards, { passive: true });
  window.addEventListener('resize', updateCards, { passive: true });
  updateCards();
})();

/* =========================
   HELPERS
========================= */
function scrollToAbout() {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
}

function downloadResume() {
  const a = document.createElement("a");
  a.href = "Resume.pdf";
  a.download = "Akshada_Bandarkar_Resume.pdf";
  a.click();
}