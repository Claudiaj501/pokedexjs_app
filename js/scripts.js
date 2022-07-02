
let pokemonRepository = (function () {  //  Entered the IIFE function and now the pokemonList is "protected"
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150';

  function add(pokemon) {   //Entered add function that declares typeof pokemon
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {    //Added getAll function to get all pokemon
    return pokemonList;  //Return function takes the pokemon from the array
  }

  function addListItem(pokemon) {  // Function addListItem is used for DOM
    let pokemonList = document.querySelector(".pokemon-list");  //.pokemon-list is ul in index
    let listPokemon = document.createElement("li");   // Creating listpokemon as a list
    let button = document.createElement("button");  // creating a button
    button.innerText = pokemon.name;   // creating text to be pokemon names for button
    button.classList.add("button-class");  // Having the button take on style from css
    listPokemon.appendChild(button);  // calling the listpokemon to the button
    pokemonList.appendChild(listPokemon);  // calling the pokemonList to the list
    eventListener(button, pokemon);  //  added eventListener with two parameters
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function eventListener (button, pokemon) {  //eventListener has two parameters
    button.addEventListener('click', function (){  //the function uses the event listner by click and calls showDetails
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        hideLoader();
      });
    }).catch(function (e) {
      console.error(e);
      hideLoader();
    })
  }

  function loadDetails(item) {
    showLoader();
    let url = item.detailsUrl;
    return fetch(url). then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now add the details to the item
      item.imageUrl = details.sprites.font_default;
      item.height = details.height;
      item.types = details.types;
      hideLoader();
    }).catch(function (e) {
      console.error(e);
      hideLoader();
    });
  }

  function showDetails(pokemon) {  //Function for the event listener. Show details for pokemon
    loadDetails(pokemon).then(function () {
      showModal(pokemon); //show modal 
    });
  }

  return {
    add: add,         //Calling add function
    getAll: getAll,    //Calling getAll function
    addListItem: addListItem,  //Calling addListItem function
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

console.log(pokemonRepository.getAll());

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// registration form - validate email address and password - show error messages if not valid
(function() {
  let form = document.querySelector('#register-form');
  let emailInput = document.querySelector('#email');
  let passwordInput = document.querySelector('#password');

  function showErrorMessage(input, message) {
    let container = input.parentElement; // The .input-wrapper

    // Remove an existing error
    let error = container.querySelector('.error-message');
    if (error) {
      container.removeChild(error);
    }

    // Now add the error, if the message is not empty
    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  }

  function validateEmail() {
    let value = emailInput.value;

    if (!value) {
      showErrorMessage(emailInput, 'E-mail is a required field.');
      return false;
    }

    if (value.indexOf('@') === -1) {
      showErrorMessage(emailInput, 'You must enter a valid e-mail address.');
      return false;
    }

    showErrorMessage(emailInput, null);
    return true;
  }

  function validatePassword() {
    let value = passwordInput.value;

    if (!value) {
      showErrorMessage(passwordInput, 'Password is a required field.');
      return false;
    }

    if (value.length < 8) {
      showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
      return false;
    }

    showErrorMessage(passwordInput, null);
    return true;
  }

  function validateForm() {
    let isValidEmail = validateEmail();
    let isValidPassword = validatePassword();
    return isValidEmail && isValidPassword;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not submit to the server
    if (validateForm()) {
      alert('Success!');
    }
  });

  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);
})();
