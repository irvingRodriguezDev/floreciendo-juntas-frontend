import React from "react";
import "./Pagination.css"; // Asegúrate de crear este archivo CSS

/**
 * Componente de paginación reutilizable.
 * @param {object} props - Propiedades del componente.
 * @param {number} props.currentPage - La página actual.
 * @param {number} props.totalPages - El número total de páginas disponibles.
 * @param {function} props.onPageChange - Función de callback para cambiar la página.
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Genera un array de números de página para mostrar en los botones
  const pageNumbers = [];
  const maxPagesToShow = 5; // Limita el número de botones a mostrar

  // Lógica para mostrar solo un rango de páginas (para evitar una barra de navegación enorme)
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Ajustar el inicio si el final está al máximo
  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Manejadores de eventos
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null; // No mostrar el componente si solo hay una página o menos
  }

  return (
    <div className='pagination-container'>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className='pagination-button'
      >
        &lsaquo; Anterior
      </button>

      {/* Botones de número de página */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`pagination-button ${
            number === currentPage ? "active" : ""
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className='pagination-button'
      >
        Siguiente &rsaquo;
      </button>
    </div>
  );
};

export default Pagination;
