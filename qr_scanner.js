document.addEventListener("DOMContentLoaded", () => {
  console.log("📦 qr_scanner.js cargado correctamente");

  const btnAbrirQR = document.getElementById("btn-abrir-qr");
  const qrResult = document.getElementById("qr-result");
  const readerContainer = document.getElementById("reader");

  let html5QrCode = null;

  if (!btnAbrirQR || !readerContainer || !qrResult) {
    console.error("No se encontró uno de los elementos requeridos.");
    return;
  }

  btnAbrirQR.addEventListener("click", async () => {
    btnAbrirQR.style.display = "none";
    readerContainer.style.display = "block";

    html5QrCode = new Html5Qrcode("reader");

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    const onScanSuccess = async (decodedText) => {
      try {
        await html5QrCode.stop();       // Detén la cámara inmediatamente
        html5QrCode.clear();            // Limpia el lector
        readerContainer.style.display = "none";
      } catch (e) {
        console.warn("Error al detener la cámara:", e.message);
      }
      console.log("QR Detectado:", decodedText);

      const matricula = decodedText.split(":")[1]?.trim();
      if (!matricula) {
        qrResult.innerHTML = "<p class='text-danger'>QR inválido.</p>";
        qrResult.style.display = "block";
        return;
      }

      qrResult.innerHTML = "<p class='text-info'>⏳ Buscando alumno...</p>";
      qrResult.style.display = "block";

      const supabase = window.supabase;

      const { data, error } = await supabase
        .from("alumnos")
        .select("*")
        .eq("matricula", matricula)
        .single();

      if (error || !data) {
        qrResult.innerHTML = `<p class="text-danger">Alumno con matrícula ${matricula} no encontrado.</p>`;
        return;
      }

      qrResult.innerHTML = `
        <h3>Credencial del Alumno</h3>
        <img src="${data.foto_url}" alt="Foto del Alumno" class="img-responsive center-block" style="max-width:900px;">
        <p><strong>Nombre:</strong> ${data.nombre}</p>
        <p><strong>Matrícula:</strong> ${data.matricula}</p>
        <p><strong>Grado:</strong> ${data.grado}</p>
        <p><strong>Vigencia:</strong> ${data.vigencia}</p>
        <button id="btn-canjear" class="btn btn-success">✅ Canjear Beca</button>
        <button id="btn-no-canjear" class="btn btn-danger">❌ No Canjear</button>
      `;

      document.getElementById("btn-canjear").onclick = () => {
        alert("✅ Beca canjeada exitosamente a las " + new Date().toLocaleString());
      };

      document.getElementById("btn-no-canjear").onclick = () => {
        qrResult.innerHTML = "";
        qrResult.style.display = "none";
        btnAbrirQR.style.display = "inline-block";
      };
    };

    try {
      const cameras = await Html5Qrcode.getCameras();
      const camera = cameras.find(c => c.label.toLowerCase().includes("back")) || cameras[1] || cameras[0];
      await html5QrCode.start(camera.id, config, onScanSuccess);
    } catch (err) {
      alert("No se pudo acceder a la cámara: " + err.message);
    }
  });
});
