const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

import "./size";
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

window.addEventListener('DOMContentLoaded', async () => {
  bg = await loadImage("/transgender_flag.png")
  canvas.width = bg.width;
  canvas.height = bg.height;
  ctx.drawImage(bg, 0, 0, bg.width, bg.height);
});

fileInput.addEventListener("change", (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
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
      ctx.arc(size / 2, size / 2, size * 0.9 / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, 0, 0, size, size);
      ctx.restore();
    };
    img.src = reader.result as string;
  };
  reader.readAsDataURL(file);
});
