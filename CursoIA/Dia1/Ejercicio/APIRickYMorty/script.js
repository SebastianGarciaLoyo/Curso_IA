const input = document.querySelector('.input1')
const boton = document.querySelector('.buscar1')
const container = document.querySelector('.contenedor')

boton.addEventListener('click', () =>{
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor escriba un nombre.")
        return;
    }

    fetch('https://rickandmortyapi.com/api/characters/?name=${nombre}')
    .then(res => res.json())
    .then(data => {
        container.innerHTML = "";

        if (data.error){
            container.innerHTML = '<h2>No se pudo encontrar el personaje</h2>'
            return;
        }

        data.results.forEach(personaje => {
            container.innerHTML += '<div class= "carta"> <img src= ${personaje.image}" alt="${personaje.name}"> <h3> ${personaje.name}</h3> <p><strong>Estado: </strong> ${personaje.status}</p>';
            
        });
    })
    .catch(err => console.log(err))
})