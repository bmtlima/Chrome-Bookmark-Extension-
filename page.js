
// Making confirmation sign invisible
var x = document.getElementById("confirmation");
x.style.display = "none";

// Retrieving the page number inserted by the user
var el = document.getElementById("pgbutton");
if(el){
    el.addEventListener("click", update);
}

var page;
var book;
var taba;
var url;
/*
console.log('a');
//window.scrollTo(20000, 10000);
setTimeout(function() {window.scrollTo(0, 1000);},1)
console.log('b');*/

function update(){
    x.style.display = "block";
    page = $('#pgnumber').val();
    book = $('#bkname').val();
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    taba = tabs[0];
    console.log(taba.url);
});


$('#pgbutton').click(function() {

    console.log('javascript:(  function() %7B   window.open(%27' + taba.url + '%27)%3B   %7D  )()');
    console.log('hero');

        //url: javascript:(  function() %7B   window.open(%27chrome://extensions/%27)%3B   %7D  )()
        //javascript:(  function() %7B   window.open(%27file:///Users/brunomakoto/Desktop/Books/Astro_Olimp_V2.pdf%27)%3B   %7D  )()
        //javascript:(  function() %7B   window.open(%27file:///Users/brunomakoto/Desktop/Books/Astro_Olimp_V2.pdf%27)%3B   %7D  )()

        //javascript:(  function() %7B   window.open(%27file:///Users/brunomakoto/Desktop/Books/Astro_Olimp_V2.pdf%23page%3D300%27)%3B   %7D  )()

    if (taba.url.includes('%23page%3D')){
        let pos = text.indexOf('%23page%3D');
        let pos2 = text.indexOf('%27)%3B'); 
        //var pos = tab.url.indexOf('%23page%3D');
        taba.url = taba.url.substring(0, pos) + taba.url.substring(pos2);
    }

    chrome.bookmarks.create({
        title: book,
        //url: "javascript:(  function() %7B   window.open(%27https://www.geeksforgeeks.org%27, %27_blank%27)%3B   %7D  )()"
        url: 'javascript:(  function() %7B   window.open(%27' + taba.url + '%23page%3D' + page + '%27)%3B   %7D  )()',
    }, callback());
    
  });

  function callback() {
    window.location.reload();
  }
  
