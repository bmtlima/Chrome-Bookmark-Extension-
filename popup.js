/*var page;

  $(function() {
    $('#pageadd').change(function() {
    page = $('#pageadd').val();
    console.log(page);
    });
});

  $( "form" ).submit(function( event ) {
    if ( $( "input" ).first().val() === "correct" ) {
      console.log('hi');
    }
   
    $( "span" ).text( "Not valid!" ).show().fadeOut( 1000 );
    event.preventDefault();
  });*/

  /*function dumpBookmarks(query) {
    chrome.bookmarks.getTree(function(itemTree){
        itemTree.forEach(function(item){
            processNode(item);
        });
    });
  }

  function processNode(node) {
    // recursively process child nodes
    if(node.children) {
        node.children.forEach(function(child) { processNode(child); });
        //$('#bookmarks').append(dumpTreeNodes(processNode(node.children.forEach()), query));
    }

    // print leaf nodes URLs to console
    if(node.url) { console.log(node.url); }
    //$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
}*/

// Search the bookmarks when entering the search keyword.

$(function() {
    $('#search').change(function() {
       $('#bookmarks').empty();
       dumpBookmarks($('#search').val());
       console.log($('#search').val());
    });
  });
    
//TESTE 

/*
  function dumpBookmarks(query) {
    chrome.bookmarks.getTree(function(itemTree){
        itemTree.forEach(function(item){
            processNode(item);
        });
    });
  }

  function processNode(node) {
    // recursively process child nodes
    if(node.children) {
        node.children.forEach(function(child) { processNode(child); });
        //$('#bookmarks').append(dumpTreeNodes(processNode(node.children.forEach()), query));
    }

    // print leaf nodes URLs to console
    if(node.url) { console.log(node); }
    //$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
}
*/

// FIM DO TESTE


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
        // console.log('esse eh o tamanho de bookmarkNodes ' + bookmarkNodes.length);
        //console.log(i + ' ' + bookmarkNodes[i].id);
        /*if (bookmarkNodes[i].title === 'Bookmarks Bar' ){
            dad = bookmarkNodes[i].id;
            console.log(dad);
        }*/
        list.append(dumpNode(bookmarkNodes[i], query));
    }
    //console.log(list);
    return list;
  }

  function dumpNode(bookmarkNode, query) {
    /*console.log(bookmarkNode);
    if (bookmarkNode.title === "Bookmarks Bar"){
        dad = bookmarkNode.id;
        console.log('deu bom ' +  dad);
        console.log(dad === 1);
    }*/
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
      var options = bookmarkNode.children ?
        $('<span>[<a href="#" id="addlink">Add</a>]</span>') :
        $('<span>[<a id="deletelink" ' +
          'href="#">Delete</a>]</span>');
      var edit = bookmarkNode.children ? $('<table><tr><td>Name</td><td>' +
        '<input id="title"></td></tr><tr><td>URL</td><td><input id="url">' +
        '</td></tr></table>') : $('<input>');
      
        // Show add and edit links when hover over.
          span.hover(function() {
          span.append(options);
          $('#deletelink').click(function() {
            chrome.bookmarks.remove(String(bookmarkNode.id));
            span.parent().remove();
            $(this).dialog('destroy');
          });

          $('#addlink').click(function() {
            $('#adddialog').empty().append(edit).dialog({autoOpen: false,
              closeOnEscape: true, title: 'Add New Bookmark', modal: true,
              buttons: {
              'Add' : function() {
                 chrome.bookmarks.create({parentId: bookmarkNode.id,
                   title: 'Book: ' + $('#title').val(), url: $('#url').val()});
                 $('#bookmarks').empty();
                 $(this).dialog('destroy');
                 window.dumpBookmarks();
               },
              'Cancel': function() {
                 $(this).dialog('destroy');
              }
            }}).dialog('open');
          });



          /*$('#editlink').click(function() {
           edit.val(anchor.text());
           $('#editdialog').empty().append(edit).dialog({autoOpen: false,
             closeOnEscape: true, title: 'Edit Title', modal: true,
             show: 'slide', buttons: {
                'Save': function() {
                   chrome.bookmarks.update(String(bookmarkNode.id), {
                     title: edit.val()
                   });
                   anchor.text(edit.val());
                   options.show();
                   $(this).dialog('destroy');
                },
               'Cancel': function() {
                   $(this).dialog('destroy');
               }
           }}).dialog('open');
          });*/
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

    //console.log(li[0].innerHTML);

    /*const text = "style = 'display: none;'";
    let inicio = li[0].innerHTML.substring(0,9);
    let fim = li[0].innerHTML.substring(8);

    if (li[0].innerHTML.includes('Ecolekl')){
        li[0].innerHTML = inicio + text + fim;
    }


    if(li[0].innerHTML.includes('google')){
        return li;
    }
    else {
        return $('<span></span>');
    }*/
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    dumpBookmarks();
  });