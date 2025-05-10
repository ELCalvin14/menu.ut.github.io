
document.addEventListener("DOMContentLoaded", function () {
  const supabaseUrl = 'https://oazglvoajuusprtfhqpy.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hemdsdm9hanV1c3BydGZocXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NDI3NzAsImV4cCI6MjA2MjQxODc3MH0.Qag6C8LMf5nRMg4JBvvHQ2mf6eW0wc1wKi78Euwq2vA';
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim().toLowerCase();
      const password = document.getElementById("password").value.trim();
      const role = document.getElementById("role").value;

      let tabla = "";
      let campoUsuario = "nombre";
      let campoContrasena = "contrasena";

      switch (role) {
        case "admin":
          tabla = "administradores";
          break;
        case "cafeteria":
          tabla = "cafeteria";
          break;
        case "alumno":
          tabla = "alumnos";
          campoUsuario = "matricula";
          break;
        default:
          alert("Selecciona un rol válido.");
          return;
      }
      console.log(username, password, role, tabla);

      // Consultar en Supabase
      const { data, error } = await supabase
        .from(tabla)
        .select("*")
        .ilike(campoUsuario, username)
        .ilike(campoContrasena, password);

      console.log(data);

      if (error) {
        alert("Error al conectar con la base de datos.");
        console.error(error);
        return;
      }

      if (data.length === 1) {
        localStorage.setItem("user", JSON.stringify({ user: username, role }));
        window.location.href =
          role === "admin"
            ? "dashboard_admin.html"
            : role === "cafeteria"
            ? "dashboard_cafeteria.html"
            : "dashboard_alumno.html";
      } else {
        alert("Credenciales inválidas.", error);
      }
    });
  }
});