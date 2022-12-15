var el = document.getElementById("mybutton");
if(el){
    el.addEventListener("click", myFunction);
}

function myFunction(){
  console.log('asd');
  document.getElementById("p").style.display = "none";
}