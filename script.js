function about(){
    var about = document.getElementById("about");
    about.style.display="block";
    var project = document.getElementById("project");
    project.style.display="none";
    scrollTo(about);
    

}

function link(){
    window.location.href = 'https://rojeets.github.io/personal_profile/';
}

function project(){
    var about = document.getElementById("about");
    var project = document.getElementById("project");
    project.style.display="none";
    about.style.display="block";
    scrollTo(project);

}
function myFunction() {
   var drop= document.getElementsByClassName("dropdown-content");
   drop.style.display="block";
   
  }
