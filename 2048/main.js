var board=new Array();
var score=0;
var hasadd=new Array();//检测碰撞

$(function(){
	newgame();

});
function newgame(){
	//初始化数字格
	init()
	//随机生成数字
	genarateOnenumber();
	genarateOnenumber();
	$("#gameover").css("display","none");
}
function init(){//初始化函数
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getPosTop(i,j));
			gridCell.css("left",getPosLeft(i,j))
		}
	}
	//将一维数组转换为二维数组
	for(var i=0;i<4;i++){
		board[i]=new Array();
		hasadd[i]=new Array();

		//初始二维数组
		for(var j=0;j<4;j++){
		  board[i][j]=0;
		  hasadd[i][j]=false;
		}
	}
	score=0;
	$("#score").text(score);
	updateView();//更新界面
}
function updateView(){
	 $(".number-cell").remove();
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$("#number-cell-"+i+"-"+j);
			if(board[i][j]!=0){
				theNumberCell.css("width","100");
				theNumberCell.css("height","100");
				theNumberCell.css("top",getPosTop(i,j));
				theNumberCell.css("left",getPosLeft(i,j));
				theNumberCell.css("background-color",getnumberbackground(board[i][j]));
				theNumberCell.css("color",getnumbercolor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}else{
				   theNumberCell.css('width','0px');
			                theNumberCell.css('height','0px');
			                theNumberCell.css('top',getPosTop(i,j) + 50 );
			                theNumberCell.css('left',getPosLeft(i,j) + 50);
			}
			hasadd[i][j]=false;
		}
}
//生成一个随机数
function genarateOnenumber(){
	if(nospace(board))
	     return false;

	 //随机生成一个位置
	var randX=parseInt(Math.random()*4);
	var randY=parseInt(Math.random()*4);
	while(true){
		if(board[randX][randY]==0)
			break;
	randX=parseInt(Math.random()*4);
	randY=parseInt(Math.random()*4);
	}
	//随机生成一个数字
	var randnum=Math.random()>0.5?2:4;
	//在随机位置显示随机数
	board[randX][randY]=randnum;
	showNumberWithAnimation(randX,randY,randnum);

	 return true;
}
$(document).keydown(function(e){
	switch(e.keyCode){
		case 37:
		e.preventDefault();
		if(moveLeft()){
			setTimeout("genarateOnenumber()",210);
			setTimeout("isgameover()",300)
		}
		break;
		case 38:
		e.preventDefault();
		if(moveUp()){
			setTimeout("genarateOnenumber()",210);
			setTimeout("isgameover()",300)
		}
		break;
		case 39:
		e.preventDefault();
		if(moveRight()){
			setTimeout("genarateOnenumber()",210);
			setTimeout("isgameover()",300)
		}
		break;
		case 40:
		e.preventDefault();
		if(moveDown()){
			setTimeout("genarateOnenumber()",210);
			setTimeout("isgameover()",300)
		}
		break;
	}
});
function isgameover(){
	if(nospace(board)&&nomove(board))
	$("#gameover").css("display","block");
}
function moveLeft(){
	if(!canmoveLeft(board)){
		return false;
	}
	 for(var i=0;i<4;i++)
	 	for(var j=1;j<4;j++){
	 		if(board[i][j]!=0){
	 			for(var k=0;k<j;k++){
	 				if(board[i][k]==0&&noblocklevel(i,k,j,board)){
	 					//move
	 					movewithAnimation(i,j,i,k);

	 					board[i][k]=board[i][j];
	 					board[i][j]=0;
	 					continue;
	 				}else if(board[i][k]==board[i][j]&&noblocklevel(i,k,j,board)&&!hasadd[i][k]){
	 					//move
	 					movewithAnimation(i,j,i,k);

	 					board[i][k]+=board[i][j];
	 					board[i][j]=0;
	 					score+=board[i][k];
	 					$("#score").text(score);
	 					hasadd[i][k]=true;
	 					continue;
	 				}

	 			}

	 		}
	 	}
 setTimeout("updateView()",200);
	return true;
}
function moveUp(){
	if(!canmovetop(board)){
		return false;
	}
	for(var j=0;j<4;j++)
		for(var i=1;i<4;i++)
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noblockvertical(j,k,i,board)){
						movewithAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noblockvertical(j,k,i,board)&&!hasadd[k][j]){
						movewithAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
	 					$("#score").text(score);
	 					hasadd[k][j]=true;
						continue;
					}

				}
			}
setTimeout("updateView()",200);
	return true;
	
}
function moveRight(){
	if(!canmoveright(board)){
		return false;
	}
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0)
				for(var k = 3 ; k > j ; k --){ 
					if(board[i][k]==0&&noblocklevel(i,j,k,board)){
						movewithAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noblocklevel(i,j,k,board)&&!hasadd[i][k]){
						movewithAnimation(i,j,i,k);
						board[i][k]+=board[i][j];					
						board[i][j]=0;
						score+=board[i][k];
	 					$("#score").text(score);
	 					hasadd[i][k]=true;
						continue;
					}
				}		
		}
	setTimeout("updateView()",200);
	return true;
}
function moveDown(){
	if(!canmovedown(board)){
		return false;
	}
	for(var j=0;j<4;j++)
		for(var i=2;i>=0;i--)
			if(board[i][j]!=0)
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noblockvertical(j,i,k,board)){
						movewithAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noblockvertical(j,i,k,board)&&!hasadd[k][j]){
						movewithAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
	 					$("#score").text(score);
	 					hasadd[k][j]=true;
						continue;
					}
				}
	setTimeout("updateView()",200);
	return true;
}