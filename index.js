const input = document.getElementById("pokemonInput");
const boton = document.getElementById("search");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const nameEl = document.getElementById("name");
const imgEl = document.getElementById("sprite");
const typeEl = document.getElementById("type");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");

boton.addEventListener("click", getPokemon);

async function getPokemon() {
    const value = input.value.toLowerCase().trim(); 

    if (!value) {
        error.textContent = "Escribí un Pokémon";
        return;
    }

    error.textContent = "";
    loading.style.display = "block"; 

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);

        if (!res.ok) {
            throw new Error("Pokémon no encontrado");
        }

        const data = await res.json();


        nameEl.textContent = data.name;
        imgEl.src = data.sprites.front_default;

        typeEl.textContent = data.types.map(t => t.type.name).join(", ");
        weightEl.textContent = data.weight;
        heightEl.textContent = data.height;

    } catch (err) {
        error.textContent = err.message;
        nameEl.textContent = "";
        imgEl.src = "";
        typeEl.textContent = "";
        weightEl.textContent = "";
        heightEl.textContent = "";
    } finally {
        loading.style.display = "none";
    }
}