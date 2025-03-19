document.addEventListener("DOMContentLoaded", function() {
    const simulateButton = document.getElementById("simulate-scan");
    const qrResult = document.getElementById("qr-result");
  
    if (simulateButton) {
      simulateButton.addEventListener("click", function() {
        // Simula la lectura del QR mostrando la credencial del alumno como imagen y matrícula en grande
        qrResult.style.display = "block";
        qrResult.innerHTML = `
          <h2>Credencial del Alumno</h2>
          <img src="images/credencial_alumno.jpeg" alt="Credencial del Alumno" class="img-responsive center-block" style="max-width:300px; margin-bottom:15px;">
          <p style="font-size:24px; font-weight:bold;">Matrícula: 123456</p>
          <button id="btn-canjear" class="btn btn-success">✅ Canjear Beca</button>
          <button id="btn-no-canjear" class="btn btn-danger">❌ No Canjear</button>
        `;
        document.getElementById("btn-canjear").addEventListener("click", function() {
            alert("Beca canjeada exitosamente a las " + new Date().toLocaleString());
        });
        document.getElementById("btn-no-canjear").addEventListener("click", function() {
            alert("Operación cancelada. La beca no fue canjeada.");
        });
      });
    }
  });
  