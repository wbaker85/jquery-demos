let $canvas = $('#canvas');

function getFormData($form) {
  let formData = {};

  $form.serializeArray().forEach((obj) => {
    formData[obj.name] = obj.value;
  });

  return formData;
}

function startAnimations() {
  let $shapes = $canvas.find('div');

  $shapes.each(function() {
    let $thisShape = $(this);

    $thisShape.stop().css({
      top: Number($thisShape.data('start_y')),
      left: Number($thisShape.data('start_x')),
    }).animate({
      top: Number($thisShape.data('end_y')),
      left: Number($thisShape.data('end_x')),
    }, 1000);
  });
}

function stopAnimations() {
  $canvas.find('div').stop();
}

$('#animate').on('click', function(event) {
  event.preventDefault();
  startAnimations();
});

$('#stop').on('click', function(event) {
  event.preventDefault();
  stopAnimations();
});

$('form').on('submit', function(event) {
  event.preventDefault();
  let formData = getFormData($(this));

  $canvas.append(`<div class="${formData.shape_type.toLowerCase()}"></div>`);
  let $newShape = $canvas.find('div:last-of-type');

  Object.keys(formData).forEach((key) => {
    $newShape.data(key, formData[key]);
  });

  $newShape.css({
    top: Number($newShape.data('start_y')),
    left: Number($newShape.data('start_x')),
  });
});