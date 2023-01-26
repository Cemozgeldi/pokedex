const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

let getPokeData = () => {
  // 1 ile 150 arasında random bir sayı üret
  let id = Math.floor(Math.random() * 150) + 1;
  // Pokeapi url'ini poke kimliği ile birleştirme

  const finalUrl = url + id;

  // fetch ile api'yi çağır
  fetch(finalUrl)
    // Gelen veriyi json formatına çevir
    .then((response) => response.json())
    // Gelen veriyi generateCard fonksiyonuna gönder
    .then((data) => {
      generateCard(data);
    });

  console.log(finalUrl);
};

let generateCard = (data) => {
  console.log(data);

  // Pokemonun canı değerini al
  const hp = data.stats[0].base_stat;

  // Pokemonun fotoğrafını al
  const imgSrc = data.sprites.other.dream_world.front_default;

  // Pokemonun Adını Al
  const pokeName = data.name.toUpperCase();

  // Pokemonun değerlerini al
  // Attack Değerini al
  const statAttack = data.stats[1].base_stat;
  // Defense Değerini al
  const statDefense = data.stats[2].base_stat;
  // Speed Değerini al
  const statSpeed = data.stats[5].base_stat;

  // Pokemonun türüne göre renk belirle
  const themeColor = typeColor[data.types[0].type.name];
  console.log(themeColor);

  card.innerHTML = `
    <p class = "hp"> 
    <span>HP</span>
    ${hp}
    </p>
  
    <img src="${imgSrc}">
    <h2 class = "poke-name">${pokeName}</h2>
    <div class=types>
    
    </div>
  
      <div class = "stats">
      <div>
          <h3>${statAttack}</h3>
          <p>Attack</p>
      </div>
      <div>
          <h3>${statDefense}</h3>
          <p>Defense</p>
      </div>
      <div>
          <h3>${statSpeed}</h3>
          <p>Speed</p>
       </div>
      </div>
    `;
  appendTypes(data.types);
  styleCard(themeColor);
};

let appendTypes = function (types) {
  const typesContainer = document.querySelector(".types");
  typesContainer.innerHTML = "";
  types.forEach((type) => {
    const typeEl = document.createElement("span");
    typeEl.classList.add("type");
    typeEl.innerText = type.type.name;
    typesContainer.appendChild(typeEl);
  });
};

let styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.background = color;
  });
};

// Butona tıklandığında getPokeData fonksiyonunu çalıştır
btn.addEventListener("click", getPokeData);
// Sekme açıldığı zaman getPokeData fonksiyonunu çalıştır
window.addEventListener("load", getPokeData);
