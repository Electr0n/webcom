//sections slider
var header = document.getElementsByClassName('head-line')[0];

$(document).ready(function() {
  $('#fullpage').fullpage({
      lockAnchors: true,
      anchors:['main', 'projects', 'advantages', 'feed-back', 'footer'],
      navigation: true,
      navigationPosition: 'right',
      autoScrolling:false,
      fitToSection: false,
      onLeave: function(index, nextIndex, direction){
        if (nextIndex != 1){
          header.classList.add('min');
        } else {
          header.classList.remove('min');
        }
      }
  });
});

// add selected class to head menu buttons on hover
var btns = document.getElementsByClassName('head-line__btn');
for (var i=0; i<btns.length; i++){
  btns[i].addEventListener("mouseover", function(){
    this.classList.add("selected");
  });
  btns[i].addEventListener("mouseout", function(){
    this.classList.remove("selected");
  });
}

var hamMenu = document.getElementsByClassName('head-line__menu-hamburger')[0];
var sideMenu = document.getElementsByClassName('head-line__side_menu')[0];
hamMenu.addEventListener('click', function(){
  if (sideMenu.classList.contains('selected')){
    sideMenu.classList.remove('selected');
  }else{
    sideMenu.classList.add('selected');
  }
});

var sideBtns = document.getElementsByClassName('head-line__side_menu-btn');
for (var i=0; i<sideBtns.length; i++){
  sideBtns[i].addEventListener("mouseover", function(){
    this.classList.add("selected");
  });
  sideBtns[i].addEventListener("mouseout", function(){
    this.classList.remove("selected");
  });
}

// add selected class to portfolio images
var imgs = document.getElementsByClassName('portfolio__img');
for(var i=0; i<imgs.length; i++){
  imgs[i].addEventListener("mouseover", function(){
    this.getElementsByClassName('portfolio__img-preview')[0].setAttribute(
   "style", "opacity: 0.8; transition: opacity 0.5s ease-in-out");
  });
  imgs[i].addEventListener("mouseout", function(){
    this.getElementsByClassName('portfolio__img-preview')[0].setAttribute(
   "style", "opacity: 0; transition: opacity 0.5s ease-in-out");
  });
}

// slider

var slideIndex = 1;
var slides = document.getElementsByClassName("slideshow__item");
var dots = document.getElementsByClassName("slideshow__dots-element");

// buttons listeners
document.getElementsByClassName('slideshow__control-left')[0].addEventListener(
  'click', function(){
    plusSlides(-1);
  });

document.getElementsByClassName('slideshow__control-right')[0].addEventListener(
  'click', function(){
    plusSlides(1);
  });

document.getElementsByClassName('btn-up')[0].addEventListener('click', function(){
  $.fn.fullpage.moveTo(1);
});

document.getElementsByClassName('slideshow__btn-down')[0].addEventListener(
  'click', function(){
    $.fn.fullpage.moveTo('footer');
  });

for(i=0; i<dots.length; i++){
  dots[i].addEventListener('click', function(){
    currentSlide(i+1);
  });
}

displaySlides(slideIndex);
document.getElementsByClassName('slideshow__item selected')[0].classList.add('show');

// animation show/hide slide
function showSlide(n){
  slides[n-1].classList.add('show');
}

function hideSlide(n){
  slides[n-1].classList.remove('show');
  slides[n-1].classList.add('hide');
  setTimeout(function(){
    slides[n-1].classList.remove('hide');
  }, 300);
}

function plusSlides(n){
  currentSlide(slideIndex + n);
}

// slider core
function currentSlide(n){
  hideSlide(slideIndex);
  setTimeout(function(){
    displaySlides(slideIndex = n);
  }, 300);
  setTimeout(function(){
    showSlide(slideIndex);
  }, 600);
}

function displaySlides(n){
  var i;
  
  if (n > slides.length){
    slideIndex = 1
  }

  if (n < 1){
    slideIndex = slides.length
  }

  for(i=0; i < slides.length; i++){
    slides[i].classList.remove('selected');
    slides[i].style.display = "none";
  }

  for(i=0; i < dots.length; i++){
    dots[i].className = dots[i].className.replace("active", "");
  }

  slides[slideIndex-1].style.display = "block";
  slides[slideIndex-1].classList.add('selected');
  dots[slideIndex-1].className += " active";

}

// request window/buttons
var requestWindow = document.getElementsByClassName('window-request')[0];

document.getElementsByClassName('window-request__btn-close')[0].
  addEventListener('click', function(){
    requestWindow.style.display = "none";
  });

document.getElementsByClassName('window-request__btn-send')[0].
  addEventListener('click', function(){
    requestWindow.style.display = "none";
  });

document.getElementsByClassName('head-line__btn-request')[0].addEventListener(
  'click', function(){
    requestWindow.style.display = "flex";
  });

document.getElementsByClassName('slideshow__btn-request')[0].addEventListener(
  'click', function(){
    requestWindow.style.display = "flex";
  });
