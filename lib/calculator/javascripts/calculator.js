$(function() {
  $("form").on("submit", function(e) {
    var $form = $(e.target),
        numerator = +$form.find("#numerator").val(),
        denominator = +$form.find("#denominator").val(),
        operator = $form.find("#operator").val(),
        result = 0;

    e.preventDefault();

    if (operator === "+") {
      result = numerator + denominator;
    }
    if (operator === "-") {
      result = numerator - denominator;
    }
    if (operator === "*") {
      result = numerator * denominator;
    }
    if (operator === "/") {
      result = numerator / denominator;
    }

    $("h1").text(result);
  });
});