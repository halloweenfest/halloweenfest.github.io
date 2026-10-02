import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";

const canvas = document.getElementById("c");
const hud = document.getElementById("hud");
const modeEl = document.getElementById("mode");
const help = document.getElementById("help");
const speedBtn = document.getElementById("goSpeed");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(1.6, window.devicePixelRatio || 1));
renderer.setClearColor(0x141c2c);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x243044, 28, 160);
const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 280);

scene.add(new THREE.HemisphereLight(0x9aabc8, 0x1a1814, 0.7));
const moonLight = new THREE.DirectionalLight(0xd5def0, 0.85);
moonLight.position.set(-20, 40, 30);
scene.add(moonLight);
const moon = new THREE.Mesh(new THREE.SphereGeometry(3.4, 16, 12), new THREE.MeshBasicMaterial({ color: 0xe7e0cc }));
scene.add(moon);

const stone = new THREE.MeshStandardMaterial({ color: 0x6e655c, roughness: 0.92 });
const rock = new THREE.MeshStandardMaterial({ color: 0x3a4038, roughness: 1 });
const pine = new THREE.MeshStandardMaterial({ color: 0x1c2a22, roughness: 1 });
const roofM = new THREE.MeshStandardMaterial({ color: 0x3d1824, roughness: 0.7 });
const wood = new THREE.MeshStandardMaterial({ color: 0x6a4120, roughness: 0.62 });
const waterM = new THREE.MeshStandardMaterial({ color: 0x10283c, metalness: 0.55, roughness: 0.18 });
const glow = new THREE.MeshBasicMaterial({ color: 0xffc56b });
const gold = new THREE.MeshStandardMaterial({ color: 0xffe7a4, emissive: 0xffc24a, emissiveIntensity: 1.8, metalness: 0.65, roughness: 0.22 });
const goldSoft = new THREE.MeshBasicMaterial({ color: 0xffe29a, transparent: true, opacity: 0.35 });
const maroon = new THREE.MeshStandardMaterial({ color: 0x7a2432, roughness: 0.7 });
const black = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.55 });
const brown = new THREE.MeshStandardMaterial({ color: 0x6a3a28, roughness: 0.8 });
const skin = new THREE.MeshStandardMaterial({ color: 0xf0c8a8, roughness: 0.6 });

const winGeo = new THREE.PlaneGeometry(0.85, 1.35);
const towerGeo = new THREE.CylinderGeometry(1.35, 1.6, 1, 7);
const roofGeo = new THREE.ConeGeometry(1.9, 2.8, 7);

function addWindows(parent, x, y, z, cols, rows, facing) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const w = new THREE.Mesh(winGeo, glow);
      w.position.set(x + (c - (cols - 1) / 2) * 1.15, y + r * 1.7, z);
      if (facing === "x") w.rotation.y = Math.PI / 2;
      parent.add(w);
    }
  }
}
function pineTree(x, z, s) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 1.2, 5), wood);
  const top = new THREE.Mesh(new THREE.ConeGeometry(0.7 * s, 2.4 * s, 6), pine);
  top.position.y = 1.4 * s;
  g.add(trunk, top);
  g.position.set(x, -1.6, z);
  return g;
}
function buildLandmark(z) {
  const g = new THREE.Group();
  g.position.z = z;
  const cliff = new THREE.Mesh(new THREE.CylinderGeometry(10, 16, 14, 7), rock);
  cliff.position.set(7, -4, -6);
  g.add(cliff);
  const hall = new THREE.Mesh(new THREE.BoxGeometry(16, 9, 8), stone);
  hall.position.set(6, 6.5, -8);
  g.add(hall);
  addWindows(g, 6, 4.2, -3.9, 6, 3, "z");
  const heights = [16, 22, 13, 19, 15];
  heights.forEach((h, i) => {
    const x = 1 + i * 3.1;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.35, h, 8), stone);
    body.position.set(x, h / 2 + 2, -10);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(1.7, 4.2, 8), roofM);
    cap.position.set(x, h + 4, -10);
    g.add(body, cap);
    for (let k = 0; k < 4; k++) {
      const w = new THREE.Mesh(winGeo, glow);
      w.position.set(x, 3 + k * (h / 5), -8.6);
      g.add(w);
    }
  });
  for (let i = 0; i < 7; i++) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(1.1, 8, 1.1), stone);
    pillar.position.set(-8 + i * 2.6, 2.2, 6);
    const arch = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.28, 6, 10, Math.PI), stone);
    arch.rotation.z = Math.PI;
    arch.position.set(-6.7 + i * 2.6, 5.4, 6);
    g.add(pillar);
    if (i < 6) g.add(arch);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), glow);
    lamp.position.set(-8 + i * 2.6, 5.8, 6.6);
    g.add(lamp);
  }
  for (let i = 0; i < 5; i++) g.add(pineTree(-12 + i * 2.2, 2, 1 + (i % 2) * 0.4));
  g.add(pineTree(14, 0, 1.3));
  return g;
}
const lake = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), waterM);
lake.rotation.x = -Math.PI / 2;
lake.position.y = -2.4;
scene.add(lake);
const ridges = new THREE.Group();
for (let i = 0; i < 9; i++) {
  const m = new THREE.Mesh(new THREE.ConeGeometry(8 + (i % 3) * 4, 18 + (i % 4) * 6, 5), rock);
  m.position.set(-40 + i * 12, 4, -30);
  ridges.add(m);
}
scene.add(ridges);
const landmarks = [];
let nextLandmarkZ = -70;
for (let i = 0; i < 3; i++) {
  const c = buildLandmark(nextLandmarkZ);
  landmarks.push(c);
  scene.add(c);
  nextLandmarkZ -= 150;
}
function recycleLandmarks() {
  for (const c of landmarks) {
    if (c.position.z > emma.position.z + 30) {
      c.position.z = nextLandmarkZ;
      nextLandmarkZ -= 150;
    }
  }
}

const ringGeo = new THREE.TorusGeometry(2.25, 0.075, 8, 32);
const ringGlowGeo = new THREE.TorusGeometry(2.5, 0.02, 6, 28);
const rings = [];
let nextRingZ = -16;
function placeRing(r, z) {
  r.position.set(Math.sin(z * 0.042) * 3.3, 2.2 + Math.sin(z * 0.03) * 0.85, z);
  r.userData.taken = false;
  r.scale.setScalar(1);
}
function makeRing(z) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(ringGeo, gold));
  g.add(new THREE.Mesh(ringGlowGeo, goldSoft));
  placeRing(g, z);
  return g;
}
for (let i = 0; i < 14; i++) {
  const r = makeRing(nextRingZ);
  rings.push(r);
  scene.add(r);
  nextRingZ -= 22;
}
function recycleRings() {
  for (const r of rings) {
    if (r.position.z > emma.position.z + 6) {
      placeRing(r, nextRingZ);
      nextRingZ -= 22;
    }
  }
}

function buildEmma() {
  const g = new THREE.Group();
  const cloak = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.25, 8), maroon);
  cloak.position.y = 0.42;
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.5, 8), maroon);
  torso.position.y = 0.82;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), skin);
  head.position.y = 1.2;
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), brown);
  hair.scale.set(0.95, 1.35, 1.15);
  hair.position.set(0, 1.22, -0.05);
  const hat = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.62, 8), black);
  hat.position.y = 1.62;
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.035, 12), black);
  brim.position.y = 1.34;
  const broom = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 2.1, 6), wood);
  shaft.rotation.x = Math.PI / 2;
  const bristle = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.85, 7), new THREE.MeshStandardMaterial({ color: 0x8a642c }));
  bristle.rotation.x = -Math.PI / 2;
  bristle.position.z = 1.25;
  broom.add(shaft, bristle);
  broom.position.y = 0.15;
  const cape = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 1.15), maroon);
  cape.position.set(0, 0.72, 0.28);
  cape.rotation.x = 0.45;
  const wand = new THREE.Group();
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.028, 0.7, 6), wood);
  stick.rotation.z = -0.8;
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), new THREE.MeshBasicMaterial({ color: 0xeaf6ff }));
  tip.position.set(0.28, 0.22, 0);
  const tipLight = new THREE.PointLight(0xb7dcff, 0.4, 3);
  tipLight.position.copy(tip.position);
  wand.add(stick, tip, tipLight);
  wand.position.set(0.28, 0.78, 0.15);
  g.add(cloak, torso, hair, head, brim, hat, broom, wand, cape);
  g.userData.wand = wand;
  g.userData.tip = tip;
  g.userData.tipLight = tipLight;
  g.userData.cape = cape;
  return g;
}

const emma = buildEmma();
const lamp = new THREE.PointLight(0xffb060, 18, 36, 2);
lamp.position.set(0, 1.2, -1);
emma.add(lamp);
emma.position.set(0, 2.1, 6);
scene.add(emma);

const boltMat = new THREE.LineBasicMaterial({ color: 0xf7fbff });
const flash = new THREE.Line(new THREE.BufferGeometry(), boltMat);
flash.visible = false;
scene.add(flash);

const keys = {};
let boost = false, brake = false, shootHeld = false;
let aimX = 0, aimY = 2.1;
let lives = 3, score = 0, level = 1, dist = 0, goal = 4200, elapsed = 0, ringsHit = 0;
let speed = 14, mode = "fly", hold = true, over = false;
let shootCd = 0, spawnIn = 1, boltCd = 1, t = 0, inv = 0, recoil = 0, flashLife = 0;
const foes = [];
const orbs = [];
let boss = null;

const KINDS = ["ghost", "bat", "wolf", "skeleton"];

function track(name, props) {
  if (window.posthog) posthog.capture(name, props || {});
}
function rememberPayment(id) {
  if (!id || !/^pay_[A-Za-z0-9]+$/.test(id)) return false;
  localStorage.setItem("hollyHaunt.paid", "1");
  localStorage.setItem("hollyHaunt.paymentId", id);
  track("payment_returned", { has_payment_id: true, source: "emma" });
  if (window.posthog) posthog.setPersonProperties({ hollyhaunt_paid: true, site: "halloweenfest" });
  return true;
}
(function () {
  const q = new URLSearchParams(location.search);
  if (rememberPayment(q.get("razorpay_payment_id"))) history.replaceState({}, "", location.pathname);
})();
function paidNow() { return localStorage.getItem("hollyHaunt.paid") === "1"; }
function paintNights() {
  const open = paidNow();
  ["night2", "night3"].forEach((id) => {
    const b = document.getElementById(id);
    b.classList.toggle("lock", !open);
    b.querySelector(".tag").textContent = open ? "OPEN" : "LOCKED · PAY";
  });
}
function showLevels(line) {
  hold = true;
  paintNights();
  if (line) document.getElementById("levelLine").textContent = line;
  document.getElementById("pay").classList.remove("on");
  document.getElementById("over").classList.remove("on");
  document.getElementById("levels").classList.add("on");
}
function showPay(n) {
  hold = true;
  document.getElementById("payLine").textContent = "Night " + n + " is locked. Night 1 stays free. Pay $1 and both later nights open on this phone.";
  document.getElementById("levels").classList.remove("on");
  document.getElementById("pay").classList.add("on");
}
function end(win) {
  over = true;
  document.getElementById("endTitle").textContent = win ? "Witch beaten" : "Emma fell";
  document.getElementById("endLine").textContent = (win ? "You cleared the castle night. " : "They caught her. ") + "Rings " + ringsHit + " · Score " + score;
  document.getElementById("over").classList.add("on");
  track("emma_ended", { result: win ? "win" : "fell", night: level, score: score });
}
function hurt() {
  if (inv > 0 || over) return;
  lives--;
  inv = 1.15;
  if (lives <= 0) end(false);
}
function clearActors() {
  foes.splice(0).forEach((f) => scene.remove(f));
  orbs.splice(0).forEach((o) => scene.remove(o));
  if (boss) { scene.remove(boss); boss = null; }
}

function makeFoe(kind) {
  const g = new THREE.Group();
  g.userData = { hp: 2, max: 2, kind, r: 1.15 };
  if (kind === "ghost") {
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.75, 10, 8), new THREE.MeshStandardMaterial({ color: 0xd5e7ff, transparent: true, opacity: 0.72, emissive: 0x88aacc, emissiveIntensity: 0.4 })));
  } else if (kind === "bat") {
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), new THREE.MeshStandardMaterial({ color: 0x222228 }));
    const wings = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.5), new THREE.MeshStandardMaterial({ color: 0x3a3048 }));
    g.add(body, wings);
    g.userData.wings = wings;
    g.userData.r = 0.9;
  } else if (kind === "wolf") {
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.7, 0.55), new THREE.MeshStandardMaterial({ color: 0x4a4038 }));
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.4, 0.4), new THREE.MeshStandardMaterial({ color: 0x5c5148 }));
    head.position.set(0, 0.15, 0.48);
    g.add(body, head);
  } else {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.35, 0.3), new THREE.MeshStandardMaterial({ color: 0xe6e0d2 }));
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), new THREE.MeshStandardMaterial({ color: 0xf3efe4 }));
    skull.position.y = 0.9;
    g.add(body, skull);
  }
  return g;
}
function makeBoss() {
  const g = new THREE.Group();
  const dress = new THREE.Mesh(new THREE.ConeGeometry(1.35, 2.8, 8), new THREE.MeshStandardMaterial({ color: 0x241028 }));
  const hat = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.7, 8), black);
  hat.position.y = 2.15;
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.08, 12), black);
  brim.position.y = 1.3;
  const face = new THREE.Mesh(new THREE.SphereGeometry(0.38, 10, 8), new THREE.MeshStandardMaterial({ color: 0x8d9a62, roughness: 0.7 }));
  face.position.y = 1.15;
  g.add(dress, hat, brim, face);
  const hp = level === 1 ? 20 : 20 + level * 8;
  g.userData = { hp, max: hp, kind: "witch", r: 2, boss: true };
  return g;
}

function reset(nextLevel) {
  level = nextLevel || 1;
  lives = 3;
  if (!nextLevel || nextLevel === 1) { score = 0; ringsHit = 0; }
  dist = 0;
  goal = level === 1 ? 4200 : 2800;
  elapsed = 0;
  mode = "fly";
  speed = 14;
  over = false;
  hold = false;
  inv = 1;
  shootCd = 0;
  spawnIn = 0.8;
  clearActors();
  emma.position.set(0, 2.1, 6);
  document.getElementById("over").classList.remove("on");
  document.getElementById("levels").classList.remove("on");
  document.getElementById("pay").classList.remove("on");
  help.textContent = "Low over the lake. The castle is ahead. Thread the arches and the golden rings.";
  speedBtn.textContent = "Speed";
  track("emma_night_started", { night: level });
}
function startBoss() {
  mode = "boss";
  clearActors();
  boss = makeBoss();
  boss.position.set(emma.position.x, emma.position.y + 0.4, emma.position.z - 12);
  scene.add(boss);
  foes.push(boss);
  help.textContent = "Ugly witch. Night " + level + " needs " + boss.userData.max + " lightning hits.";
  modeEl.textContent = "WITCH " + boss.userData.max;
  boltCd = 0.7;
}
function ding() {
  const a = new Audio("jingle.mp3");
  a.volume = 0.35;
  a.play().catch(() => {});
}
function zap() {
  const a = new Audio("lightning.wav");
  a.volume = 0.7;
  a.play().catch(() => {});
}
function showFlash(from, to) {
  const pts = [from.clone()];
  for (let i = 1; i < 7; i++) {
    const p = from.clone().lerp(to, i / 7);
    if (i < 6) {
      p.x += (Math.random() - 0.5) * 0.45;
      p.y += (Math.random() - 0.5) * 0.45;
    }
    pts.push(p);
  }
  flash.geometry.dispose();
  flash.geometry = new THREE.BufferGeometry().setFromPoints(pts);
  flash.visible = true;
  flashLife = 0.16;
}
function aimTarget() {
  const forward = new THREE.Vector3(0, 0, -1);
  let best = null, bestD = 32;
  foes.forEach((f) => {
    const to = f.position.clone().sub(emma.position);
    const distF = to.length();
    if (distF < 1 || distF > 34) return;
    if (to.normalize().dot(forward) < 0.45) return;
    if (distF < bestD) { best = f; bestD = distF; }
  });
  return best;
}
function wound(f) {
  f.userData.hp--;
  if (f.userData.hp <= 0) {
    score += f.userData.boss ? 200 : 20;
    scene.remove(f);
    const i = foes.indexOf(f);
    if (i >= 0) foes.splice(i, 1);
    if (f === boss) {
      boss = null;
      if (level >= 3) end(true);
      else if (paidNow()) showLevels("Night " + level + " cleared. The next night is open.");
      else showPay(level + 1);
    }
  }
}
function fire() {
  if (shootCd > 0 || over || hold) return;
  shootCd = 0.34;
  recoil = 1;
  zap();
  const from = new THREE.Vector3();
  emma.userData.tip.getWorldPosition(from);
  const target = aimTarget();
  const to = target ? target.position.clone() : from.clone().add(new THREE.Vector3(0, 0.1, -16));
  showFlash(from, to);
  if (target) wound(target);
}
function spawnFoe(kind) {
  const f = makeFoe(kind || KINDS[Math.floor(Math.random() * (level === 1 ? 3 : 4))]);
  f.position.set(
    emma.position.x + (Math.random() - 0.5) * 10,
    emma.position.y + (Math.random() - 0.5) * 3,
    emma.position.z - (18 + Math.random() * 16)
  );
  foes.push(f);
  scene.add(f);
  return f;
}

function resize() {
  const w = canvas.clientWidth || 1;
  const h = canvas.clientHeight || 1;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}
window.addEventListener("resize", resize);
resize();

function step(dt) {
  t += dt;
  const wand = emma.userData.wand;
  wand.rotation.z = Math.sin(t * 3.1) * 0.35;
  wand.rotation.x = Math.sin(t * 2.2) * 0.22 - recoil * 0.6;
  wand.position.y = 0.78 + Math.sin(t * 4.4) * 0.05;
  wand.position.x = 0.28 + Math.sin(t * 1.7) * 0.03;
  emma.userData.tip.scale.setScalar(1 + recoil * 0.9 + Math.sin(t * 9) * 0.08);
  emma.userData.tipLight.intensity = 0.35 + Math.sin(t * 8) * 0.15 + recoil * 2.6;
  if (recoil > 0) recoil = Math.max(0, recoil - dt * 3.2);
  if (flashLife > 0) {
    flashLife -= dt;
    if (flashLife <= 0) flash.visible = false;
  }
  if (emma.userData.cape) emma.userData.cape.rotation.x = 0.4 + Math.sin(t * 6) * 0.18;
  moon.position.set(emma.position.x + 28, emma.position.y + 22, emma.position.z - 70);

  lake.position.x = emma.position.x;
  lake.position.z = emma.position.z - 20;
  ridges.position.x = emma.position.x;
  ridges.position.z = emma.position.z - 40;
  const desired = new THREE.Vector3(emma.position.x * 0.35, emma.position.y + 1.15, emma.position.z + 4.4);
  camera.position.lerp(desired, 1 - Math.exp(-3.4 * dt));
  camera.lookAt(emma.position.x, emma.position.y + 0.35, emma.position.z - 22);
  if (hold || over) return;

  inv = Math.max(0, inv - dt);
  shootCd = Math.max(0, shootCd - dt);
  if (shootHeld) fire();

  if (keys.ArrowLeft || keys.KeyA) aimX -= dt * 8;
  if (keys.ArrowRight || keys.KeyD) aimX += dt * 8;
  if (keys.ArrowUp || keys.KeyW) aimY += dt * 6;
  if (keys.ArrowDown || keys.KeyS) aimY -= dt * 6;
  aimX = Math.max(-7.5, Math.min(7.5, aimX));
  aimY = Math.max(0.7, Math.min(5.4, aimY));
  emma.position.x += (aimX - emma.position.x) * Math.min(1, dt * 3.4);
  const yTarget = aimY + Math.sin(t * 4.2) * 0.08;
  emma.position.y += (yTarget - emma.position.y) * Math.min(1, dt * 3.4);
  emma.rotation.z = THREE.MathUtils.lerp(emma.rotation.z, (emma.position.x - aimX) * 0.18, Math.min(1, dt * 4));

  const want = brake ? 6 : (boost && mode === "fly" ? 28 : 16);
  speed += (want - speed) * Math.min(1, dt * 2);
  camera.fov = THREE.MathUtils.lerp(camera.fov, boost ? 78 : 68, Math.min(1, dt * 2));
  camera.updateProjectionMatrix();

  if (mode === "fly") {
    dist += speed * dt;
    elapsed += dt;
    emma.position.z -= speed * dt;
    recycleLandmarks();
    recycleRings();
    rings.forEach((r) => {
      const dx = emma.position.x - r.position.x;
      const dy = emma.position.y - r.position.y;
      const dz = emma.position.z - r.position.z;
      if (!r.userData.taken && dz < 1.3 && dz > -1.6 && dx * dx + dy * dy < 6.8) {
        r.userData.taken = true;
        r.scale.setScalar(1.35);
        ringsHit++;
        score += 15;
        ding();
      }
    });
    spawnIn -= dt;
    if (spawnIn <= 0) {
      spawnIn = level === 1 ? 2.2 : level === 2 ? 1.35 : 0.9;
      spawnFoe();
    }
    if (dist >= goal) startBoss();
  }

  const chase = 0.6 + level * 0.18;
  foes.forEach((f) => {
    if (f.userData.boss) return;
    f.position.x += (emma.position.x - f.position.x) * dt * chase;
    f.position.y += (emma.position.y - f.position.y) * dt * chase;
    f.position.z += (emma.position.z - f.position.z) * dt * (0.28 + level * 0.05);
    if (f.userData.wings) f.userData.wings.rotation.z = Math.sin(t * 14) * 0.75;
    if (f.position.distanceTo(emma.position) < f.userData.r + 0.55) {
      hurt();
      f.userData.hp = 0;
      scene.remove(f);
    }
  });
  for (let i = foes.length - 1; i >= 0; i--) if (!foes[i].userData.boss && foes[i].userData.hp <= 0) foes.splice(i, 1);

  if (boss) {
    boss.position.x += (emma.position.x - boss.position.x) * dt * 0.7;
    boss.position.y += (emma.position.y + 0.3 - boss.position.y) * dt * 0.7;
    boss.position.z = emma.position.z - 12;
    boss.rotation.y = Math.sin(t * 0.8) * 0.25;
    boltCd -= dt;
    if (boltCd <= 0) {
      boltCd = Math.max(0.55, 1.25 - level * 0.15);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 8), new THREE.MeshBasicMaterial({ color: 0xb388ff }));
      orb.position.copy(boss.position);
      orbs.push(orb);
      scene.add(orb);
    }
    if (boss.position.distanceTo(emma.position) < 2.3) hurt();
    modeEl.textContent = "WITCH " + Math.max(0, boss.userData.hp);
  }
  orbs.forEach((o) => {
    o.position.z += 18 * dt;
    if (o.position.distanceTo(emma.position) < 1.05) { hurt(); o.userData.dead = true; scene.remove(o); }
    else if (o.position.z > emma.position.z + 3) { o.userData.dead = true; scene.remove(o); }
  });
  for (let i = orbs.length - 1; i >= 0; i--) if (orbs[i].userData.dead) orbs.splice(i, 1);

  hud.textContent = "♥".repeat(Math.max(0, lives)) + "  " + ringsHit + " rings";
  if (mode === "fly") {
    const mins = Math.floor(elapsed / 60);
    const secs = String(Math.floor(elapsed % 60)).padStart(2, "0");
    modeEl.textContent = "CASTLE " + level + "  " + mins + ":" + secs;
  }
  const fill = document.getElementById("barFill");
  if (fill) fill.style.width = Math.min(100, dist / goal * 100) + "%";
}

let last = performance.now();
function frame(now) {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;
  step(dt);
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

function setAim(e) {
  const r = canvas.getBoundingClientRect();
  aimX = ((e.clientX - r.left) / r.width - 0.5) * 14;
  aimY = 2.1 + (0.5 - (e.clientY - r.top) / r.height) * 4.4;
}
canvas.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse" && e.button === 2) { brake = true; e.preventDefault(); return; }
  if (e.pointerType === "mouse" && e.button === 0) {
    setAim(e);
    if (mode === "boss") { shootHeld = true; fire(); }
    else boost = true;
    return;
  }
  setAim(e);
});
canvas.addEventListener("pointermove", (e) => { if (e.pointerType === "mouse" || e.buttons) setAim(e); });
canvas.addEventListener("pointerup", (e) => {
  if (e.button === 0) { boost = false; shootHeld = false; }
  if (e.button === 2) brake = false;
});
canvas.addEventListener("contextmenu", (e) => e.preventDefault());
window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  if (e.code === "Space" || e.code === "KeyF") {
    e.preventDefault();
    if (e.code === "KeyF" || mode === "boss") { shootHeld = true; fire(); }
    else boost = true;
  }
  if (e.code === "ShiftLeft" || e.code === "ShiftRight") brake = true;
});
window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
  if (e.code === "Space" || e.code === "KeyF") { boost = false; shootHeld = false; }
  if (e.code === "ShiftLeft" || e.code === "ShiftRight") brake = false;
});
function bindHold(btn, fnDown) {
  const on = (e) => { e.preventDefault(); fnDown(true); };
  const off = (e) => { e.preventDefault(); fnDown(false); };
  btn.addEventListener("pointerdown", on);
  btn.addEventListener("pointerup", off);
  btn.addEventListener("pointerleave", off);
  btn.addEventListener("pointercancel", off);
}
bindHold(speedBtn, (v) => { boost = v; });
bindHold(document.getElementById("goShoot"), (v) => { shootHeld = v; if (v) fire(); });
bindHold(document.getElementById("goBrake"), (v) => { brake = v; });
document.getElementById("again").onclick = () => showLevels("Night 1 is free. Fly the golden rings.");
document.getElementById("night1").onclick = () => reset(1);
document.getElementById("night2").onclick = () => paidNow() ? reset(2) : showPay(2);
document.getElementById("night3").onclick = () => paidNow() ? reset(3) : showPay(3);
document.getElementById("payNo").onclick = () => showLevels("Night 1 is free. Nights 2 and 3 stay locked until you pay.");
document.getElementById("payGo").addEventListener("click", () => {
  sessionStorage.setItem("holly.payStarted", String(Date.now()));
  track("pay_clicked", { source: "emma" });
});
document.getElementById("emmaContact").onclick = () => {
  document.getElementById("contact").classList.add("on");
  track("contact_clicked");
};
document.getElementById("contactNo").onclick = () => document.getElementById("contact").classList.remove("on");
if (paidNow() && window.posthog) posthog.setPersonProperties({ hollyhaunt_paid: true, site: "halloweenfest" });
paintNights();
camera.position.set(0, 4.2, 14);
window.__emmaTest = {
  paidNow, showPay, reset, showLevels, fire, startBoss,
  spawnInFront() {
    const f = makeFoe("ghost");
    f.position.set(emma.position.x, emma.position.y, emma.position.z - 8);
    foes.push(f);
    scene.add(f);
    return f.userData.hp;
  },
  state: () => ({
    level, mode, hold, lives, over, ringsHit,
    z: emma.position.z,
    wandY: emma.userData.wand.position.y,
    wandRot: emma.userData.wand.rotation.z,
    foes: foes.map((f) => ({ hp: f.userData.hp, kind: f.userData.kind })),
    witch: boss && boss.userData.hp
  })
};
requestAnimationFrame(frame);
