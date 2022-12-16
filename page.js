
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
                    //console.log("main: " + main);
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

// Retrieving the page number inserted by the user
var el = document.getElementById("pgbutton");
if(el){
    el.addEventListener("click", update);
}

/*
console.log('a');
//window.scrollTo(20000, 10000);
setTimeout(function() {window.scrollTo(0, 1000);},1)
console.log('b');*/

function update(){
    x.style.display = "block";
    page = $('#pgnumber').val();
    book = $('#bkname').val();
    //dBookmarks();
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    taba = tabs[0];
    //console.log(taba.url);
});



$('#pgbutton').click(function() {

    console.log('vai q');
    var link = null;
    console.log('antes');
    console.log('depois');
    console.log(bookId);
    if (page > 0){
        link = 'javascript:(  function() %7B   window.open(%27' + taba.url + '%23page%3D' + page + '%27)%3B   %7D  )()';
    }

    //console.log('javascript:(  function() %7B   window.open(%27' + taba.url + '%27)%3B   %7D  )()');
    //console.log(taba.url);

        //url: javascript:(  function() %7B   window.open(%27chrome://extensions/%27)%3B   %7D  )()
        //javascript:(  function() %7B   window.open(%27file:///Users/brunomakoto/Desktop/Books/Astro_Olimp_V2.pdf%27)%3B   %7D  )()
        //javascript:(  function() %7B   window.open(%27file:///Users/brunomakoto/Desktop/Books/Astro_Olimp_V2.pdf%27)%3B   %7D  )()

        //javascript:(  function() %7B   window.open(%27file:///Users/brunomakoto/Desktop/Books/Astro_Olimp_V2.pdf%23page%3D300%27)%3B   %7D  )()

    function createTab(link) {

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
    
  });

  function callback() {
    //window.location.reload();
  }

  function callback2() {
    
  }

console.log('last');