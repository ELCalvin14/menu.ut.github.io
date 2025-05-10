document.addEventListener("DOMContentLoaded", () => {
  const qrResult = document.getElementById("qr-result");

  // Inicia el escáner real
  const html5QrCode = new Html5Qrcode("reader");

  const config = { fps: 10, qrbox: { width: 250, height: 250 } };

  function onScanSuccess(decodedText, decodedResult) {
    console.log("QR Detectado:", decodedText);
    html5QrCode.stop(); // Detiene la cámara después de escanear

    // Asume que el QR es del tipo: "Matricula: 123456"
    const matricula = decodedText.split(":")[1]?.trim();
    if (!matricula) {
      qrResult.innerHTML = "<p style='color:red;'>QR inválido.</p>";
      qrResult.style.display = "block";
      return;
    }

    // Buscar en Supabase
    supabase.from("alumnos")
      .select("*")
      .eq("matricula", matricula)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          qrResult.innerHTML = `<p style='color:red;'>Alumno con matrícula ${matricula} no encontrado.</p>`;
          qrResult.style.display = "block";
          return;
        }

        // Mostrar credencial real
        qrResult.innerHTML = `
          <h3>Credencial del Alumno</h3>
          <img src="${data.foto_url}" alt="Foto del Alumno" style="max-width:300px; margin-bottom:10px;" class="img-responsive center-block">
          <p><strong>Nombre:</strong> ${data.nombre}</p>
          <p><strong>Matrícula:</strong> ${data.matricula}</p>
          <p><strong>Grado:</strong> ${data.grado}</p>
          <p><strong>Vigencia:</strong> ${data.vigencia}</p>
          <button id="btn-canjear" class="btn btn-success">✅ Canjear Beca</button>
          <button id="btn-no-canjear" class="btn btn-danger">❌ No Canjear</button>
        `;
        qrResult.style.display = "block";

        document.getElementById("btn-canjear").addEventListener("click", () => {
          alert("✅ Beca canjeada exitosamente a las " + new Date().toLocaleString());
        });

        document.getElementById("btn-no-canjear").addEventListener("click", () => {
          qrResult.innerHTML = "";
          qrResult.style.display = "none";
        });
      });
  }

  Html5Qrcode.getCameras().then(cameras => {
    if (cameras && cameras.length) {
      // Usa la cámara frontal si está disponible (label contiene 'front')
      const frontCamera = cameras.find(cam => cam.label.toLowerCase().includes("front")) || cameras[0];
      html5QrCode.start(frontCamera.id, config, onScanSuccess);
    } else {
      alert("No se encontraron cámaras.");
    }
  }).catch(err => {
    console.error("Error al acceder a las cámaras:", err);
    alert("No se pudo acceder a la cámara.");
  });
});
