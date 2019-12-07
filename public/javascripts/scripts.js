
$(document).ready(function() {

    var tbody = $("#high_fg_table tbody"),results = $('#high_fg_results');
    console.log('results>>>>>>>>')
    $.each(results, function(i, result) {
      var tr = $('<tr>');
      $.each(result, function(i, prop) {
        $('<td>').html(prop).appendTo(tr);
      });
      tbody.append(tr);
    });

});
