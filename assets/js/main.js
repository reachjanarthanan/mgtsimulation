// Basic interactivity for MGTSIM template
document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if(navToggle){
    navToggle.addEventListener('click', function(){
      if(mainNav.style.display === 'flex'){
        mainNav.style.display = 'none';
      } else {
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.gap = '12px';
      }
    });
  }
});
