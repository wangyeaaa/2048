function showNumberWithAnimation(i,j,randnumber){
	var numbercell=$("#number-cell-"+i+"-"+j);
	numbercell.css("background-color",getnumberbackground(randnumber));
	numbercell.css("color",getnumbercolor(randnumber));
	numbercell.text(randnumber);
	numbercell.animate({width:"100",height:"100",
		left:getPosLeft(i,j),top:getPosTop(i,j)},50);

} 
function movewithAnimation(i,j,ti,tk){
	var numbercell=$("#number-cell-"+i+"-"+j);
	numbercell.animate({left:getPosLeft(ti,tk),top:getPosTop(ti,tk)},200);
}