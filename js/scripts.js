//Written Pokedex
var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var $pokemonList = $('ul');
  var $modalContainer = $('#modal-container');

  //Function to get all pokemon data
  function getAll() {
    return repository;
  }

  //Function to add list item/button for each pokemon object
  function addListItem(pokemon){
    var $listItem = $('<li></li>');
    $pokemonList.append($listItem);
    var $button = $('<button class="pokemon-name"></button>');
    $button.text(pokemon.name)
    $listItem.append($button);
    $button.on('click', function () {showDetails(pokemon);});
    $modalContainer.off('click');

    //function add(pokemon) {repository.push(pokemon);  }
  }

  //Show pokemon details
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //Show modal for each pokemon after clicking
  function showModal(item) {
    $modalContainer.empty();

    var $modal = $('<div class="modal"></div>');
    var $closeButtonElement = $('<button class="modal-close">Close</button>');
    $closeButtonElement.on('click', function (event) {
      hideModal();
    });

    var $titleElement = $('<h1>' + item.name + '</h1>');
    var $imageElement = $('<img src=" ' +item.imageUrl+ ' " class="modal-img">');
    var $contentElement = $('<p>' + 'Height: '+ item.height +'</p>');

    $modal.append($closeButtonElement);
    $modal.append($titleElement);
    $modal.append($contentElement);
    $modal.append($imageElement);
    $modalContainer.append($modal);
    $modalContainer.addClass('is-visible');
  }

  //Hide Modal & Event Listeners
    function hideModal() {
    $modalContainer.removeClass('is-visible');
    }

    $(document).keydown(function (e) {  if (e.key === "Escape") { hideModal();} });

    $modalContainer.click(function() {  hideModal();});


    //Function to add new pokemon data
    function add(name) {
      repository.push(name);
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
  //showModal: showModal,
  hideModal: hideModal
};


})();




pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
