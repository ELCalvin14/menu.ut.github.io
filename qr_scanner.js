function onScanSuccess(decodedText, decodedResult) {
  console.log("QR Detectado:", decodedText);

  const matricula = decodedText.split(":")[1]?.trim();
  if (!matricula) {
    qrResult.innerHTML = "<p class='text-danger'>QR inválido.</p>";
    qrResult.style.display = "block";
    return;
  }

  // Muestra mensaje mientras busca
  qrResult.innerHTML = "<p class='text-info'>⏳ Buscando alumno...</p>";
  qrResult.style.display = "block";

  // Buscar en Supabase
  supabase
    .from("alumnos")
    .select("*")
    .eq("matricula", matricula)
    .single()
    .then(async ({ data, error }) => {
      if (error || !data) {
        qrResult.innerHTML = `<p class="text-danger">Alumno con matrícula ${matricula} no encontrado.</p>`;
        return;
      }

      // Detener cámara *después* de haber resuelto todo lo anterior
      try {
        await html5QrCode.stop();
        readerContainer.style.display = "none";
      } catch (stopError) {
        console.warn("Error al detener la cámara o procesar QR:", stopError);
        alert("Ocurrió un error al procesar el QR.");
      }

      // Mostrar datos reales del alumno
      qrResult.innerHTML = `
        <h3>Credencial del Alumno</h3>
        <img src="${data.foto_url}" alt="Foto del Alumno" class="img-responsive center-block" style="max-width:300px;">
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
    });
}
