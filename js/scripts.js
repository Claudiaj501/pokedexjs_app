// Declaring Pojemon List arracy - wrapped in IIFE
let pokemonRepository = (function () {
  let repos = [
// Bulbasaur
    {name:'Bulbasaur' , height: 71.12, weight: 6.89, type:['Grass', 'Poison'], abilities: ['Overgrow'], weaknesses: ['Fire', 'Psychic', 'Ice', 'Flying'] },
// Charmander
    {name:'Charmander' , height: 60.96, weight: 8.48, type:['Fire'], abilities: ['Blaze'], weaknesses: ['Water', 'Ground', 'Rock']},
// Squirtle
    {name:'Squirtle' , height: 50.8, weight: 8.98, type:['Water'], abilities: ['Torrent'], weaknesses: ['Grass', 'Electric']},
// Jigglypuff
    {name:'Jigglypuff' , height: 50.8, weight: 5.49, type:['Normal', 'Fairy'], abilities:['Cure charm', 'Competitive'], weaknesses:['Steel', 'Poison']},
// Abra
    {name:'Abra', height: 88.9, weight: 19.5, type:['Psychic'], abilities:['Inner focus', 'Synchronize'], weaknesses:['Ghost', 'Dark', 'Bug']},
// Gastly
    {name:'Gastly' , height: 129.54, weight: 0.09, type:['Ghost', 'Poison'], abilities:['Levitate'], weaknesses:['Ghost', 'Dark', 'Psychic', 'Ground']}
  ];
  // manipulating DOM - FUNCTION : add pokemon and validate typeof
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "type" in pokemon
    ) {
      repos.push(pokemon);
    } else {
      console.log("pokemon is invalid");
    }
  }
  // Retrieves pokemonList
  function getAll() {
    return repos;
  }
  // Add buttons - these are assigned with data from pokemon list
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listPokemon.appendChild(button);
      pokemonList.appendChild(listPokemon);
      button.addEventListener('click', function () {
      showDetails(pokemon);
    });
 }

 //Currently "clicked" pokemon - name will appear in console log
  function showDetails(pokemon) {
      console.log(pokemon);

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails

  };
})();

pokemonRepository.add({ name: 'Caterpie', height: 30.48, weight: 2.9, type: ['Bug'], abilities:['Shield Dust'], weaknesses:['Fire', 'Flying', 'Rock'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

// // FOR loop. "i" is short for "item". To run the length of the array.
// for (let i=0; i < pokemonList.length; i++){
// // Creating a condition to isolate the largest pokemon and give it a comment
// // First condition is to isolate a pokemon larger than 100cm. The rest must then print as normal
//     if (pokemonList[i].height > 100) {
//         document.write(pokemonList[i].name + " (" +
//         pokemonList[i].height + "cm)- Wow, that\'s big!'" + "<br>");
//     } else {
//         document.write(pokemonList[i].name + " (" +
//         pokemonList[i].height + "cm)"+ "<br>");
//     }
// }


// foreach loop
// pokemonRepository.getAll().forEach(function(pokemon) {
//   if (pokemon.height > 100) {
//       document.write(pokemon.name + " (" +
//       pokemon.height + "cm)- Wow, that\'s big!'" + "<br>");
//   } else {
//       document.write(pokemon.name + " (" +
//       pokemon.height + "cm)"+ "<br>");
//   }
// });
