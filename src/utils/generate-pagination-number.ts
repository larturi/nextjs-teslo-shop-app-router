export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // Si el numero de paginas es 7 o menos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Si la pagina actual esta entre las primeras 3
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // Si la pagina actual esta entre las ultimas 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // Si la pagina actual esta entre las primeras 3 y las ultimas 3
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}
