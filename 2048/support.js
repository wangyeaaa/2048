function getPosTop(i,j){
	return 20+i*120;
}
function getPosLeft(i,j){
	return 20+j*120;
}
function getnumberbackground(number){
	switch(number){
	case 2:return "#eee4da";
    	break;
    	case 4:return "#ede0c8";
    	break;
    	case 8:return "#f2b179";
    	break;
    	case 16:return "#f59563";
    	break;
    	case 32:return "#f67c5f";
    	break;
    	case 64:return "#f65e3b";
    	break;
    	case 128:return "#edcf72";
    	break;
    	case 256:return "#edcc61";
    	break;
    	case 512:return "#9c0";
    	break;
    	case 1024:return "#33b5e5";
    	break;
    	case 2048:return "#09c";
    	break;
    	case 4096:return "#a6c";
    	break;
    	case 8192:return "#93c";
    	break;
	}
	return "black";

}
function getNumberText(number){
	switch(number){
		case 2:return "伦鸡吧";
		break;
		case 4:return "邱大炮";
		break;
		case 8: return"秦小屌";
		break;
		case 16:return"休学豪";
		break;
		case 32:return"舜鸡巴";
		break;
		case 64:return"社会渣";
		break;
		case 128: return"腐竹安";
		break;
		case 256: return "李钢炮";
		break;
		case 512:return "葛优躺";
		break;
		case 1024:return "蹦迪屎";
		break;
		case 2048: return"王爷啊";
		break;
	}
	return "厉害啊";
}
function getnumbercolor(number){
	if(number<=4)
	    return "#776e65";
	return "white";
}
function nospace(boad){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		if(board[i][j]==0)
			return false;
	return true;
}
function nomove(board){
	if(canmoveLeft(board)||canmoveright(board)||canmovetop(board)||canmovedown(board))
		return false;
	return true;
}
function canmoveLeft(board){
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++)
			if(board[i][j]!=0)
				if(board[i][j-1]==0||board[i][j-1]==board[i][j])
					return  true;

	return false;
}
function canmoveright(board){
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--)
			if(board[i][j]!=0)
				if(board[i][j+1]==0||board[i][j+1]==board[i][j])
					return true;
	return false;


}
function canmovetop(board){
	for(var j=0;j<4;j++)
	    for(var i=1;i<4;i++)
			if(board[i][j]!=0)
				if(board[i-1][j]==0||board[i-1][j]==board[i][j])
					return true;
	return false;
}
function canmovedown(board){
	for(var j=0;j<4;j++)
	for(var i=2;i>=0;i--)
			if(board[i][j]!=0)
				if(board[i+1][j]==0||board[i+1][j]==board[i][j])
					return true;
	return false;	


}
function noblocklevel(row , col1 , col2 , board){
	for( var i = col1 + 1 ; i < col2 ; i ++ )
        if( board[row][i] != 0 )
            return false;
    return true;
}
function noblockvertical(col,row1,row2,board){ 
	for(var i=row1+1;i<row2;i++)
		if(board[i][col]!=0)
			return false;
	return true;

}
