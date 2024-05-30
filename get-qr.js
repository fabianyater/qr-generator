const downloadBtn = document.getElementById("download-btn")
const shareBtn = document.getElementById("share-btn")
const code = document.getElementById("generated-code")
const spanCopy = document.getElementById("success-copy")
const spanShare = document.getElementById("share-span")
const urlValue = localStorage.getItem("qrUrl")
let text = urlValue;
code.innerHTML = ""
let base64Image = ""

const base64ToBlob = (base64, mimeType = 'image/png') => {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeType });
};

function copyQrText() {
  var copyText = text;

  copyText.select;
  navigator.clipboard.writeText(copyText);
  
  spanCopy.innerHTML = "Shared!"
  spanShare.innerHTML = ""

  setTimeout(() => {
    spanCopy.innerHTML = ""
    spanShare.innerHTML = "Share"
  }, 2000)

}

function downloadQRImage(image) {
  const fileName = 'qr.png'
  const blob = base64ToBlob(image);
  saveAs(blob, fileName);
}


function generateQRCode() {
  new QRCode(code, {
    text: text,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const image = code.getElementsByTagName('img');
  base64Image = image[0].currentSrc
})

downloadBtn.addEventListener('click', () => {
  downloadQRImage(base64Image)
})

shareBtn.addEventListener('click', () => {
  copyQrText()
})

generateQRCode()