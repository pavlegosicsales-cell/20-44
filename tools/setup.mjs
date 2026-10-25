// Setup za novi uredjaj (WAT tool). Pokrece ga VS Code automatski pri otvaranju foldera
// (.vscode/tasks.json), a moze i rucno: node tools/setup.mjs
// Idempotentno: na vec podesenom uredjaju ne radi nista sem provere.
//   1. git remoti: `site` = 20-44 (Vercel deploy), `origin` = AICONNECT (samo grana twenty-forty-four)
//   2. git pull sa site/main ako je radni direktorijum cist
//   3. npm install ako fale node_modules ili je package-lock noviji
import { execSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const SITE = "https://github.com/pavlegosicsales-cell/20-44.git";
const AICONNECT = "https://github.com/pavlegosicsales-cell/AICONNECT.git";

const sh = (cmd, opts = {}) =>
  execSync(cmd, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts }).trim();
const run = (cmd) => execSync(cmd, { cwd: root, stdio: "inherit" });
const tryRun = (cmd) => {
  try {
    run(cmd);
    return true;
  } catch {
    return false;
  }
};

function remotes() {
  const out = {};
  for (const line of sh("git remote -v").split("\n")) {
    const [name, url] = line.split(/\s+/);
    if (name) out[name] = url;
  }
  return out;
}

// 1. Remoti — isti raspored kao na desktopu, bez obzira koji je repo kloniran.
let r = remotes();
const isSite = (url) => url && url.includes("/20-44");
const isAiconnect = (url) => url && url.includes("/AICONNECT");

if (isSite(r.origin) && !r.site) {
  console.log("[setup] origin je 20-44 -> preimenujem u `site`");
  sh("git remote rename origin site");
  r = remotes();
}
if (!r.site) {
  console.log("[setup] dodajem remote `site` (20-44)");
  sh(`git remote add site ${SITE}`);
}
if (!r.origin) {
  console.log("[setup] dodajem remote `origin` (AICONNECT, samo grana twenty-forty-four)");
  sh(`git remote add origin ${AICONNECT}`);
}
if (isAiconnect(remotes().origin)) {
  // AICONNECT je monorepo sa mnogo grana; vuci samo ovu.
  sh("git config remote.origin.fetch +refs/heads/twenty-forty-four:refs/remotes/origin/twenty-forty-four");
}

// 2. Povuci najnovije sa zivog repoa ako nema lokalnih izmena.
tryRun("git fetch site main");
const branch = sh("git rev-parse --abbrev-ref HEAD");
if (sh("git status --porcelain")) {
  console.log("[setup] ima lokalnih izmena, preskacem pull");
} else if (tryRun("git merge --ff-only site/main")) {
  console.log(`[setup] ${branch} je na site/main`);
} else {
  console.log("[setup] grana se razisla od site/main, pull preskocen (resi rucno)");
}

// 3. Zavisnosti (puppeteer pri instalaciji skida i Chrome za tools/screenshot.mjs).
const nm = join(root, "node_modules");
const lock = join(root, "package-lock.json");
const stale = !existsSync(nm) || statSync(lock).mtimeMs > statSync(nm).mtimeMs;
if (stale) {
  console.log("[setup] npm install...");
  run("npm install");
} else {
  console.log("[setup] node_modules su sveze");
}

console.log("[setup] gotovo");
