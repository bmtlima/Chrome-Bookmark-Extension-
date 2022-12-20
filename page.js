
/*$(function() {
    $('#search').change(function() {
       $('#bookmarks').empty();
       dumpBookmarks($('#search').val());
       console.log($('#search').val());
    });
  });

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
}*/

var idOne;
var page = 0;
var bookId;
var bool = false;
var book;
var taba;
var url;


function dBookmarks() {
    console.log("book: " + book);
    chrome.bookmarks.getTree(function(itemTree){
        itemTree.forEach(function(item){
            pNode(item);
        });
    });
}

function pNode(node) {
    // recursively process child nodes
    if(node.children) {
        node.children.forEach(
            function(child) {
                if (child.title === "Bookmarks Bar"){
                    idOne = child.id;
                    console.log("main: " + idOne);
                }
                console.log('child.title: ' + child.title + ' sohBook: ' + book);
                if (child.title == book){
                    bool = true;
                    console.log('deu bom, aq ta o book: ' + book + ' e aq ta o child.id: ' + child.id);
                    bookId = child.id;
                    console.log(bookId);
                }
                pNode(child); 
            }
        );
        //$('#bookmarks').append(dumpTreeNodes(processNode(node.children.forEach()), query));
    }

    // print leaf nodes URLs to console
    if(node.url) { 
        console.log(node); 
    }
    //$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
}

dBookmarks("");


// Making confirmation sign invisible
var x = document.getElementById("confirmation");
x.style.display = "none";

// When button is clicked, call function update
var el = document.getElementById("pgbutton");
if(el){
    el.addEventListener("click", update);
}

// When something is added to book input
$(function() {
    $('#bkname').change(function() {
       bookUpdater($('#bkname').val());
       console.log(book);
    });
  });

function bookUpdater(bookInput) {
    book = bookInput;
}

/*
console.log('a');
//window.scrollTo(20000, 10000);
setTimeout(function() {window.scrollTo(0, 1000);},1)
console.log('b');*/

// Update value of page when button is clicked
function update(){
    x.style.display = "block";
    page = $('#pgnumber').val();
    // AAA book = $('#bkname').val();
    
    //TESTANDO

    /*chrome.bookmarks.getTree(function(itemTree){
        itemTree.forEach(function(item){
            console.log(item);
            //pNode2(item);
        });
    });
*/
    function pNode2(node) {
        // recursively process child nodes
        if(node.children) {
            node.children.forEach(
                function(child) {
                    console.log('child.title: ' + child.title + ' sohBook: ' + book);
                    if (child.title == book){
                        bool = true;
                        console.log('deu bom, aq ta o book: ' + book + ' e aq ta o child.id: ' + child.id);
                        bookId = child.id;
                        console.log(bookId);
                    }
                    pNode2(child); 
                }
            );
            //$('#bookmarks').append(dumpTreeNodes(processNode(node.children.forEach()), query));
        }
    
        // print leaf nodes URLs to console
        if(node.url) { 
            console.log(node); 
        }
        //$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
    }

    //TESTANDO
}

// Get the value of the current tab.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    taba = tabs[0];
    //console.log(taba.url);
});


// Execute when commit button is clicked.
$('#pgbutton').click(function() {

    chrome.bookmarks.getTree(function(itemTree){
        itemTree.forEach(function(item){
            console.log(item);
            //pNode2(item);
            pqp();
            function pqp(){
                var link = null;
    if (page > 0){
        link = 'javascript:(  function() %7B   window.open(%27' + taba.url + '%23page%3D' + page + '%27)%3B   %7D  )()';
    }

    function createTab(link) {

        console.log(book + ' book');
        if (taba.url.includes('#page=')){
            let pos = taba.url.indexOf('#page=');
            taba.url = taba.url.substring(0, pos);
            link = 'javascript:(  function() %7B   window.open(%27' + taba.url + '%23page%3D' + page + '%27)%3B   %7D  )()';
        }
        chrome.bookmarks.create({
            parentId: idOne,
            title: book,
            url: link
        }, callback());
    };

    createTab(link);
            }
        });
    }); 
  });

  function callback() {
    //window.location.reload();
  }

  function callback2() {
    
  }

console.log('last');