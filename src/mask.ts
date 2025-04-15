const mask = document.getElementById("mask") as HTMLCanvasElement;
const maskCtx = mask.getContext("2d")!;
const maskBtn = document.getElementById("openMask") as HTMLButtonElement;

let isMask: boolean = false;

maskBtn.addEventListener("click", () => {
  if (!isMask) {
    maskCtx.fillStyle = "rgba(255, 255, 255, 1)";
    maskCtx.fillRect(0, 0, mask.width, mask.height);

    maskCtx.globalCompositeOperation = "destination-out";
    maskCtx.beginPath();
    maskCtx.arc(mask.width / 2, mask.height / 2, mask.width / 2, 0, Math.PI * 2);
    maskCtx.fill();
  } else {
    maskCtx.globalCompositeOperation = "source-over";
    maskCtx.clearRect(0, 0, mask.width, mask.height);
  }
  isMask = !isMask;
})
