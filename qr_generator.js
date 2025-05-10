document.addEventListener("DOMContentLoaded", function () {
  const qrContainer = document.getElementById("qr-code");
  if (!qrContainer) return;

  // Obtener usuario desde localStorage
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log("Datos cargados:", userData);

  // Verifica que exista y sea alumno
  if (userData && userData.role === "alumno") {
    const qrText = "Matricula: " + userData.user;

    console.log("Generando QR con:", qrText);

    // Limpia el contenedor antes de generar el código
    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {
      text: qrText,
      width: 180,
      height: 180,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    window.location.href = "login.html";
  }
});
