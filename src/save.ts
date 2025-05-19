const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const downloadBtn = document.getElementById("downloadBtn") as HTMLButtonElement;

downloadBtn.addEventListener("click", () => {
  const dataUrl = canvas.toDataURL("image/png");

  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.write(`
      <html>
        <head><title>长按保存图像</title></head>
        <body style="margin:0;text-align:center;background:#000;">
          <p style="color:white;">长按图片即可保存</p>
          <img src="${dataUrl}" style="max-width:100%;height:auto;" />
        </body>
      </html>
    `);
    newWindow.document.close();
  } else {
    alert("无法打开新窗口，请检查浏览器是否禁用了弹窗。");
  }
});
