document.addEventListener("DOMContentLoaded", function () {
  const inputUrl = document.querySelector(".input");
  const downloadBtn = document.querySelector(".downloadBtn");

  downloadBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    downloadBtn.innerHTML = "Downloading...";
    try {
      const fileUrl = await fetchDownloadLink(inputUrl.value);
      triggerDownload(fileUrl);
    } catch (error) {
      alert("Failed To Download! " + error.message);
      downloadBtn.innerHTML = "Download";
    }
  });

  async function fetchDownloadLink(url) {
    try {
      const proxyUrl = "https://api.allorigins.win/raw?url="; // Use the 'allorigins' proxy
      const data = await fetch(proxyUrl + encodeURIComponent(url), {
        mode: "cors",
      });
      const contentType = data.headers.get("content-type");

      // Check the content type to determine the file extension
      let fileExtension = "";
      if (contentType.includes("image")) {
        fileExtension = ".jpg"; // or '.png' based on your preference
      } else if (contentType.includes("video")) {
        fileExtension = ".mp4"; // or other video formats
      } else {
        throw new Error("Unsupported content type");
      }

      const blob = await data.blob();
      return URL.createObjectURL(blob) + "?download"; // Append query parameter for triggering download
    } catch (error) {
      throw new Error("Failed to fetch download link");
    }
  }

  function triggerDownload(url) {
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.download = "FileDownloader"; // Adjust filename with extension when fetched
    document.body.appendChild(aTag);
    aTag.click();
    downloadBtn.innerHTML = "Download";
    URL.revokeObjectURL(url);
    aTag.remove();
  }
});
