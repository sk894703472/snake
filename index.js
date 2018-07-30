/*获取画布绘制环境为2D*/
var ctx=document.getElementById("myCanvas").getContext("2d");
/*定义食物*/
var food = null;
/*定义初始蛇存取数组*/
var snake = [{x:10,y:9},{x:10,y:8}];
/*定义存取键盘方向变量，默认向下（40）*/
var dir = 40;
var key = 1;
window.onload=function(){
	var btn1 = document.getElementById("btn1");
	var btn2 = document.getElementById("btn2");
	var dirs = document.getElementsByClassName("dir");
	var btop = document.getElementById("btop");
	var bleft = document.getElementById("bleft");
	var bright = document.getElementById("bright");
	var bbuttom = document.getElementById("bbuttom");
	/*for(var i=0;i<dirs.length;i++){
		dirs[i].onclick=function(){
			switch(i){
				case 0:
					dir=40;
					break;
				case 1:
					dir=39;
					break;
				case 2:
					dir=38;
					break;
				case 3:
					dir=37;
					break;
			}
			
		}
	}*/
	btn1.onclick=function(){
		if(key == 1){
			key = 0;
		}else{
			key = 1;
		}
	}
	btn2.onclick=function(){
		location.reload(); 
	}
	btop.onclick=function(){
		dir = 38;
		console.log(dir)
	}
	bleft.onclick=function(){
		dir = 37;
		console.log(dir)
	}
	bright.onclick=function(){
		dir = 39;
		console.log(dir)
	}
	bbuttom.onclick=function(){
		dir = 40;
		console.log(dir)
	}

}
function action(){
	/*判断是否终止游戏*/
	if(check(snake[0],0)||snake[0].y<0||snake[0].y>=30)return;
	if(key!=1)return;
	if(snake[0].x>=35){
			snake[0].x = Math.abs(snake[0].x)%35;
	}
	if(snake[0].x<0){
		snake[0].x = snake[0].x+35;
	}	
	if(food){
		if((dir == 40&&snake[0].x==food.x&&snake[0].y+1==food.y)
			||(dir == 39&&snake[0].x+1==food.x&&snake[0].y==food.y)
			||(dir == 38&&snake[0].x==food.x&&snake[0].y-1==food.y)
			||(dir == 37&&snake[0].x-1==food.x&&snake[0].y==food.y)){
			snake.unshift(food);
			food = null;
		}
	}
	snake.unshift(snake.pop());
	switch(dir){
		case 37:
			snake[0].x = snake[1].x - 1;
			snake[0].y = snake[1].y;
			break;
		case 38:
			snake[0].x = snake[1].x;
			snake[0].y = snake[1].y - 1;
			break;
		case 39:
			snake[0].x = snake[1].x + 1;
			snake[0].y = snake[1].y;
			break;
		case 40:
			snake[0].x = snake[1].x;
			snake[0].y = snake[1].y + 1;
			break;
	}
	ctx.clearRect(0,0,700,600);
	/*绘制食物*/
	if(food){
		ctx.fillRect(food.x*20,food.y*20,20,20);
		ctx.fillStyle="#292421";
	}
	/*绘制蛇*/
	for(var i=0;i<snake.length;i++){
		ctx.fillRect(snake[i].x*20,snake[i].y*20,20,20);
		ctx.fillStyle="#292421";
	}
	/*随机生成食物*/
	while(food== null|| check(food)){
		food={y:(Math.random()*31 >>>1),x:(Math.random()*36 >>>1)};
	}	
	if(check(snake[0],0)||snake[0].y<0||snake[0].y >= 30){
		alert("game over\nYou get ["+(snake.length-2)+"]");
	}
	var grade = document.getElementById("grade");
	grade.innerHTML=(snake.length-2)*5+"分";

}
if(key == 1){
	setInterval(action,150);
}


document.onkeyup = function(event){
	if(event.keyCode>=37 && event.keyCode<=40 && (Math.abs(event.keyCode-dir) != 2)){
		dir = event.keyCode;
	}
}
/*检查食物是否与蛇重合*/
function check(food,j){
	for(var i=0;i<snake.length;i++){
		if(j!=i && snake[i].x==food.x && snake[i].y==food.y)return true;
		
	}
	return false;
}

