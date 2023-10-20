<svg width="100vw" id="text-container" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 260.33"><path id="text-curve" d="M0,66.68c180,0,180,108,360,108s180-108,360-108,180,108,360,108" style="fill:none;stroke:none;stroke-miterlimit:10"/>
  

<text id="wavy-anim-text" y="40"> 
    <textPath id="text-path" href="#text-curve" startOffset="100">
Nourishment
    </textPath>
  </text>
  
  <style>
    #wavy-anim-text {
    font-family: 'ITC Ronda Bold';
   
      
    }
    
    #text-path {
    font-size: 6vw !important;
      text-transform: uppercase;

 
    }
    
    @media screen and (min-width: 1000px) {
      #wavy-anim-text {
        font-size: 100px;
        
    }
    
    }

  </style>
  
</svg>






     var textPath = document.querySelector('#text-path');
  var textContainer = document.querySelector('#text-container');  
  var path = document.querySelector(textPath.getAttribute('href'));
  var pathLength = path.getTotalLength();
  console.log(pathLength);
    
  function updateTextPathOffset(offset) {
      textPath.setAttribute('startOffset', offset);
  }
   updateTextPathOffset(50);
  
  function onScroll () {
  requestAnimationFrame(function(){
    var rect = textContainer.getBoundingClientRect();
    console.log(rect.y);
    var scrollPercent = rect.y / window.innerHeight;
    console.log(scrollPercent);
    updateTextPathOffset(scrollPercent * pathLength);
  });
  }
  
  window.addEventListener('scroll', onScroll);
    


  



