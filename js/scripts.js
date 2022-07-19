
let pokemonRepository = (function () {  //  Entered the IIFE function and now the pokemonList is "protected"
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150';
  let modalContainer = document.querySelector('#modal-container');
  let searchIcon = document.querySelector('.search-icon');

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


  function addListItem(pokemon) {  // Function addListItem is used for DOM
    let pokemonList = document.querySelector('.pokemon-list');  //.pokemon-list is ul in index
    let listPokemon = document.createElement('li');   // Creating listpokemon as a list
    let listButton = document.createElement('button');  // creating a button
        listButton.innerHTML = `<strong>${pokemon.name}</strong>`;
        listButton.classList.add('selected-button');
        listPokemon.appendChild(listButton);  // calling the listpokemon to the button
        pokemonList.appendChild(listPokemon);  // calling the pokemonList to the list
        listButtonEventListener(listButton, pokemon);
  }

  function listButtonEventListener(listButton, pokemon) {
    listButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.setAttribute('title', 'Close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideDetails);

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let entryElement = document.createElement('p');
      entryElement.innerText = `Entry: ${pokemon.id}`;

      let heightElement = document.createElement('p');
      heightElement.innerText = `Height: ${pokemon.height}`;

      let weightElement = document.createElement('p');
      weightElement.innerText = `Weight: ${pokemon.weight}`;

      let typesElement = document.createElement('p');
      typesElement.innerText = `Types: ${pokemon.types[0].type.name}`;

      if (pokemon.types.length === 2) {
        typesElement.innerText += `, ${pokemon.types[1].type.name}`;
      }

      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(entryElement);
      modal.appendChild(heightElement);
      modal.appendChild(weightElement);
      modal.appendChild(typesElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    });
  }

  function hideDetails() {
    modalContainer.classList.remove('is-visible');
  }

  function getAll() {
    return pokemonList;
  }

  function search(pokemonName) {
    return pokemonList.filter(pokemon => pokemon.name === pokemonName);
  }


  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (error) {
        console.error(error);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      // Now add the details to the item
      item.imageUrl = details.sprites.font_shiny;
      item.imageUrl = details.sprites.front_default;
      item.id = details.id;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function (error) {
        console.error(error);
    });
  }

  function showLoadingMessage() {
    document
    .querySelector('.loading-message')
    .classList
    .add('visible-on');
}


  function hideLoadingMessage() {
    document
      .querySelector('.loading-message')
      .classList
      .remove('visible-on');
  }

  window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList
       .contains('is-visible')) {
        hideDetails();
       }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideDetails();
        }
      });

      searchIcon.addEventListener('click', function() {
        if (document.getElementsByClassName('search-query')[0]) {
          return
          }
          else if (searchIcon.childElementCount === 1) {
            let bodyHeader = document.querySelector('.body-header');
            let searchQuery = document.createElement('input');
            searchQuery.setAttribute('placeholder', 'Pokémon name');
            searchQuery.classList.add('search-query');
            searchQuery.autofocus = true;
            bodyHeader.appendChild(searchQuery);

          searchQuery.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              searchQuery.value = searchQuery.value.charAt(0).toUpperCase()
                                  + searchQuery.value.slice(1);
              console.log(searchQuery.value);
              if (search(searchQuery.value)[0] !== undefined) {
                  showDetails(search(searchQuery.value)[0]);
              }
            }
          });
        }
      });

      return {
     add: add,
     addListItem: addListItem,
     getAll: getAll,
     serach: search,
     loadList: loadList,
     loadDetails: loadDetails,
     showLoadingMessage: showLoadingMessage,
     hideLoadingMessage: hideLoadingMessage
   };

 })();


//print all objects in pokemon list
pokemonRepository.loadList().then(function() {
  //data is now loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  })
})

// // registration form - validate email address and password - show error messages if not valid
// (function() {
//   let form = document.querySelector('#register-form');
//   let emailInput = document.querySelector('#email');
//   let passwordInput = document.querySelector('#password');
//
//   function showErrorMessage(input, message) {
//     let container = input.parentElement; // The .input-wrapper
//
//     // Remove an existing error
//     let error = container.querySelector('.error-message');
//     if (error) {
//       container.removeChild(error);
//     }
//
//     // Now add the error, if the message is not empty
//     if (message) {
//       let error = document.createElement('div');
//       error.classList.add('error-message');
//       error.innerText = message;
//       container.appendChild(error);
//     }
//   }
//
//   function validateEmail() {
//     let value = emailInput.value;
//
//     if (!value) {
//       showErrorMessage(emailInput, 'E-mail is a required field.');
//       return false;
//     }
//
//     if (value.indexOf('@') === -1) {
//       showErrorMessage(emailInput, 'You must enter a valid e-mail address.');
//       return false;
//     }
//
//     showErrorMessage(emailInput, null);
//     return true;
//   }
//
//   function validatePassword() {
//     let value = passwordInput.value;
//
//     if (!value) {
//       showErrorMessage(passwordInput, 'Password is a required field.');
//       return false;
//     }
//
//     if (value.length < 8) {
//       showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
//       return false;
//     }
//
//     showErrorMessage(passwordInput, null);
//     return true;
//   }
//
//   function validateForm() {
//     let isValidEmail = validateEmail();
//     let isValidPassword = validatePassword();
//     return isValidEmail && isValidPassword;
//   }
//
//   form.addEventListener('submit', (e) => {
//     e.preventDefault(); // Do not submit to the server
//     if (validateForm()) {
//       alert('Success!');
//     }
//   });
//
//   emailInput.addEventListener('input', validateEmail);
//   passwordInput.addEventListener('input', validatePassword);
// })();
