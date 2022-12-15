var el = document.getElementById("mybutton");
if(el){
    el.addEventListener("click", myFunction);
}

var el = document.getElementById("pgbutton");
if(el){
    el.addEventListener("click", update);
}

function myFunction(){
    console.log('asd');
}

var page;

function update(){
    console.log('worked!');
    page = $('#pgnumber').val();
    console.log(page);
}


