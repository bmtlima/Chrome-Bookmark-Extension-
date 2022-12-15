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

function update(){
    x.style.display = "block";
    page = $('#pgnumber').val();
    book = $('#bkname').val();
}
