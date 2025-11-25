
const previewGrid = document.getElementById("previewGrid");

const seed = Date.now() % 1000;
function picsum(w, h, i) {
  return `https://picsum.photos/seed/${seed + i}/${w}/${h}`;
}

for (let i = 0; i < 8; i++) {
  const img = document.createElement("img");
  img.src = picsum(800, 600, i + 10);
  img.alt = "preview";
  img.dataset.index = i;
  previewGrid.appendChild(img);
}

const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlayImg");
const closeX = document.getElementById("closeX");

previewGrid.addEventListener("click", (e) => {
  const t = e.target;
  if (t.tagName === "IMG") {
    overlayImg.src = t.src.replace("/800/600", "/1200/900");
    overlay.classList.add("open");
  }
});

function closeOverlay() { overlay.classList.remove("open"); overlayImg.src = ""; }
closeX.addEventListener("click", closeOverlay);
overlay.addEventListener("click", (e) => { if (e.target === overlay) closeOverlay(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeOverlay(); });

document.getElementById("exploreBtn").addEventListener("click", () => {
  document.querySelector(".preview").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("aboutBtn").addEventListener("click", () => {
  window.scrollTo({ top: document.body.scrollHeight - 200, behavior: "smooth" });
});

document.getElementById("year").textContent = new Date().getFullYear();
