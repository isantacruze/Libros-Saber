let libros = JSON.parse(localStorage.getItem("libros")) || [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", año: 1967, disponible: true },
  { id: 2, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", año: 1605, disponible: true },
  { id: 3, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", año: 1943, disponible: false },
  { id: 4, titulo: "El Hobbit", autor: "J.R.R. Tolkien", año: 1937, disponible: true },
  { id: 5, titulo: "Rayuela", autor: "Julio Cortázar", año: 1963, disponible: true }
];

let filtroActual = "";

function mostrarLibros() {
  const lista = document.getElementById("lista-libros");
  lista.innerHTML = "";

  const librosFiltrados = libros.filter(libro =>
    libro.titulo.toLowerCase().includes(filtroActual) ||
    libro.autor.toLowerCase().includes(filtroActual)
  );

  if (librosFiltrados.length === 0) {
    lista.innerHTML = "<li>No se encontraron libros.</li>";
    return;
  }

  librosFiltrados.forEach(libro => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${libro.titulo}</strong> - ${libro.autor} (${libro.año})<br>
      Disponible: ${libro.disponible ? "Sí" : "No"}
    `;

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn");
    btnEditar.onclick = () => cargarFormularioParaEditar(libro.id);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn");
    btnEliminar.onclick = () => eliminarLibro(libro.id);

    li.appendChild(document.createElement("br"));
    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);

    lista.appendChild(li);
  });

  localStorage.setItem("libros", JSON.stringify(libros));
}

function manejarSubmit(event) {
  event.preventDefault();

  const idEditando = event.target.dataset.editingId;
  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();
  const año = parseInt(document.getElementById("año").value);
  const disponible = document.getElementById("disponible").checked;

  if (!titulo || !autor || isNaN(año)) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  if (idEditando) {
    libros = libros.map(libro =>
      libro.id == idEditando ? { ...libro, titulo, autor, año, disponible } : libro
    );
    event.target.querySelector("button[type='submit']").textContent = "Guardar libro";
    delete event.target.dataset.editingId;
  } else {
    const nuevoLibro = {
      id: Date.now(),
      titulo,
      autor,
      año,
      disponible
    };
    libros.push(nuevoLibro);
  }

  event.target.reset();
  mostrarLibros();
}

function cargarFormularioParaEditar(id) {
  const libro = libros.find(l => l.id === id);
  const form = document.getElementById("libro-form");

  form.dataset.editingId = libro.id;
  form.titulo.value = libro.titulo;
  form.autor.value = libro.autor;
  form.año.value = libro.año;
  form.disponible.checked = libro.disponible;

  form.querySelector("button[type='submit']").textContent = "Actualizar";
}

function eliminarLibro(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este libro?")) {
    libros = libros.filter(libro => libro.id !== id);
    mostrarLibros();
  }
}

function configurarFiltro() {
  const inputBusqueda = document.getElementById("busqueda-libros");
  inputBusqueda.addEventListener("input", (e) => {
    filtroActual = e.target.value.trim().toLowerCase();
    mostrarLibros();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarLibros();
  document.getElementById("libro-form").addEventListener("submit", manejarSubmit);
  configurarFiltro();
});
