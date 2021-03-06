document.addEventListener("DOMContentLoaded", function(){
    
  var previousBtn = document.getElementById('previous_btn');
  var nextBtn = document.getElementById('next_btn');
  var sliderContainer = document.getElementById('slider_container');
  slide1[0].style.transform = 'translate3d('+w+'px,0,0)';
  slide2[0].style.transform = 'translate3d('+w+'px,0,0)';
  slide3[0].style.transform = 'translate3d(-'+w+'px,0,0)';

  nextBtn.addEventListener('click',function(){
      var currentSlide = retrieveCurrentSlide();
      next(currentSlide);
  });

  previousBtn.addEventListener('click',function(){
      var currentSlide = retrieveCurrentSlide();
      previous(currentSlide);
  });

});

var currentCard = 0;
var w = window.innerWidth;
var slideshow;
var slideNumber =  document.querySelectorAll('.numbertext > sup');
var slide0 = document.getElementsByClassName('slide0');
var slide1 = document.getElementsByClassName('slide1');
var slide2 = document.getElementsByClassName('slide2');
var slide3 = document.getElementsByClassName('slide3');
var slides = [{'key': '0','slide': slide0}, {'key': '1','slide': slide1},{'key': '2','slide': slide2},{'key': '3','slide': slide3}];

function changeSlide() {
  var currentSlide = retrieveCurrentSlide();
  next(currentSlide);
}

function retrieveCurrentSlide() {
  for(var i in slides) {
      var className = slides[i]['slide'][0].className;
      if(RegExp('\\bactive\\b').test(className)) {
          return slides[i];
      }
  } 
}

function next(currentSlide) { 
  var slideToDisplay, nextSlide, previousSlide, currentSlidekey, lastSlide, firstSlide;
  currentSlidekey = currentSlide['key'];
  firstSlide = 0;
  lastSlide = slides.length - 1;
  previousSlide =  currentSlide;
  if(currentSlidekey == slides[lastSlide]['key']) {
      slideToDisplay = slides[firstSlide];
      firstSlide++;
      nextSlide = slides[firstSlide];
  } else {
      currentSlidekey++;
      slideToDisplay = slides[currentSlidekey];
      currentSlidekey++;
      if(currentSlidekey > lastSlide) {
          nextSlide = slides[firstSlide];
      } else {
          nextSlide = slides[currentSlidekey];
          
      }
      
  }
  updateSlide(previousSlide,slideToDisplay,nextSlide,'next');
}

function previous(currentSlide) {
  var slideToDisplay, nextSlide, previousSlide, currentSlidekey, lastSlide, firstSlide;
  currentSlidekey = currentSlide['key'];
  firstSlide = 0;
  lastSlide = slides.length - 1;
  previousSlide =  currentSlide;
  if(currentSlidekey == slides[firstSlide]['key']) {
      slideToDisplay = slides[lastSlide];
      lastSlide--;
      nextSlide = slides[lastSlide];
  } else {
      currentSlidekey--;
      if(currentSlidekey < 0 ) {
          slideToDisplay = slides[lastSlide];
      } else {
          slideToDisplay = slides[currentSlidekey]; 
      }
      currentSlidekey--;
      if(currentSlidekey < 0) {
          nextSlide = slides[lastSlide];
      } else {
          nextSlide = slides[currentSlidekey];
          
      }
      
  }
  updateSlide(previousSlide,slideToDisplay,nextSlide,'previous');
}

function updateSlide(p,d,n,e) {
  p['slide'][0].style.opacity = 1;
  if(e === 'previous') {
      p['slide'][0].style.transform = 'translate3d('+w+'px,0,0)';
  } else {
       p['slide'][0].style.transform = 'translate3d(-'+w+'px,0,0)';
  }
  d['slide'][0].style.opacity = 1;
  d['slide'][0].style.transform = 'translate3d(0,0,0)';
  n['slide'][0].style.opacity = 0;
  if(e === 'previous') {
     n['slide'][0].style.transform = 'translate3d(-'+w+'px,0,0)'; 
  } else {
      n['slide'][0].style.transform = 'translate3d('+w+'px,0,0)';
  }
  
  updateSlideClass(p,d);
}

function updateSlideClass(p,d) {
  var removeActiveClass = (p['slide'][0].className).split(' ');
  removeActiveClass = removeActiveClass[0] + ' ' + removeActiveClass[1];
  p['slide'][0].className = removeActiveClass;
  d['slide'][0].classList.add('active');
  slideNumber[0].innerHTML = (parseInt(d.key) + 1);
}

function updateWindowWidth() {
  w = window.innerWidth;
}
