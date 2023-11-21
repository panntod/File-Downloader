document.addEventListener("DOMContentLoaded", function () {
  const inputUrl = document.querySelector(".input");
  const downloadBtn = document.querySelector(".downloadBtn");

  downloadBtn.addEventListener("click", (event) => {
    event.preventDefault();
    downloadBtn.innerHTML = "Downloading...";
    fetchURL(inputUrl.value);
  });

  async function fetchURL(url) {
    try {
      const data = await fetch(url);
      const blob = await data.blob();
      const fileUrl = URL.createObjectURL(blob);
      const aTag = document.createElement("a");
      aTag.href = fileUrl;
      aTag.download = "FileDownloader";
      document.body.appendChild(aTag);
      aTag.click();
      downloadBtn.innerHTML = "Download";
      URL.revokeObjectURL(fileUrl);
      aTag.remove;
    } catch (error) {
      alert("Failed To Download! " + error.message);
      downloadBtn.innerHTML = "Download";
    }
  }
});
