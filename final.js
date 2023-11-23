async function agregarPokemon() {
    let nombrePokemon = document.getElementById('pokemonName').value.trim();

    if (nombrePokemon !== '') {
        try {
            
            const response = await fetch('./pokedex.json');
            const pokedexData = await response.json();

            
            const pokemonData = pokedexData.find(pokemon => pokemon.name.english.toLowerCase() === nombrePokemon.toLowerCase());

            
            if (pokemonData) {
                
                var equipoActual = JSON.parse(localStorage.getItem('equipoPokemon')) || [];

            
                equipoActual.push({
                    name: pokemonData.name.english,
                    id: pokemonData.id,
                    types: pokemonData.type,
                    imageUrl: pokemonData.image.hires,
                });

                
                localStorage.setItem('equipoPokemon', JSON.stringify(equipoActual));

                
                actualizarListaEquipo();
            } else {
                alert('No se encontró información para el Pokémon ingresado. Verifica el nombre.');
            }
        } catch (error) {
            console.error('Error al agregar el Pokémon:', error);
            alert('Hubo un error al agregar el Pokémon. Por favor, recarga la página e intentalo de nuevo.');
        }
    } else {
        alert('Por favor, introduce un nombre válido para el Pokémon.');
    };
}

function actualizarListaEquipo() {
    let equipoLista = document.getElementById('equipoLista');
    let equipoActual = JSON.parse(localStorage.getItem('equipoPokemon')) || [];

    equipoLista.innerHTML = '';

    
    equipoActual.forEach(function (pokemon) {
        var listItem = document.createElement('li');

        
        var pokemonContainer = document.createElement('div');

        
        var imagenPokemon = document.createElement('img');
        imagenPokemon.classList.add('sprites')
        imagenPokemon.src = pokemon.imageUrl;
        imagenPokemon.alt = pokemon.name;

        
        pokemonContainer.appendChild(imagenPokemon);

        
        var detallesPokemon = document.createElement('ul');
        detallesPokemon.classList.add('infoSprites')
        detallesPokemon.innerHTML =
            `<li> Name: ${pokemon.name}</li>
        <li> ID: ${pokemon.id}</li> 
        <li> Type: ${pokemon.types.join(', ')}</li>
        `

        var imagenCarousel = document.createElement('img');
        imagenCarousel.classList.add('imgPokemon');
        imagenCarousel.src = pokemon.imageUrl;
        imagenCarousel.alt = pokemon.name;

        
        const carouselInner = document.querySelector(".carousel-inner");
        const carouselItemActive = document.querySelector('.carousel-item.active');

        
        const nuevoCarouselItem = document.createElement('div');
        nuevoCarouselItem.classList.add('carousel-item');

        // Agrega la imagen al nuevo carousel-item
        nuevoCarouselItem.appendChild(imagenCarousel);

        // Agrega el nuevo carousel-item al carousel-inner
        carouselInner.appendChild(nuevoCarouselItem);

        // Quita la clase 'active' del carousel-item anterior
        carouselItemActive.classList.remove('active');

        // Agrega la clase 'active' al nuevo carousel-item
        nuevoCarouselItem.classList.add('active');
        
        pokemonContainer.appendChild(detallesPokemon);

        
        listItem.appendChild(pokemonContainer);

    
        equipoLista.appendChild(listItem);
    });
}

function mostrarContenido() {
    const pokedex = document.getElementById('pokedex');
    const primerDiv = document.getElementById('firstDiv')

    if (!pokedex.style.display || pokedex.style.display === "none") {
        pokedex.style.display = "grid";
        primerDiv.style.display = "none";
    }
}

function limpiarStorage() {
    localStorage.clear()
    equipoLista.innerHTML = '';
    const carouselInner = document.querySelector(".carousel-inner");
    carouselInner.innerHTML = ''; 
}

function mostrarInfo (){
    const firstDiv_info = document.getElementById("firstDiv_Info")
    const infoLegal = document.getElementById("infoLegal")

    if (!firstDiv_info.style.display || firstDiv_info.style.display === "block"){
        firstDiv_info.style.display = "none"
        infoLegal.style.display = "block"    
    }
}

window.onload = function () {
    actualizarListaEquipo();
    
}