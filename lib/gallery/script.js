let $gallery = $('main');

let $nav = $gallery.find('ul');
let $figures = $gallery.find('figure');

$nav.on('click', 'img', function() {
  let $e = $(this);
  $nav.find('img.active').removeClass('active');
  $e.addClass('active');

  let newActiveIdx = $e.closest('li').index();

  $figures.filter(':visible').stop().fadeOut(200).end()
          .eq(newActiveIdx).stop().delay(200).fadeIn(200);
});

function currentActiveIdx() {
  return $nav.find('img.active').closest('li').index();
}

$('a:first-of-type').on('click', function(event) {
  event.preventDefault();
  let nextIdx = (currentActiveIdx() - 1) < 0 ? 3 : currentActiveIdx() - 1;
  $nav.find('img').eq(nextIdx).trigger('click');
});

$('a:last-of-type').on('click', function(event) {
  event.preventDefault();
  let nextIdx = (currentActiveIdx() + 1) > 3 ? 0 : currentActiveIdx() + 1;
  $nav.find('img').eq(nextIdx).trigger('click');
});