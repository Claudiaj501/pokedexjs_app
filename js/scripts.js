// Declaring Pojemon List arracy
let pokemonList = [
// Bulbasaur
    {name:['Bulbasaur'] , height: 71.12, weight: 6.89, type:['Grass', 'Poison'], abilities: ['Overgrow'], weaknesses: ['Fire', 'Psychic', 'Ice', 'Flying'] },
// Charmander
    {name:['Charmander'] , height: 60.96, weight: 8.48, type:['Fire'], abilities: ['Blaze'], weaknesses: ['Water', 'Ground', 'Rock']},
// Squirtle
    {name:['Squirtle'] , height: 50.8, weight: 8.98, type:['Water'], abilities: ['Torrent'], weaknesses: ['Grass', 'Electric']},
// Jigglypuff
    {name:['Jigglypuff'] , height: 50.8, weight: 5.49, type:['Normal', 'Fairy'], abilities:['Cure charm', 'Competitive'], weaknesses:['Steel', 'Poison']},
// Abra
    {name:['Abra'], height: 88.9, weight: 19.5, type:['Psychic'], abilities:['Inner focus', 'Synchronize'], weaknesses:['Ghost', 'Dark', 'Bug']},
// Gastly
    {name:['Gastly'] , height: 129.54, weight: 0.09, type:['Ghost', 'Poison'], abilities:['Levitate'], weaknesses:['Ghost', 'Dark', 'Psychic', 'Ground']}
  ];



  // Wiring Pokemon name and height onto DOM using 'for'
  for (let i=0; i<pokemonList.length; i++){
    document.write(pokemonList[i].name + ' '+ 'height is ''+ pokemonList[i].height +'cm!'');
