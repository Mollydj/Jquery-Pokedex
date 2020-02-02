//Pokemon
var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var $pokemonList = $('ul');
  var $modalContainer = $('#modal-container');

  function add(name) {
    repository.push(name);
  }

  function getAll() {
    return repository;
  }

  //>Button and List Informartion
  function addListItem(pokemon){
    var $listItem = $('<li></li>');
      $pokemonList.append($listItem);
    var $button = $('<button class="pokemon-name" class="modal-close">' + pokemon.name + '</button>');
    $listItem.append(button);

    button.on('click', function () {
      showDetails(pokemon);
    });
  }
  //< End of Button and List Information

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(item) {
    // Clear all existing modal content
    $modalContainer.textHTML = '';

    var $modal = $('<div class="modal"></div>');
    var $closeButtonElement = $('<button class="modal-close">Close</button>');
    closeButtonElement.addEventListener('click', hideModal);

    var $titleElement = $('<h1></h1>');
    titleElement.text = item.name;

    var $imageElement = $('<img src=" ' +item.imageUrl+ ' " class="modal-img">');
    imageElement.src = item.imageUrl;

    var $contentElement = $('<p></p>');
    contentElement.text = 'Height: '+ item.height;

    $modal.append($closeButtonElement);
    $modal.append($titleElement);
    $modal.append($contentElement);
    $modal.append($imageElement);
    $modalContainer.append($modal);
    $modalContainer.addClass('is-visible');
  }

function hideModal() {
  $modalContainer.remove('is-visible');
}


window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

$('$modalContainer').on('click', function (e) {
  var target = e.target;
  if (target ===$modalContainer)
{  hideModal(); }
});

$('$modalContainer').off('click');

function add(pokemon) {
  repository.push(pokemon);
}



function loadList() {
  return $.ajax(apiUrl, { dataType: 'json' })
  .then(function(item) {
    $.each(item.results, function(index, item) {
      var pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  })
  .catch(function(error) {
    /*Load Functions Set In Order To Retrieve Data From Pokemon API*/
    document.write(error);
  });
}

function loadDetails(item) {
  var url = item.detailsUrl;
  return $.ajax(url, {dataType: 'json'}).then(function(responseJSON) {
    return responseJSON;
  }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.weight = details.weight;
    item.types = Object.keys(details.types);
  }).catch(function (e) {
    console.error(e);
  });
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  showDetails: showDetails,
  loadList: loadList,
  loadDetails: loadDetails,
  showModal: showModal,
  hideModal: hideModal
};


})();




pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
