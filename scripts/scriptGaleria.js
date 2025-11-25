const gallery = document.querySelector(".gallery");

const totalImages = 40;

for (let i = 0; i < totalImages; i++) {
  const w = 300 + Math.floor(Math.random() * 100);
  const h = 200 + Math.floor(Math.random() * 300);

  const img = document.createElement("img");
  img.src = `https://picsum.photos/${w}/${h}?random=${i}`;
  gallery.appendChild(img);
}
