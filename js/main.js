// Datos temporales simulados
let libros = JSON.parse(localStorage.getItem("libros")) || [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", año: 1967, disponible: true },
  { id: 2, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", año: 1605, disponible: true },
  { id: 3, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", año: 1943, disponible: false },
  { id: 4, titulo: "El Hobbit", autor: "J.R.R. Tolkien", año: 1937, disponible: true },
  { id: 5, titulo: "Rayuela", autor: "Julio Cortázar", año: 1963, disponible: true }
];  

// Mostrar libros
function mostrarLibros() {
  const lista = document.getElementById("lista-libros");
  lista.innerHTML = "";
  libros.forEach(libro => {
    lista.innerHTML += `
      <li>
        <strong>${libro.titulo}</strong> - ${libro.autor} (${libro.año})<br>
        Disponible: ${libro.disponible ? "Sí" : "No"}<br>
        <button onclick="editarLibro(${libro.id})">Editar</button>
        <button onclick="eliminarLibro(${libro.id})">Eliminar</button>
      </li>
    `;
  });
  // Guardar cambios en almacenamiento local
  localStorage.setItem("libros", JSON.stringify(libros));
}

// Crear nuevo libro
function agregarLibro(event) {
  event.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const año = parseInt(document.getElementById("año").value);
  const disponible = document.getElementById("disponible").checked;
  
  if (!titulo || !autor || isNaN(año)) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  const nuevoLibro = {
    id: Date.now(),
    titulo,
    autor,
    año,
    disponible
  };

  libros.push(nuevoLibro);
  mostrarLibros();
  event.target.reset();
}

// Eliminar libro
function eliminarLibro(id) {
  if (!confirm("¿Estás seguro de que quieres eliminar este libro?")) {
    return;
  }
  libros = libros.filter(libro => libro.id !== id);
  mostrarLibros();
}

// Editar libro
function editarLibro(id) {
  const libro = libros.find(l => l.id === id);
  document.getElementById("titulo").value = libro.titulo;
  document.getElementById("autor").value = libro.autor;
  document.getElementById("año").value = libro.año;
  document.getElementById("disponible").checked = libro.disponible;

  // Cambiar el botón de guardar a actualizar
  document.getElementById("guardar").setAttribute("data-id", id);
  document.getElementById("guardar").innerText = "Actualizar";
  document.getElementById("guardar").onclick = (e) => actualizarLibro(e, id);
}

// Actualizar libro
function actualizarLibro(event, id) {
  event.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const año = parseInt(document.getElementById("año").value);
  const disponible = document.getElementById("disponible").checked;

  if (!titulo || !autor || isNaN(año)) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }
  // Actualizar el libro en la lista
  libros = libros.map(libro =>
    libro.id === id ? { ...libro, titulo, autor, año, disponible } : libro
  );

  mostrarLibros();
  document.getElementById("guardar").innerText = "Guardar";
  document.getElementById("guardar").onclick = agregarLibro;
  document.getElementById("libro-form").reset();
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  mostrarLibros();
  document.getElementById("libro-form").addEventListener("submit", agregarLibro);
});