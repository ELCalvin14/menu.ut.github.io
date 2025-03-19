document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
  
    if (loginForm) {
      loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
  
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;
  
        // Validación según rol
        if (role === "admin") {
          if (username === "admin" && password === "1234") {
            localStorage.setItem("user", JSON.stringify({ user: username, role: role }));
            window.location.href = "dashboard_admin.html";
          } else {
            alert("Credenciales incorrectas para Administrador.");
          }
        } else if (role === "cafeteria") {
          if (username === "cafe25_" && password === "2345") {
            localStorage.setItem("user", JSON.stringify({ user: username, role: role }));
            window.location.href = "dashboard_cafeteria.html";
          } else {
            alert("Credenciales incorrectas para Cafetería.");
          }
        } else if (role === "alumno") {
          // Para alumnos, la matrícula debe ser la misma en usuario y contraseña
          if (username === password && username !== "") {
            // Aquí se asume que el admin ya registró al alumno; en este ejemplo se acepta si coinciden
            localStorage.setItem("user", JSON.stringify({ user: username, role: role }));
            window.location.href = "dashboard_alumno.html";
          } else {
            alert("Para alumnos, la matrícula (usuario) y la contraseña deben ser iguales.");
          }
        } else {
          alert("Por favor, selecciona un rol válido.");
        }
      });
    }
  });
  