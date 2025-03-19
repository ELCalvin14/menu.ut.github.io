document.addEventListener("DOMContentLoaded", function() {
    const qrContainer = document.getElementById("qr-code");
    console.log("qrContainer:", qrContainer);
    if (!qrContainer) return;
    
    // Para propósitos de demostración: Si no existe el usuario, se crea un objeto de ejemplo.
    let userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
        userData = { user: "123456", role: "alumno" };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("Se creó usuario de prueba:", userData);
    }
    
    if (userData && userData.role === "alumno") {
      const qrText = "Matricula: " + userData.user;
      console.log("Generando QR con:", qrText);
      // Limpia el contenedor antes de generar el código
      qrContainer.innerHTML = "";
      new QRCode(qrContainer, {
        text: qrText,
        width: 180,
        height: 180,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    } else {
      window.location.href = "login.html";
    }
  });
  