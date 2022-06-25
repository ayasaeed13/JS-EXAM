//------------------navbar----------------------------
let navWidth=$(".nav-tab-menu").width();
$(".strip-toggel-menu").click(function(){
    if($(".strip-header-nav").css("left") == "0px"){
        $(".strip-header-nav").animate({"left":`${navWidth}px` },300)
        $(".nav-tab-menu").animate({"left":`${navWidth}px`},300),
        $(".nav-tab-menu .item1").animate({opacity:"1",paddingTop:"25px"},1400),
        $(".nav-tab-menu .item2").animate({opacity:"1",paddingTop:"25px"},1600),
        $(".nav-tab-menu .item3").animate({opacity:"1",paddingTop:"25px"},1800),
        $(".nav-tab-menu .item4").animate({opacity:"1",paddingTop:"25px"},2000),
        $(".nav-tab-menu .item5").animate({opacity:"1",paddingTop:"25px"},2200),
        $(".nav-tab-menu .item6").animate({opacity:"1",paddingTop:"25px"},2400),
        $(".strip-toggel-menu").html(`<i class="fa-solid fa-xmark"></i>`) 
    }else{
        $(".strip-header-nav").animate({"left":`0px` },100),
        $(".nav-tab-menu").animate({"left":`0px`},100),
        $(".strip-toggel-menu").html(`<i class="fa-solid fa-bars"></i>`) 
    }
})
//---------------------------------------------------------------API-------------------------------------------
// search bar-------------------------------------------
let moviesAll = document.getElementById("allMovies");
let searchInDisplayingMovies = document.getElementById("word");

moviesAll.addEventListener("keyup",(e)=> getMoviesByWord(e.target.value));
searchInDisplayingMovies.addEventListener("keyup",(el)=> searchDisplayingMovies(el.target.value)); //using react framework ?


async function getMoviesByWord(m){
    let s =await fetch(`https://api.themoviedb.org/3/search/movie?query=${m}&api_key=99d949fbd0782c402464e38461d19b5a`);
    let n = await s.json();
    DisplayData(n.results)
}
async function searchDisplayingMovies(displayCategoryMovies){
    let x = await fetch(`https://api.themoviedb.org/3/search/movie?query=${displayCategoryMovies}&api_key=99d949fbd0782c402464e38461d19b5a`);
    let a =await  x.json();
    DisplayData(a.results)
}

// menu-bar--------------------------------
let showNowPlaying ="https://api.themoviedb.org/3/movie/now_playing?api_key=99d949fbd0782c402464e38461d19b5a";
let showPopular ="https://api.themoviedb.org/3/movie/popular?api_key=99d949fbd0782c402464e38461d19b5a";
let showTopRated ="https://api.themoviedb.org/3/movie/top_rated?api_key=99d949fbd0782c402464e38461d19b5a";
let showTrending ="https://api.themoviedb.org/3/trending/all/day?api_key=99d949fbd0782c402464e38461d19b5a";
let showUpcoming ="https://api.themoviedb.org/3/movie/upcoming?api_key=99d949fbd0782c402464e38461d19b5a";

async function fetchAPI(url){
    let s = await fetch(`${url}`);
    let n = await s.json();
    DisplayData(n.results)
}

$(".item1 .nav-category").click(function(){fetchAPI(showNowPlaying);})
$(".item2 .nav-category").click(function(){fetchAPI(showPopular)})
$(".item3 .nav-category").click(function(){fetchAPI(showTopRated)})
$(".item4 .nav-category").click(function(){fetchAPI(showTrending)})
$(".item5 .nav-category").click(function(){fetchAPI(showUpcoming)})

// displaying movies-------------------------------
function DisplayData(list){
    let container="";
    for(let i=0 ; i < list.length ;i++){
        container +=`
        <div class="col-md-6 col-lg-4 my-3 myM  shadow">
            <div class="movie shadow rounded position-relative">
                <div class="post">
                    <img src="https://image.tmdb.org/t/p/w500${list[i].poster_path}" class="img-fluid rounded">
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-0">
                            <h2>${list[i].original_title}</h2>
                            <p>${list[i].overview}</p>
                            <p>rate: ${list[i].vote_average} </p>
                            <p>${list[i].release_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById("rowData").innerHTML = container;
}
// movies will appear by default at the page-------
fetchAPI(showNowPlaying)

//----------------------------------------submit ---------------------------------------
  // userInputs 
let userName=document.getElementById("name");
let userEmail=document.getElementById("email");
let userPhone=document.getElementById("phone");
let userAge=document.getElementById("age");
let userPassword=document.getElementById("password");
let userRePassword=document.getElementById("rePassword");
let submitBtn =document.getElementById("submitBtn");
// userInputs Alerts
let userNameAlert=document.getElementById("namealert");
let userEmailAlert =document.getElementById("emailalert");
let userPhoneAlert=document.getElementById("phonealert");
let userAgeAlert=document.getElementById("agealert");
let userpasswordAlert=document.getElementById("passwordalert");
let userRepasswordAlert=document.getElementById("repasswordalert");
// keyup events on userInputs
userName.addEventListener("keyup",nameValid);
userEmail.addEventListener("keyup",emailValid);
userPhone.addEventListener("keyup",phoneValid);
userAge.addEventListener("keyup",ageValid);
userPassword.addEventListener("keyup",passwordValid);
userRePassword.addEventListener("keyup",rePasswordValid);

// validation
function nameValid(){
    //username is 8-20 characters long, no _ or . at the beginning and at the end or inside ,allowed characters
   let regexName =/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g; 
   if(regexName.test(userName.value)) {
     userNameAlert.style.display="none";
    return true;
   }else{
        userNameAlert.style.display="block" ;
        submitBtn.disabled="true"
    return false;
}}
function emailValid(){
    // standard email regular expersions
    let regexEmail=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm; 
      if(regexEmail.test(userEmail.value) == true){
        userEmailAlert.style.display="none" ;
        return true
      } else{
        userEmailAlert.style.display="block";
        submitBtn.disabled="true";
        return false
}}

function phoneValid(){
    let regexPhone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; // standard phone number
     if(regexPhone.test(userPhone.value) == true){
     userPhoneAlert.style.display="none" ;
     return true;
    }else{
        userPhoneAlert.style.display="block";
        submitBtn.disabled="true";
        return false;
}}

function ageValid(){
    let regexAge =/^[1-9][0-9]?$|^100$/;//age from 10 to 100 
     if(regexAge.test(userAge.value) == true){
        userAgeAlert.style.display="none" ;
        return true;
    }else{ 
        userAgeAlert.style.display="block";
        submitBtn.disabled="true";
        return false;
}}

function passwordValid(){
    let regexPassword= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
     if(regexPassword.test(userPassword.value) == true){
        userpasswordAlert.style.display="none" ;
        return true;
     }else{
        userpasswordAlert.style.display="block";
        submitBtn.disabled="true";
        return false;
}}
function rePasswordValid(){
    if (userPassword.value == userRePassword.value){
        userRepasswordAlert.style.display="none";
        return true
    }  else{
        userRepasswordAlert.style.display="block" ;
        submitBtn.disabled="true";
        return false
}}
// validation
function validation(){
    nameValid();
    emailValid();
    phoneValid();
    ageValid();
    passwordValid();
    rePasswordValid();
    if(nameValid() == true && emailValid() == true && phoneValid() == true && ageValid() == true && passwordValid() == true && rePasswordValid() == true){
        submitBtn.disabled="false"
        return true
    }else{
        return false
    }}
    submitBtn.addEventListener("click" , validation);