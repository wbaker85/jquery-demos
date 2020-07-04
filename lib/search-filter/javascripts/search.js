/* eslint-disable quote-props */
let games = [{
  "title": "The Legend of Zelda: Majora's Mask 3D",
  "id": 1,
  "category": "Nintendo 3DS"
}, {
  "title": "Super Smash Bros.",
  "id": 2,
  "category": "Nintendo 3DS"
}, {
  "title": "Super Smash Bros.",
  "id": 3,
  "category": "Nintendo WiiU"
}, {
  "title": "LEGO Batman 3: Beyond Gotham",
  "id": 4,
  "category": "Nintendo WiiU"
}, {
  "title": "LEGO Batman 3: Beyond Gotham",
  "id": 5,
  "category": "Xbox One"
}, {
  "title": "LEGO Batman 3: Beyond Gotham",
  "id": 6,
  "category": "PlayStation 4"
}, {
  "title": "Far Cry 4",
  "id": 7,
  "category": "PlayStation 4"
}, {
  "title": "Far Cry 4",
  "id": 8,
  "category": "Xbox One"
}, {
  "title": "Call of Duty: Advanced Warfare",
  "id": 9,
  "category": "PlayStation 4"
}, {
  "title": "Call of Duty: Advanced Warfare",
  "id": 10,
  "category": "Xbox One"
}];

let gamesObj = {};
games.forEach((game) => {
  gamesObj[game.id] = {
    title: game.title,
    category: game.category,
  };
});

let $checkBoxes = $('aside').find('input[type="checkbox"]');
let $gameLineItems = $('main').find('li');

let filterStr = '';

function updateVisibility() {
  let visibleCategories = $checkBoxes.filter(function() {
    return $(this).prop('checked');
  }).map(function() {
    return $(this).attr('value');
  }).get();

  $gameLineItems.each(function() {
    let thisId = $(this).data('id');
    let includesString = gamesObj[thisId].title.includes(filterStr);
    let includesCategory = visibleCategories
      .includes(gamesObj[thisId].category);
    $(this).toggle(includesString && includesCategory);
  });
}

$('#search').on('submit', function(event) {
  event.preventDefault();
  filterStr = $('input[type="search"]').val();
  updateVisibility();
});

$checkBoxes.on('change', updateVisibility);