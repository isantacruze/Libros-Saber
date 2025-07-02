import { cargarLibros } from './catalogo.js';
import { configurarFormulario } from './formulario.js';

document.addEventListener('DOMContentLoaded', () => {
  cargarLibros();
  configurarFormulario();
});
