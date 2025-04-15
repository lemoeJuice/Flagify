const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const downloadBtn = document.getElementById("downloadBtn") as HTMLButtonElement;

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "processed-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
  