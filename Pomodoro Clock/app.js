 (function() {
   //Pomodoro Clock Object.
   var pomodoroclock = {
  
     sessionlength: 0,
     breaklength: 0,
     pomflag: 0,
      bgfilltotal:  0,
      brkfilltotal:  0,
     get pmins() {return Math.floor(this.sessionlength / 60)
     },
     get psecs() {
       return this.sessionlength - this.pmins * 60
     },
    startTimer: function() {
      var self=this;
          var sess=this.sessionlength;
      var brlngth=this.breaklength;   

     
       this.interval=setInterval(function(){ 
       
  
   
          if(sess > 0)
        {
  
self.bgfill(sess,self.bgfilltotal,0);
                 
        document.getElementById("sestitle").innerHTML="Session";
          sess--;
         document.getElementById("shmin").innerHTML=Math.floor(sess / 60 % 60);
          document.getElementById("shsec").innerHTML=parseInt(sess % 60);
         
        }
         else if(brlngth>0)
           {
  self.bgfill(brlngth,self.brkfilltotal,1);           document.getElementById("sestitle").innerHTML="Break";
             brlngth--;
            document.getElementById("shmin").innerHTML=Math.floor(brlngth / 60 % 60);
          document.getElementById("shsec").innerHTML=parseInt(brlngth % 60); 
           }
        else
          {
            self.sessionlength=sessdefmin*60;
            sess=self.sessionlength;
            
          }
         
        
  self.sessionlength=sess;
   self.breaklength=brlngth;      
         
     }, 1000);

     },
    pause: function () {
    clearInterval(this.interval);
    delete this.interval;
  },
    resume: function () {
    if (!this.interval) this.startTimer();
  },
  
     
     bgfill: function(secleft,totalsec,sessbr) {
    
    if(sessbr===0)
      {
        document.getElementById("bgfill").style.backgroundColor='#52CC29'; 
      }
    else
      {
  document.getElementById("bgfill").style.backgroundColor='#ff0000'; 
      }
    
 var  perc = Math.abs((secleft/totalsec ) * 100 - 100);
    
    document.getElementById("bgfill").style.height=perc + '%';
      

}  
     
     
    };

   
   var sessdefmin=25;
   var brdefmin=5;
 //Get  the default sessionlength and breaklengths



   
     
    
   
   //PomodoroClock Click Event
   document.getElementById("pomodorocircle").addEventListener("click", function() {

     if(pomodoroclock.pomflag===0)
       {
     initialstart();
         pomodoroclock.pomflag=1;
       }
     else if(pomodoroclock.pomflag===1)
       {
         pomodoroclock.pause();
         pomodoroclock.pomflag=2;
       }
     else if(pomodoroclock.pomflag===2)
       {
         pomodoroclock.resume();
         pomodoroclock.pomflag=1;
       }
 disminsec("inline");
   document.getElementById("minsecs").style.display = "none";
   
});

   //Session Increment Click Event
   document.getElementById("seslninc").addEventListener("click", function() {

     if (document.getElementById("minsecs").style.display === "none") {
       document.getElementById("minsecs").style.display = "block";
     }

     disminsec("none");

     sessdefmin++;
     document.getElementById("sdefms").innerHTML = sessdefmin;
     document.getElementById("minsecs").innerHTML = sessdefmin;
     
     pomodoroclock.pause();
pomodoroclock.pomflag=0;
   });

   //Session Decrement Click Event
   document.getElementById("seslndec").addEventListener("click", function() {
     if (document.getElementById("minsecs").style.display === "none") {
       document.getElementById("minsecs").style.display = "block";
     }

     disminsec("none");

     if (sessdefmin > 1)
       sessdefmin--;
     document.getElementById("sdefms").innerHTML = sessdefmin;
     document.getElementById("minsecs").innerHTML = sessdefmin;
     
     pomodoroclock.pause();
     pomodoroclock.pomflag=0;
   });

   //Break Length Decrement Click Event
   document.getElementById("breakdec").addEventListener("click", function() {

     if (brdefmin > 1) {
       brdefmin--;
     }

     document.getElementById("breakvl").innerHTML = brdefmin;

   });

   //Break Length Increment Click Event
   document.getElementById("breakinc").addEventListener("click", function() {

     brdefmin++;

     document.getElementById("breakvl").innerHTML = brdefmin;

   });

   //Display minutes && seconds
   function disminsec(e) {
     document.getElementById("shmin").style.display = e;
     document.getElementById("btwin").style.display = e;
     document.getElementById("shsec").style.display = e;

   }

   
   function initialstart()
   {
  pomodoroclock.sessionlength=sessdefmin*60;
     pomodoroclock.bgfilltotal=sessdefmin*60;
 pomodoroclock.brkfilltotal=brdefmin*60;    
pomodoroclock.breaklength=brdefmin*60;    
     
     
  pomodoroclock.startTimer();
  
}
   
   
   document.getElementById("sdefms").innerHTML = sessdefmin;
document.getElementById("minsecs").innerHTML = sessdefmin;
document.getElementById("breakvl").innerHTML = brdefmin;
})();