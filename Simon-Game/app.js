var Simon=function(){
  
  this.strict=false;
  this.wrongC=0;
  this.indexT=0;
  this.level=1;
  this.init=function(){
    this.level=1;
    this.compGenArr=[];
  };
  this.audioColors={green:'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
                    red:'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
                    blue:'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
                    yellow:'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
                    
fail:'http://k003.kiwi6.com/hotlink/clrtgq79wz/failsimon.mp3'                   
                   };
  this.numColors={
    1:"green",
    2:"red",
    3:"blue",
    4:"yellow",
    green:1,
    red: 2,
    blue: 3,
    yellow: 4
    };
  this.lightUp=function(e){
   
    
   var colorEl=typeof e=="string"?e:e.target.id;
    
    var whPlay;
   if(this.wrongC==0)
     {
       whPlay=colorEl;
     }
    else
      {
        whPlay='fail';
      }
  var playIt=this.audioColors[whPlay];
    console.log(playIt)
     this.playAudio(playIt);
 
  
    
    setTimeout(function(){
      document.getElementById(colorEl).style.opacity=1;
    }, 0);
  setTimeout(function(){
      document.getElementById(colorEl).style.opacity=0.6;
    }, 350);
    
    
  };
  this.compGenArr=[];
  
  this.playAudio=function(part){
    var audio = new Audio(part);
audio.play();
  };
  this.randomGen=function(){
    this.compGenArr=[];
    for(var i=0;i<this.level;i++)
      {
 var randNum=Math.floor(Math.random()*4)+1;
    this.compGenArr.push(randNum);
      }
    
    
    };
  var interval;
  this.compPlay=function(){
    clearInterval(interval);
    this.randomGen();
    
    document.getElementById("red").style.pointerEvents = "none";
              document.getElementById("green").style.pointerEvents = "none";
              document.getElementById("yellow").style.pointerEvents = "none";
              document.getElementById("blue").style.pointerEvents = "none";
    
    
    
    this.indexT=0;
  
   var self=this;
    
    
   var i=0,randomID;
   
    interval=setInterval(function(){
      
   randomID=self.numColors[self.compGenArr[i]];
      
      self.lightUp(randomID);
      
    i++;
      
      if(i===self.compGenArr.length)
        {
          clearInterval(interval);
         document.getElementById("red").style.pointerEvents = "auto";
              document.getElementById("green").style.pointerEvents = "auto";
              document.getElementById("yellow").style.pointerEvents = "auto";
              document.getElementById("blue").style.pointerEvents = "auto";
        }
      
      
    },this.timeFreq(this.level));
    
  };
  this.clearInt=function(){
    clearInterval(interval);
    interval=undefined;
  };
  this.timeFreq=function(level){
    var tFreq=[1250,1000,750,500];
    
  if(level <4)
    return tFreq[0];
    if(level <8)
      return tFreq[1];
    if(level <12)
      return tFreq[2];
      
    return tFreq[3];
  };
  this.checkPlay=function(en){
    var diff=true;
   
 if(this.numColors[en.target.id]!==this.compGenArr[this.indexT])
            {
             diff=false;
              
              return diff;
            }
        
 return diff;   
};
}

document.addEventListener( 'DOMContentLoaded', function () {
    var simongame=new Simon();
  var circlEvents={
    circleHandler:function(e){
    
      
      if(simongame.checkPlay(e))
      {
        simongame.wrongC=0;
        simongame.lightUp(e);
        simongame.indexT++;
        if(simongame.indexT===simongame.level)
          {
     if(simongame.level===20) 
       {
         alert("Congratulations, You Won!!!");
       }
       else
         {
            setTimeout(function(){
              simongame.level++;
      
        
              simongame.compPlay();
      document.getElementById("roundLevel").value=simongame.level;        
            },200);
         }
          }
      }
    else
      {
        simongame.wrongC=1;
        simongame.lightUp(e);
        
        setTimeout(document.getElementById("roundLevel").value="--",50);
        
        
      }
    
  },
    clCircles:function(){
  var playCircle=document.getElementsByClassName("playCircle");
  
 
  
  for(var i=0;i<playCircle.length;i++)
 {
   playCircle[i].addEventListener("click",this.circleHandler);
 }
  
  
},
    rmCircles:function(){
    var playCircle=document.getElementsByClassName("playCircle");
  
 
  
  for(var i=0;i<playCircle.length;i++)
 {
   playCircle[i].removeEventListener("click",this.circleHandler);
 }
  
  }
  };
  
  
  var checkonoff=document.getElementById("fs");
  
  checkonoff.addEventListener('click',function(){
      var startIt=document.getElementById('startBtn');
    function startClk(){
      circlEvents.clCircles();
      
      if(simongame.wrongC===1)
        {
          simongame.wrongC=0;
          if(simongame.strict===true)
            {
              simongame.level=1;
            }
        }
      else
        {
          simongame.wrongC=0;
          simongame.level=1;
        }
     
     
        document.getElementById('roundLevel').value=simongame.level;
      
      setTimeout(function(){
        simongame.compPlay();
      },200);
     
     
    }
    var strictIt=document.getElementById("strictBtn");
    
    
    if(this.checked)
      {
         
   strictIt.addEventListener('click',function(){
    if(!simongame.strict)
      {
     simongame.strict=true;
      document.getElementById('strictonoff').style.background="#990000";
       
      }
     else
      {
        simongame.strict=false;
        document.getElementById('strictonoff').style.background="#404040";
      
      }       
   });     
  startIt.addEventListener('click',startClk);    
        
        
      
        document.getElementById("roundLevel").value="--";
      }
    else
      {
        startIt.removeEventListener('click',startClk);
        simongame.clearInt();
       circlEvents.rmCircles();
        
      document.getElementById("roundLevel").value="";
      }
   
  });
 
  
 
 
 
  
 
}, false );

