
const gallery = document.querySelector(".gallery");
const totalImages = 40;
const MAX_RETRIES = 6;

function randomDim(i) {
  const w = 300 + Math.floor(Math.random() * 100);
  const h = 200 + Math.floor(Math.random() * 300);
  // t evita cache repetido
  return { w, h, t: Date.now(), seed: i };
}

function makePicsumUrl({ w, h, t, seed }) {
  return `https://picsum.photos/seed/${seed + (t % 1000)}/${w}/${h}?t=${t}`;
}

function createImg(i) {
  const img = document.createElement("img");
  img.className = "gallery-item";
  img.alt = `image-${i}`;
  img.style.cursor = "pointer";
  img.dataset.attempt = "0";

  function setNewSrc() {
    const dims = randomDim(i);
    img.dataset.dims = JSON.stringify(dims);
    img.src = makePicsumUrl(dims);
  }

  img.onload = () => {
    img.dataset.loaded = "true";
    img.removeAttribute("aria-busy");
  };

  img.onerror = () => {
    const attempt = parseInt(img.dataset.attempt || "0", 10) + 1;
    img.dataset.attempt = String(attempt);

    if (attempt >= MAX_RETRIES) {
      img.dataset.loaded = "false";
      img.alt = "erro ao carregar";
      img.style.opacity = "0.6";
      img.style.filter = "grayscale(0.3)";
      img.style.background = "#f3e8e8";
      img.title = "Não foi possível carregar a imagem";
      return;
    }

    setTimeout(() => {
      setNewSrc();
    }, 250 + attempt * 150);
  };

  img.addEventListener("click", async (e) => {
    e.preventDefault();
    if (img.dataset.downloading === "1") return;

    img.dataset.downloading = "1";
    const prevCursor = img.style.cursor;
    img.style.cursor = "progress";
    img.setAttribute("aria-busy", "true");

    try {
      const resp = await fetch(img.src, { cache: "no-store" });
      if (!resp.ok) throw new Error("Resposta inválida: " + resp.status);

      const blob = await resp.blob();

      const ext = blob.type.split("/")[1] || "jpg";
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `pixelnest_image_${i}.${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      // revoga objeto
      setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
    } catch (err) {
      console.error("Erro ao baixar imagem:", err);
      alert("Erro ao baixar a imagem. Tentando recarregar a nova imagem.");
      const attempt = parseInt(img.dataset.attempt || "0", 10) + 1;
      img.dataset.attempt = String(attempt);
      if (attempt < MAX_RETRIES) {
        const dims = randomDim(i);
        img.dataset.dims = JSON.stringify(dims);
        img.src = makePicsumUrl(dims);
      } else {
        img.alt = "download falhou";
      }
    } finally {
      img.dataset.downloading = "0";
      img.style.cursor = prevCursor || "pointer";
      img.removeAttribute("aria-busy");
    }
  });

  setNewSrc();
  return img;
}

for (let i = 0; i < totalImages; i++) {
  const img = createImg(i);
  gallery.appendChild(img);
}