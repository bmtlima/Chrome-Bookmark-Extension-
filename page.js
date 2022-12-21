
/*
* Bookmarks are arranged in a tree, where each node has characteristics such as
* an unique id, a title, an url (unless the node is a folder), and information
* about it's parent and children nodes. 
*/

/*
* Author: Bruno Lima
*/



var idOne; // id of the parent of the node that's going to be created. Equals 1 if 
var page = 0; // page to be bookmarked
var book; // name of the book to be bookmarked
var taba; // current tab. Uses Chrome's tabs API
var arr = []; // array with title and if of every folder 

// Self executing function that calls pNode to recursively iterate through the bookmark tree
(function dBookmarks() {
    console.log("book: " + book);
    chrome.bookmarks.getTree(function(itemTree){
        itemTree.forEach(function(item){
            pNode(item);
        });
    });
})();

// Recursively process child nodes
function pNode(node) {
    if (arr.indexOf(node.title) == -1 && node.url == undefined){ // first condition prevents duplicates, second selects only folders
        arr.push(node.title);
        arr.push(node.id);
    }
    if(node.children) {
        node.children.forEach(
            function(child) {
                if (child.title === "Bookmarks Bar"){ // Getting id from the node whose children are the bookmarks we see 
                    idOne = child.id;
                }
                pNode(child); 
            }
        );
    }

    // Useful for debugging: print leaf nodes URLs to console
    //if(node.url) { 
    //    console.log(node); 
    //}
}

//console.log(arr);

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

// Update value of page when button is clicked
function update(){
    x.style.display = "block";
    page = $('#pgnumber').val();
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

    console.log('idOne before changing: ' + idOne);
    console.log(arr);
    console.log('suposto valor do idOne: ' + arr[arr.indexOf(book) + 1]);

    function createTab(link) {

        console.log(book + ' book');
        
        if (taba.url.includes('#page=')){
            let pos = taba.url.indexOf('#page=');
            taba.url = taba.url.substring(0, pos);
            link = 'javascript:(  function() %7B   window.open(%27' + taba.url + '%23page%3D' + page + '%27)%3B   %7D  )()';
        }

        if (arr.indexOf(book) != -1 && page > 0){ // There's a folder with the book's name
            console.log('aaa');
            idOne = arr[arr.indexOf(book) + 1];
            chrome.bookmarks.create({
                parentId: idOne,
                title: 'Page ' + page,
                url: link
            }, callback());
        }

        if (arr.indexOf(book) == -1 && page > 0){
            chrome.bookmarks.create({
                parentId: idOne,
                title: book + ' page ' + page,
                url: link
            }, callback());
        }

        if (!(page > 0)) {
            chrome.bookmarks.create({
            parentId: idOne,
            title: book,
            url: link
        }, callback());}
    };

    createTab(link);
            }
        });
    }); 
  });

  function callback() {
    window.location.reload();
  }

  