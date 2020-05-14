var player1=prompt("Enter your name player one")
var player2=prompt("Enter your name player two")
var player1Color='rgba(122, 186, 255, 0.76)'
var player2Color='rgba(132, 9, 9, 0.88)'
var bgcolor="rgb(227, 227, 239)"
var hovercolor="rgb(213, 151, 151)"
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;
var count
function returnColor(rowIndex,colIndex) {
  return $('tr').eq(rowIndex).find('button').eq(colIndex).css('background-color');
}
var tie=0


$('h3').text(player1+": it is your turn, please pick a column to drop your blue chip.");
$('#board button').on('click',function() {
  // Recognize what column was chosen

  var col = $(this).closest("td").index();

  // Get back bottom available row to change


  // Drop the chip in that column at the bottomAvail Row
  console.log("buttonvailclicked before=" + bottomAvail)

  changeColor(bottomAvail, col, currentColor);
  console.log("color changed")
  for(rowl=1;rowl<=6;rowl++)
  {
    for(coll=0;coll<7;coll++)
    {
      if($('tr').eq(rowl).find('button').eq(coll).css('background-color')==currentColor)
      {
        $('tr').eq(rowl).find('button').eq(coll).css('animation','none')
      }
    }
  }




if(bottomAvail>=1)
{// If no win or tie, continue to next player
  currentPlayer = currentPlayer * -1;
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()||drawCheck()) {
    gameEnd(currentName);
  }

  // Re-Check who the current Player is.
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
    currentColor = player1Color;
  } else {
    currentName = player2
    $('h3').text(currentName + ": it is your turn, please pick a column to drop your red chip.");
    currentColor = player2Color;
  }

}
if (bottomAvail == 0) {
bottomAvail=undefined
} else {
    bottomAvail = bottomAvail - 1;
}
console.log("button changed"+bottomAvail)
})

$('#board button').hover(function(){
  var col=$(this).closest("td").index();

  window.bottomAvail=checkAvail(col,bgcolor)
  console.log("buttonvail hover before="+bottomAvail)
  highlight(col,hovercolor,bottomAvail,currentColor,"1.6s infinite beatHeart2");

},function(){
  var col=$(this).closest("td").index()
  console.log("buttonvail hover after"+bottomAvail)
  if(bottomAvail!=0)
    highlight(col, bgcolor, bottomAvail, bgcolor, "none")

})

function highlight(col,color,bottom,color2,animationtype)
{
var c=$('td');
for(rowl=1;rowl<7;rowl++)
  {
    for(coll=0;coll<7;coll++)
    {
      if($('tr').eq(rowl).find('button').eq(coll).css('background-color')==color2)
      {
        $('tr').eq(rowl).find('button').eq(coll).css('animation',animationtype)
      }
    }
  }
for(i=1;i<=bottom;i++)
{
  $(c).eq(col).find('button').css("background-color",color);
  col=col+7;
}
$(c).eq(col).find('button').css("animation",animationtype)

$(c).eq(col).find('button').css("background-color",color2);
}

function checkAvail(col,color){
for(i=6;i>0;i--)
{
  if(returnColor(i,col)==color)
  { console.log(i)
    return i;
  }
}
return undefined
}




var game_on = true;
var table = $('table tr');

// http://stackoverflow.com/questions/6139407/getting-td-by-index-with-jquery
function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex,colIndex,color) {

  return table.eq(rowIndex).find('button').eq(colIndex).css('background-color',color);
}
function colorMatchCheck(one,two,three,four){

  return (one===two && one===three && one===four && one !== bgcolor && one !== hovercolor && two!==hovercolor && three!==hovercolor && four!==hovercolor&&one!=undefined);
}


// Check to see if 4 inputs are the same color


// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 1; row < 7; row++) {
    for (var col = 0; col < 4; col++) {

      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horiz');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {

  for (var col = 0; col < 7; col++) {
    for (var row = 1; row < 4; row++) {
      // console.log(row+""+col+returnColor(row,col)+ returnColor(row+1,col) +returnColor(row+2,col)+ returnColor(row+3,col))
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 1; row < 8; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diagtop');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diagbottom');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}
function gameEnd(winningPlayer) {
  if(tie==1)
  {
      $('h3').fadeOut('2s');
      $('h2').fadeOut('2s');

      $('h1').fadeIn('5s');
      $('h1').text("GAME IS TIED! CLICK THE BUTTON BELOW TO PLAY AGAIN!").css("fontSize", "50px")

  }
  else {
    for (var col = 0; col < 7; col++) {
      for (var row = 1; row < 7; row++) {
        $('h3').fadeOut('2s');
        $('h2').fadeOut('2s');

        $('h1').fadeIn('5s');
        $('h1').text(winningPlayer + " has won! CLICK THE BUTTON BELOW TO PLAY AGAIN!").css("fontSize", "50px")

      }
    }
  }
  $('#board button').attr("disabled","true");
  $('#playAgain').removeAttr("hidden")
  $('#newGame').removeAttr("hidden")
  for(row=1;row<7;row++)
  {
    for(col=0;col<7;col++)
    {
      if($('tr').eq(row).find('button').eq(col).css('background-color')==hovercolor)
      {
        $('tr').eq(row).find('button').eq(col).css('background-color',bgcolor)
      }
    }
  }
}
$('#playAgain').click(function(){
remove()
})

$('#newGame').click(function(){

player1=prompt("Enter your name player one")
player2=prompt("Enter your name player two")
remove()
})

function remove()
{
  $('#board button').removeAttr("disabled");
$('#board button').css("background-color",bgcolor);
currentPlayer = 1;
currentName = player1;
currentColor = player1Color;
$('h3').fadeIn('fast');
  $('h3').text(player1+": it is your turn, please pick a column to drop your blue chip.");
$('h2').fadeIn('fast');
$('h1').text("WELCOME TO CONNECTING DOTS");
$('#playAgain').attr("hidden","true");
$('#newGame').attr("hidden","true");
}

function drawCheck(){
  count=0
   for(rowl=1;rowl<=6;rowl++)
  {
    for(coll=0;coll<7;coll++)
    {
      if($('tr').eq(rowl).find('button').eq(coll).css('background-color')==player1Color ||$('tr').eq(rowl).find('button').eq(coll).css('background-color')==player2Color)
      {
        count=count+1;

      }
    }
  }
   console.log(count+"=count")
   if(count==41)
  { window.tie=1
    return true;

  }
}