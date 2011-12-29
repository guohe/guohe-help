function findEntries(q) {
  // given regex q, find matches in entries dom document
  var matches = [];
  var rq = new RegExp(q, 'im');
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var title = $(entry.getElementsByTagName('title')[0]).text();
    var link = $(entry.getElementsByTagName('link')[0]).attr('href');
    var content = $(entry.getElementsByTagName('content')[0]).text();                   
    if (rq.test(title) || rq.test(link) || rq.test(content)) {
      var updated = prettyDate(xmlDateToJavascriptDate($(entry.getElementsByTagName('updated')[0]).text()));
      matches.push({'title':title, 'link':link, 'date':updated});
    }
  }
  // Build results table from matches[]
}

$('#search_form').submit(function(e) {
  // grab query and push page state
  var query = $('#query').val();                        
  window.location.hash = 'search='+escape(query.replace(/\s/g, '+'));
  e.preventDefault();
});

$(window).bind('hashchange', function(e) {
  // called when the part of the URL after the hash (#) changes         
  var query = $.param.fragment();  // e.g. "#search=text"
  if (/[#]*search=(.*)/.test(query)) {
    query = $.param.fragment().replace('+', ' ').replace('search=', '');
    $('#query').val(query);  // in case the user browsed to the search
    if (query) {
      if (oldhtml == null) { // save state!
        oldhtml = $('#content').html(); 
      }
      $('#content').html('<div id="loader"></div>');
      $('#footer').hide();
      $('#query').blur().attr('disabled', true);
      if (entries == null) {
        // lazily load and parse the atom.xml feed
        $.ajax({url:'/atom.xml?r='+(Math.random()*99999999999), dataType:'xml', success: function(data) {
          entries = data.getElementsByTagName('entry');
          findEntries(query);
        }});
      } else { 
        // search the pre-loaded atom.xml feed
        findEntries(query);
      }
      // disable the search bar until current search is complete
      $('#query').blur().attr('disabled', false);
    }
  } else {
    // revert to original page, hide search results
    if (oldhtml == null) { 
      oldhtml = $('#content').html(); 
    }
    $('#content').html(oldhtml);
    $('#footer').show();
    $('#query').blur();
    oldhtml = null;
  }
});

// called in case user browses "into" a search
$(window).trigger( 'hashchange' );