const container = document.getElementById("container") as HTMLDivElement;
const mask = document.getElementById("mask") as HTMLCanvasElement;

function resizeCanvasStyle() {
  const padding = 40; // 页面边距留白
  const toolbarHeight = 100; // 控件高度预留
  const maxWidth = window.innerWidth - padding;
  const maxHeight = window.innerHeight - padding - toolbarHeight;
  const size = Math.min(maxWidth, maxHeight);

  // 设置CSS显示尺寸
  container.style.width = size + 'px';
  container.style.height = size + 'px';

  // 设置遮罩分辨率
  const rect = container.getBoundingClientRect();
  mask.width = rect.width;
  mask.height = rect.height;
}

window.addEventListener('resize', resizeCanvasStyle);
window.addEventListener('DOMContentLoaded', resizeCanvasStyle);
