const publicKey = '2a0fb597501de763eb6ac1fb066e02a3';

// Seleccionar el elemento #results después de que se haya cargado el DOM
document.addEventListener('DOMContentLoaded', function() {
  const resultsSection = document.querySelector('#results');

  // Agregar event listener al form con id="search-form"
  document.querySelector('#search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.querySelector('#search-input').value.trim();

    if (searchInput === '') {
      alert('Por favor, ingrese un término de búsqueda.');
      return;
    }

    // Limpiar resultados anteriores
    resultsSection.innerHTML = '';

    // Construir la URL de la API de Marvel con la información de autenticación
    const ts = new Date().getTime();
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchInput}&ts=${ts}&apikey=${publicKey}`;

    // Realizar solicitud a la API de Marvel
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data.data && data.data.results && data.data.results.length === 0) {
          alert('No se encontraron resultados para la búsqueda especificada.');
          return;
        }

        // Mostrar resultados en la página
        data.data.results.forEach(result => {
          const resultDiv = document.createElement('div');
          resultDiv.classList.add('result');
          resultDiv.innerHTML = `
            <img src="${result.thumbnail.path}.${result.thumbnail.extension}">
            <h2>${result.name}</h2>
            <p>${result.description || 'No se encontró ninguna descripción para este personaje.'}</p>
          `;
          resultsSection.appendChild(resultDiv);
        });
      })
      .catch(error => {
        alert('Se produjo un error al realizar la solicitud a la API de Marvel.');
        console.error(error);
      });
  });

  // Agregar event listener al botón #clear-results
  document.querySelector('#clear-results').addEventListener('click', function() {
    resultsSection.innerHTML = '';
  });
});
