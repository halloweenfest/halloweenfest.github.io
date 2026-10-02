import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";

const canvas = document.getElementById("c");
const hud = document.getElementById("hud");
const modeEl = document.getElementById("mode");
const help = document.getElementById("help");
const speedBtn = document.getElementById("goSpeed");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
renderer.setClearColor(0x070814);
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x0c1428, 18, 78);
const camera = new THREE.PerspectiveCamera(72, 1, 0.1, 140);
camera.position.set(0, 2.3, 8);
scene.add(camera);

scene.add(new THREE.AmbientLight(0x6a78aa, 0.55));
const moonLight = new THREE.DirectionalLight(0xc5d4ff, 1.15);
moonLight.position.set(20, 30, 10);
scene.add(moonLight);
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3.2, 16, 12),
  new THREE.MeshBasicMaterial({ color: 0xf4e7c1 })
);
scene.add(moon);

const stone = new THREE.MeshStandardMaterial({ color: 0x7a726a, roughness: 0.95 });
const darkStone = new THREE.MeshStandardMaterial({ color: 0x3e4550, roughness: 0.9 });
const roofM = new THREE.MeshStandardMaterial({ color: 0x4a2430, roughness: 0.75 });
const wood = new THREE.MeshStandardMaterial({ color: 0x6b4322, roughness: 0.65 });
const leaf = new THREE.MeshStandardMaterial({ color: 0x1c3b2c, roughness: 1 });
const waterM = new THREE.MeshStandardMaterial({ color: 0x16344a, metalness: 0.45, roughness: 0.22 });
const glow = new THREE.MeshStandardMaterial({ color: 0xffd39a, emissive: 0xffb45a, emissiveIntensity: 1.1 });
const pathM = new THREE.MeshStandardMaterial({ color: 0x2a3038, roughness: 1 });

function tower(x, z, h) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.7, h, 6), stone);
  body.position.y = h / 2;
  const cap = new THREE.Mesh(new THREE.ConeGeometry(2.1, 2.6, 6), roofM);
  cap.position.y = h + 1.1;
  g.add(body, cap);
  for (let i = 0; i < 3; i++) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.7, 0.12), glow);
    w.position.set(1.15, 1.6 + i * (h / 3.4), 0.4);
    g.add(w);
  }
  g.position.set(x, -1.6, z);
  return g;
}

function tree(x, z) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.26, 1.6, 5), wood);
  trunk.position.y = 0.2;
  const top = new THREE.Mesh(new THREE.ConeGeometry(1.1, 2.4, 6), leaf);
  top.position.y = 1.8;
  g.add(trunk, top);
  g.position.set(x, -1.6, z);
  return g;
}

function buildChunk(z) {
  const g = new THREE.Group();
  g.position.z = z;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(70, 36), darkStone);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2;
  const lake = new THREE.Mesh(new THREE.PlaneGeometry(70, 9), waterM);
  lake.rotation.x = -Math.PI / 2;
  lake.position.set(0, -1.96, 6);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(7, 36), pathM);
  road.rotation.x = -Math.PI / 2;
  road.position.y = -1.94;
  g.add(ground, lake, road);
  g.userData = { towers: [], trees: [] };
  for (const side of [-1, 1]) {
    const tw = tower(side * (9 + Math.random() * 3), (Math.random() - 0.5) * 10, 7 + Math.random() * 5);
    g.add(tw);
    g.userData.towers.push(tw);
    const tr = tree(side * (5 + Math.random() * 2), (Math.random() - 0.5) * 12);
    g.add(tr);
    g.userData.trees.push(tr);
  }
  const wall = new THREE.Mesh(new THREE.BoxGeometry(16, 3.2, 1.1), stone);
  wall.position.set(0, 0.2, -8);
  g.add(wall);
  return g;
}

const chunks = [];
let nextChunkZ = 20;
for (let i = 0; i < 8; i++) {
  const c = buildChunk(nextChunkZ);
  chunks.push(c);
  scene.add(c);
  nextChunkZ -= 36;
}
function recycleChunks() {
  for (const c of chunks) {
    if (c.position.z > camera.position.z + 24) {
      c.position.z = nextChunkZ;
      nextChunkZ -= 36;
      c.userData.towers.forEach((tw, i) => {
        const side = i === 0 ? -1 : 1;
        tw.position.x = side * (9 + Math.random() * 4);
        tw.position.z = (Math.random() - 0.5) * 10;
      });
    }
  }
}

const hand = new THREE.Group();
hand.position.set(0.32, -0.3, -0.62);
camera.add(hand);
const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.022, 0.62, 6), wood);
stick.rotation.z = -0.95;
stick.position.set(0.16, -0.02, 0);
const tip = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), new THREE.MeshBasicMaterial({ color: 0xe8f6ff }));
tip.position.set(0.4, 0.2, 0.02);
const tipLight = new THREE.PointLight(0xb7dcff, 0.3, 2.2);
tipLight.position.copy(tip.position);
hand.add(stick, tip, tipLight);

const broom = new THREE.Group();
const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.5, 6), wood);
shaft.rotation.x = Math.PI / 2;
const bristle = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.42, 7), new THREE.MeshStandardMaterial({ color: 0x8d6a32 }));
bristle.rotation.x = -Math.PI / 2;
bristle.position.z = 0.85;
broom.add(shaft, bristle);
broom.position.set(0, -0.46, -0.35);
camera.add(broom);

const boltMat = new THREE.LineBasicMaterial({ color: 0xf5fbff });
let flash = new THREE.Line(new THREE.BufferGeometry(), boltMat);
flash.visible = false;
scene.add(flash);
let flashLife = 0;
let recoil = 0;

function resize() {
  const w = canvas.clientWidth || 1;
  const h = canvas.clientHeight || 1;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}
window.addEventListener("resize", resize);
resize();

const keys = {};
let boost = false, brake = false, shootHeld = false;
let aimX = 0, aimY = 2.3;
let lives = 3, score = 0, level = 1, dist = 0, goal = 4200, elapsed = 0;
let speed = 14, mode = "fly", hold = true, over = false;
let shootCd = 0, spawnIn = 0.8, pumpIn = 2, boltCd = 1, t = 0, inv = 0;
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
  document.getElementById("endLine").textContent = win ? "You cleared the castle night. Score " + score : "They caught her. Score " + score;
  document.getElementById("over").classList.add("on");
  track("emma_ended", { result: win ? "win" : "fell", night: level, score: score });
}
function hurt() {
  if (inv > 0 || over) return;
  lives--;
  inv = 1.2;
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
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.7, 10, 8), new THREE.MeshStandardMaterial({ color: 0xd5e7ff, transparent: true, opacity: 0.72, emissive: 0x6688aa, emissiveIntensity: 0.35 }));
    g.add(body);
  } else if (kind === "bat") {
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), new THREE.MeshStandardMaterial({ color: 0x222228 }));
    const wings = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.45), new THREE.MeshStandardMaterial({ color: 0x3a3048 }));
    g.add(body, wings);
    g.userData.wings = wings;
    g.userData.r = 0.9;
  } else if (kind === "wolf") {
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.7, 0.55), new THREE.MeshStandardMaterial({ color: 0x4a4038 }));
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.4, 0.4), new THREE.MeshStandardMaterial({ color: 0x5c5148 }));
    head.position.set(0, 0.15, 0.45);
    g.add(body, head);
  } else {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.3, 0.3), new THREE.MeshStandardMaterial({ color: 0xe6e0d2 }));
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), new THREE.MeshStandardMaterial({ color: 0xf3efe4 }));
    skull.position.y = 0.85;
    g.add(body, skull);
  }
  return g;
}

function makeBoss() {
  const g = new THREE.Group();
  const dress = new THREE.Mesh(new THREE.ConeGeometry(1.15, 2.5, 8), new THREE.MeshStandardMaterial({ color: 0x2a1028 }));
  const hat = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.5, 8), new THREE.MeshStandardMaterial({ color: 0x111111 }));
  hat.position.y = 1.9;
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.08, 12), new THREE.MeshStandardMaterial({ color: 0x161616 }));
  brim.position.y = 1.15;
  g.add(dress, hat, brim);
  const hp = level === 1 ? 20 : 20 + level * 8;
  g.userData = { hp, max: hp, kind: "witch", r: 1.8, boss: true };
  return g;
}

function reset(nextLevel) {
  level = nextLevel || 1;
  lives = 3;
  if (!nextLevel || nextLevel === 1) score = 0;
  dist = 0;
  goal = level === 1 ? 4200 : 2800;
  elapsed = 0;
  mode = "fly";
  speed = 14;
  over = false;
  hold = false;
  inv = 1;
  shootCd = 0;
  spawnIn = 0.6;
  pumpIn = 3;
  clearActors();
  camera.position.set(0, 2.3, 8);
  document.getElementById("over").classList.remove("on");
  document.getElementById("levels").classList.remove("on");
  document.getElementById("pay").classList.remove("on");
  help.textContent = "Drag to fly the castle. Shoot lightning. Two hits fell a villain.";
  speedBtn.textContent = "Speed";
  track("emma_night_started", { night: level });
}

function startBoss() {
  mode = "boss";
  clearActors();
  boss = makeBoss();
  boss.position.set(camera.position.x, camera.position.y, camera.position.z - 14);
  scene.add(boss);
  foes.push(boss);
  help.textContent = "The castle witch. Night " + level + " needs " + boss.userData.max + " lightning hits.";
  modeEl.textContent = "WITCH " + boss.userData.max;
  boltCd = 0.8;
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
      p.x += (Math.random() - 0.5) * 0.55;
      p.y += (Math.random() - 0.5) * 0.55;
    }
    pts.push(p);
  }
  flash.geometry.dispose();
  flash.geometry = new THREE.BufferGeometry().setFromPoints(pts);
  flash.visible = true;
  flashLife = 0.16;
}
function aimTarget() {
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  let best = null, bestD = 30;
  foes.forEach((f) => {
    const to = f.position.clone().sub(camera.position);
    const distF = to.length();
    if (distF < 1 || distF > 32) return;
    if (to.normalize().dot(forward) < 0.72) return;
    if (distF < bestD) { best = f; bestD = distF; }
  });
  return best;
}
function wound(f) {
  f.userData.hp--;
  f.scale.setScalar(f.userData.hp > 0 ? 0.92 : 1);
  if (f.userData.hp <= 0) {
    score += f.userData.boss ? 0 : 20;
    scene.remove(f);
    const i = foes.indexOf(f);
    if (i >= 0) foes.splice(i, 1);
    if (f === boss) {
      boss = null;
      score += 200;
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
  tip.getWorldPosition(from);
  const target = aimTarget();
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  const to = target ? target.position.clone() : from.clone().add(dir.multiplyScalar(16));
  showFlash(from, to);
  if (target) wound(target);
}

function spawnFoe(kind) {
  const f = makeFoe(kind || KINDS[Math.floor(Math.random() * (level === 1 ? 3 : 4))]);
  f.position.set(
    camera.position.x + (Math.random() - 0.5) * 12,
    camera.position.y + (Math.random() - 0.5) * 3.5,
    camera.position.z - (16 + Math.random() * 18)
  );
  foes.push(f);
  scene.add(f);
  return f;
}

const pumpkins = [];
const pumpGeo = new THREE.SphereGeometry(0.38, 8, 6);
const pumpMat = new THREE.MeshStandardMaterial({ color: 0xe07a1f, emissive: 0xcc5510, emissiveIntensity: 0.35 });
function spawnPumpkin() {
  const p = new THREE.Mesh(pumpGeo, pumpMat);
  p.position.set(camera.position.x + (Math.random() - 0.5) * 6, camera.position.y + (Math.random() - 0.5) * 2, camera.position.z - 22);
  pumpkins.push(p);
  scene.add(p);
}

function step(dt) {
  t += dt;
  const bob = Math.sin(t * 4.4);
  hand.position.y = -0.3 + bob * 0.03 + Math.sin(t * 1.6) * 0.012;
  hand.position.x = 0.32 + Math.sin(t * 2.2) * 0.02;
  hand.rotation.z = Math.sin(t * 3.2) * 0.16;
  hand.rotation.x = Math.sin(t * 2.5) * 0.1 - recoil * 0.45;
  hand.position.z = -0.62 + recoil * 0.1 + Math.sin(t * 5.5) * 0.012;
  tipLight.intensity = 0.2 + Math.sin(t * 9) * 0.12 + recoil * 2.4;
  tip.scale.setScalar(1 + recoil * 0.8 + Math.sin(t * 8) * 0.08);
  broom.position.y = -0.46 + bob * 0.02;
  broom.rotation.z = Math.sin(t * 3) * 0.04;
  if (recoil > 0) recoil = Math.max(0, recoil - dt * 3.2);
  if (flashLife > 0) {
    flashLife -= dt;
    if (flashLife <= 0) flash.visible = false;
  }
  moon.position.set(camera.position.x + 26, camera.position.y + 18, camera.position.z - 60);
  if (hold || over) return;

  inv = Math.max(0, inv - dt);
  shootCd = Math.max(0, shootCd - dt);
  if (shootHeld) fire();

  const up = keys.ArrowUp || keys.KeyW;
  const down = keys.ArrowDown || keys.KeyS;
  const left = keys.ArrowLeft || keys.KeyA;
  const right = keys.ArrowRight || keys.KeyD;
  if (left) aimX -= dt * 7;
  if (right) aimX += dt * 7;
  if (up) aimY += dt * 5;
  if (down) aimY -= dt * 5;
  aimX = Math.max(-8, Math.min(8, aimX));
  aimY = Math.max(0.8, Math.min(5.2, aimY));
  camera.position.x += (aimX - camera.position.x) * Math.min(1, dt * 3);
  camera.position.y += (aimY - camera.position.y) * Math.min(1, dt * 3);
  camera.rotation.z = (camera.position.x - aimX) * 0.08;
  camera.rotation.y = (camera.position.x - aimX) * 0.03;
  camera.rotation.x = (aimY - camera.position.y) * 0.12;

  const want = brake ? 5 : (boost && mode === "fly" ? 26 : 14);
  speed += (want - speed) * Math.min(1, dt * 2);
  if (mode === "fly") {
    dist += speed * dt;
    elapsed += dt;
    camera.position.z -= speed * dt;
    recycleChunks();
    spawnIn -= dt;
    pumpIn -= dt;
    if (spawnIn <= 0) {
      spawnIn = level === 1 ? 2.1 : level === 2 ? 1.3 : 0.9;
      spawnFoe();
    }
    if (pumpIn <= 0) { pumpIn = 11; spawnPumpkin(); }
    if (dist >= goal) startBoss();
  }

  const chase = 0.55 + level * 0.18;
  foes.forEach((f) => {
    if (f.userData.boss) return;
    f.position.x += (camera.position.x - f.position.x) * dt * chase;
    f.position.y += (camera.position.y - f.position.y) * dt * chase;
    f.position.z += (camera.position.z - f.position.z) * dt * (0.25 + level * 0.05);
    if (f.userData.wings) f.userData.wings.rotation.z = Math.sin(t * 14) * 0.7;
    if (f.userData.kind === "ghost") f.position.y += Math.sin(t * 3 + f.position.x) * dt * 0.4;
    if (f.position.distanceTo(camera.position) < f.userData.r + 0.7) {
      hurt();
      scene.remove(f);
      f.userData.hp = 0;
    }
  });
  for (let i = foes.length - 1; i >= 0; i--) {
    if (!foes[i].userData.boss && foes[i].userData.hp <= 0) foes.splice(i, 1);
  }
  pumpkins.forEach((p) => {
    if (p.position.distanceTo(camera.position) < 1.5) {
      lives = Math.min(6, lives + 1);
      score += 25;
      scene.remove(p);
      p.userData.got = true;
    }
  });
  for (let i = pumpkins.length - 1; i >= 0; i--) if (pumpkins[i].userData.got) pumpkins.splice(i, 1);

  if (boss) {
    boss.position.x += (camera.position.x - boss.position.x) * dt * 0.6;
    boss.position.y += (camera.position.y - 0.2 - boss.position.y) * dt * 0.6;
    boss.position.z = camera.position.z - 13;
    boss.rotation.y = Math.sin(t) * 0.2;
    boltCd -= dt;
    if (boltCd <= 0) {
      boltCd = Math.max(0.55, 1.3 - level * 0.15);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), new THREE.MeshBasicMaterial({ color: 0xb388ff }));
      orb.position.copy(boss.position);
      orbs.push(orb);
      scene.add(orb);
    }
    if (boss.position.distanceTo(camera.position) < 2.2) hurt();
    modeEl.textContent = "WITCH " + Math.max(0, boss.userData.hp);
  }
  orbs.forEach((o) => {
    o.position.z += 16 * dt;
    if (o.position.distanceTo(camera.position) < 1.15) {
      hurt();
      scene.remove(o);
      o.userData.dead = true;
    }
    if (o.position.z > camera.position.z + 4) {
      scene.remove(o);
      o.userData.dead = true;
    }
  });
  for (let i = orbs.length - 1; i >= 0; i--) if (orbs[i].userData.dead) orbs.splice(i, 1);

  hud.textContent = "♥".repeat(Math.max(0, lives)) + (lives > 5 ? " " + lives : "");
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
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  aimX = (x - 0.5) * 14;
  aimY = 2.3 + (0.5 - y) * 4.2;
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
canvas.addEventListener("pointermove", (e) => {
  if (e.pointerType === "mouse" || e.buttons) setAim(e);
});
canvas.addEventListener("pointerup", (e) => {
  if (e.button === 0) { boost = false; shootHeld = false; }
  if (e.button === 2) brake = false;
});
canvas.addEventListener("pointerleave", () => {});
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
document.getElementById("again").onclick = () => showLevels("Night 1 is free. Fly the castle grounds.");
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
window.__emmaTest = {
  paidNow, showPay, reset, showLevels, fire, startBoss,
  spawnInFront() {
    const f = makeFoe("ghost");
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    f.position.copy(camera.position).add(dir.multiplyScalar(8));
    foes.push(f);
    scene.add(f);
    return f.userData.hp;
  },
  state: () => ({
    level, mode, hold, lives, over,
    z: camera.position.z,
    wandY: hand.position.y,
    wandRot: hand.rotation.z,
    foes: foes.map((f) => ({ hp: f.userData.hp, kind: f.userData.kind })),
    witch: boss && boss.userData.hp
  })
};
requestAnimationFrame(frame);
