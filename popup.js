

// Search the bookmarks when entering the search keyword.

$(function() {
    $('#search').change(function() {
       $('#bookmarks').empty();
       dumpBookmarks($('#search').val());
       console.log($('#search').val());
    });
  });

  // Traverse the bookmark tree, and print the folder and nodes.
  function dumpBookmarks(query) {
    var bookmarkTreeNodes = chrome.bookmarks.getTree(
      function(bookmarkTreeNodes) {
        $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
      });
    
  }

  var dad;

  function dumpTreeNodes(bookmarkNodes, query) {
    //console.log(bookmarkNodes);
    var list = $('<ul>');
    var i;
    for (i = 0; i < bookmarkNodes.length; i++) {
        list.append(dumpNode(bookmarkNodes[i], query));
    }
    return list;
  }

  function dumpNode(bookmarkNode, query) {
    if (bookmarkNode.title) {
      if (query && !bookmarkNode.children) {
        if (String(bookmarkNode.title).indexOf(query) == -1) {
          return $('<span></span>');
        }
      }
      var anchor = $('<a>');
      anchor.attr('href', bookmarkNode.url);
      anchor.text(bookmarkNode.title);
       /*
       * When clicking on a bookmark in the extension, a new tab is fired with
       * the bookmark url.
       */
      anchor.click(function() {
        chrome.tabs.create({url: bookmarkNode.url});
      });
      var span = $('<span>');
      var options = $('<span>[<a id="deletelink" ' +
      'href="#">Delete</a>]</span>');
      
        // Show add and edit links when hover over.
          span.hover(function() {
          span.append(options);
          $('#deletelink').click(function() {
            chrome.bookmarks.remove(String(bookmarkNode.id));
            chrome.bookmarks.removeTree(String(bookmarkNode.id));
            span.parent().remove();
            if (children){
              span.children().remove();
            }
            $(this).dialog('destroy');
          });

          options.fadeIn();
        },
        // unhover
        function() {
          options.remove();
        }).append(anchor);
        
    } 
    var li = $(bookmarkNode.title ? '<li>' : '<a>').append(span);
    if (bookmarkNode.children && bookmarkNode.children.length > 0) {
      li.append(dumpTreeNodes(bookmarkNode.children, query));
    }

    return li;

  }
  
  document.addEventListener('DOMContentLoaded', function () {
    dumpBookmarks();
  });