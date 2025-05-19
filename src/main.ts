const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const modeBtn = document.getElementById("switchMode") as HTMLButtonElement;

import "./resize";
import "./mask";
import "./save";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

let bg: HTMLImageElement;

async function drawImage() {
  const file = fileInput.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const size = img.height;
      if (img.width !== size) {
        alert("上传的图片需要为正方形.");
        return;
      }

      // 设置 canvas 尺寸为头像尺寸
      canvas.width = size;
      canvas.height = size;

      // 绘制️‍⚧️
      ctx.drawImage(bg, 0, 0, size, size);

      // 然后绘制圆形头像覆盖在上面
      ctx.save();
      ctx.beginPath();

      const radius = mode ? 0.45 : 0.5;

      ctx.arc(size * 0.5, size * 0.5, size * radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, size * (0.5 - radius), size * (0.5 - radius), size * 2 * radius, size * 2 * radius);
      ctx.restore();
    };
    img.src = reader.result as string;
  };
  reader.readAsDataURL(file);
}

window.addEventListener('DOMContentLoaded', async () => {
  bg = await loadImage("/transgender_flag.png")
  canvas.width = bg.width;
  canvas.height = bg.height;
  ctx.drawImage(bg, 0, 0, bg.width, bg.height);
});


let mode: boolean = false;

modeBtn.addEventListener("click", () => {
  mode = !mode;
  drawImage();
})

fileInput.addEventListener("change", drawImage);
