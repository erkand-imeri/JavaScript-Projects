/*Tic Tac Toe Object literal with states and methods*/
var TicTacToe={
  "AI_MOVE":0,
  "board":[0,0,0,0,0,0,0,0,0],
 "checkWinner":function(board,player){
    if((board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)){
      return true;
    }
    else
      return false;
  },
  "newGame":function(){
    $("td").each(function() {
		$(this).html("");
      $(this).css('backgroundColor', '');
	});

	/* Clear the gameboard */
	for (var i = 0; i < 9; i++) {
		this.board[i] = 0;
	}
    if(this.humanplayer==='O')
     {
       this.minimax(this.board,this.computerplayer,1);
     this.board[this.AI_MOVE]=this.computerplayer;
  $("td[id=b"+(this.AI_MOVE+1)+ "]").html(this.computerplayer);
        		           $("td[id=b"+(this.AI_MOVE+1)+ "]").css('backgroundColor', '#ff5c33');
     }
  },
 "checkDraw":function(board){
    var arrleng=board;
   for(var i=0;i<arrleng.length;i++)
     {
       if(arrleng[i]==0)
         {
           return false;
         }
       
     }
   return true;
  },
  "turn":0,
  "humanplayer":"",
  "computerplayer":"",
  "terminal":function(state){
    return this.checkDraw(state) || this.checkWinner(state,"X")||this.checkWinner(state,"O");
  },
  "avmoves":function(state){
    var all_moves = Array.apply(null, {length: 9}).map(Number.call, Number);
	return all_moves.filter(function(i) { return state[i] == 0; });
  },
  "minimax":function(state,player,depth){
  if (depth >= 4 || this.terminal(state)) {
		return this.potstate(state);
	}
  
	var max_score,
		min_score,
		scores = [],
		moves = [],
		opponent = (player == "X") ? "O" : "X",
		successors = this.avmoves(state);

	for (var s in successors) {
		var possible_state = state;
		possible_state[successors[s]] = player;
		scores.push(this.minimax(possible_state, opponent, depth + 1));
		possible_state[successors[s]] = 0;
		moves.push(successors[s]);
	}

	if (player == "X") {
    var randNum=Math.floor(Math.random() * 8);
		this.AI_MOVE = moves[randNum];
		max_score = scores[0];
		for (var s in scores) {
			if (scores[s] > max_score) {
				max_score = scores[s];
				this.AI_MOVE = moves[s];
			}
		}
		return max_score;
	} else {
		this.AI_MOVE = moves[0];
		min_score = scores[0];
		for (var s in scores) {
			if (scores[s] < min_score) {
				min_score = scores[s];
				this.AI_MOVE = moves[s];
			}
		}
		return min_score;
	}  
  },  
   "potstate":function(state){
     if (this.checkWinner(state, "X")) {
		return 10;
	} else if (this.checkWinner(state, "O")) {
		return -10;
	} else {
		return 0;
	}
   }, 
  
  "cellids":{
    "b1":0,
    "b2":1,
    "b3":2,
    "b4":3,
    "b5":4,
    "b6":5,
    "b7":6,
    "b8":7,
    "b9":8
  }
};


$(document).ready(function(){
/*The Modal  Dialog to pick up  between X  and O*/
  modalDialog();
  /*Button  event when picking between two choices after the Modal Dialog pops up*/
 $('.btns').on('click',function(){
   TicTacToe.humanplayer=$(this).html();
   TicTacToe.computerplayer=TicTacToe.humanplayer==='X'?'O':'X';
   document.getElementById('myModal').style.display="none";
    if(TicTacToe.humanplayer==='O')
     {
       aiMove();
     }
   
   
  });
 
  $("#tttboard").on("click", "td", function() {
  
    
    var cellid=$(this).attr('id');
     
    
if(TicTacToe.board[TicTacToe.cellids[cellid]]==0)
  {
   $(this).html(TicTacToe.humanplayer);
 TicTacToe.board[TicTacToe.cellids[cellid]]=TicTacToe.humanplayer;
    $(this).css('backgroundColor', '#ace600');
    if(TicTacToe.checkDraw(TicTacToe.board))
		{
			alert("It's a tie!");
      TicTacToe.newGame();
		}
else if( TicTacToe.checkWinner(TicTacToe.board,TicTacToe.humanplayer))
	 {
		 alert("You Won!");
     TicTacToe.newGame();
     
	 }
    else
      {
     
        aiMove();
        }
    
  }
    
 });
  
});

function modalDialog(){
  var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

modal.style.display = "block";
}
function aiMove(){
  TicTacToe.minimax(TicTacToe.board,TicTacToe.computerplayer,0);
     TicTacToe.board[TicTacToe.AI_MOVE]=TicTacToe.computerplayer;
  $("td[id=b"+(TicTacToe.AI_MOVE+1)+ "]").html(TicTacToe.computerplayer);
        		           $("td[id=b"+(TicTacToe.AI_MOVE+1)+ "]").css('backgroundColor', '#ff5c33');

        if( TicTacToe.checkWinner(TicTacToe.board,TicTacToe.computerplayer))
          {
            alert("You Lost!");
            TicTacToe.newGame();
          }
  else if(TicTacToe.checkDraw(TicTacToe.board))
		{
			alert("It's a tie!");
      TicTacToe.newGame();
		}
        
  
}
