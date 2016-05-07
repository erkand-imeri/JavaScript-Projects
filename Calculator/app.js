(function(){
  
  var keys=document.getElementsByClassName("keys");
  var operators = ['+', '-', '*', '%','/'];
  var result=document.getElementById("resultscreen"); 

  
for( var i=0; i<keys.length; i++){
    keys[i].addEventListener("click", function(e) { 
    
  addtoscreen(e.target.value);
    
    });
}

var equalsto=document.getElementById('equal');  
  
  equalsto.addEventListener('click',function(){
     var temp=eval(result.value);
    result.value=temp;
    
    
  });
  
  
 
function addtoscreen(vlin)
  {
    var str=result.value;
    var lastChar = str[str.length - 1];
   
 if(isNaN(lastChar) &&  isNaN(vlin))
    {}
    else
      {
        str+=vlin;
      }
         
   
  if(vlin==='AC'){result.value='';}
    else if(vlin==='CE')
      {
        var temp=result.value;
        var len=temp.length-1;
        var newtemp=temp.substring(0,len);
        result.value=newtemp;
      }
    else{
      result.value=str;}
   }
  
 
  
  
})();
