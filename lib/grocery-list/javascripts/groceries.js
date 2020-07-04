"use strict";

$('form').on('submit', (event) => {
  event.preventDefault();

  let $form = $(event.target);

  let name = $form.find('#name').val();
  let qty = $form.find('#quantity').val() || 1;
  console.log(name, qty);

  $('ul').append(`<li>${qty} ${name}</li>`);
  $form.get(0).reset();
});