
// 변수,DOM객체선언
var money = 10000
var buycost = 0;
var transtock = 0;
var stockstate = 0;
let averageY = 0;
var stock = 0;
let time = 1;
var state = 0;
let profit = 0;
const fees = 0.05;
const thickness = 6;
let change = 0;
cvs = document.getElementById('canvas');//세팅
ctx = cvs.getContext('2d');
buybtn = document.getElementById('buybtn');
sellbtn = document.getElementById('sellbtn')
//시작문구
var now = new Date();	
var hours = now.getHours();	 
var minutes = now.getMinutes();	
var date = now.getDate();
var months = now.getMonth() +1;
edit('log',`(${months}/${date}|${hours}:${minutes}) 참고:살 때 ${fees*100}%의 수수료 비용이 있으며 모든 매매시 내림이 적용됩니다.`)
x=0;y=cvs.height/2//캔버스 관련 세팅
//함수 선언, 클릭 이벤트 정의
function getInner(id){
    return document.getElementById(id).innerHTML;
}
function intRand(a,b){
    return Math.floor((Math.random() * (b-a+1)) + a);
}
function edit(id,inner) {
    document.getElementById(id).innerHTML = inner;
}
function writeLog(value){
    edit('log',getInner('log')+'('+time+'|'+y.toFixed(2)+')'+value+'<br/>')
}
buybtn.addEventListener('click',function () {//매수
    if(buycost<= money && buycost > 0){
        if(transtock>=0.1){
            writeLog(`${transtock}ATC를 ${fees*100}%수수료 적용되어 ${buycost}달러로 사셨습니다.`)
            stockstate += transtock;
            state += buycost
            averageY = (state / stockstate)
            stock += transtock
            money -= buycost
        }else writeLog('매입은 0.1ATC이상 해야 합니다.');
    }
})
sellbtn.addEventListener('click', function () { //매도
    if(stock>0 && transtock>0){
            writeLog(`${transtock}ATC를 총 ${sellcost}달러로 매도했습니다`)
            state -= averageY*transtock;
            money += sellcost;
            stock -= transtock;
            stockstate -= transtock;
    }
})

function grid(column,row) {
    ctx.strokeStyle = '#D8D8D8'
    ctx.lineWidth=1;
    for(var i=0;i<column;i++){
        ctx.moveTo(cvs.width/column * i,0)
        ctx.lineTo(cvs.width/column * i,cvs.height)
        ctx.stroke();
    }
    for(var i=0;i<row;i++){
        ctx.moveTo(0,cvs.height/row * i)
        ctx.lineTo(cvs.width,cvs.height/row * i)
        ctx.stroke();
    }
}
function initBackground() {
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function randomChange(){ //변동 
var sign = intRand(0,1)*2 -1
    ran =sign * intRand(1,15) *2
    return ran //기본 변화
}
function chartDraw(){
    ctx.moveTo(x,cvs.height-y)//위치로이동
    change = randomChange()
    if(y<=4) y = 4;
    if(change>0){  //변화량 확인
        ctx.strokeStyle = '#FF0000'
    }else{
        ctx.strokeStyle = '#0000FF'
        
    }   
    y += change //y이동
    ctx.lineTo(x,cvs.height-y) //선긋기
    ctx.stroke()
}
initBackground();
function makeLable(number){
    var number = document.createElement( 'div' );
    var numberText = document.createTextNode(500-i*50);
    number.appendChild( numberText );
    document.body.appendChild( number );
    number.style.position = 'relative'
    number.style.top = i*28-880+'px'
    number.style.left = '1210px'
}
for(var i=0;i<11;i++){
    makeLable(i);
}
grid(cvs.width/(thickness+2),10);
setInterval(() => {
    time ++;
    ctx.beginPath(); //시작
    ctx.lineWidth=thickness; 
    chartDraw();
    x += thickness+2;//옆으로가기
    if (x>cvs.width){ //선넘으면 다시 복귀
        initBackground();
        grid(cvs.width/(thickness+2),10);
        x = 0
    }    
    ctx.closePath();   
    
}, 3000);
setInterval(() => { //출력
    sellcost =  Math.floor(transtock *y)
    transtock = Number(document.getElementById('howmany').value)//구매예정량 
    buycost = Math.floor((1+fees)*transtock*y)//구매예정가격
    profit = Math.floor(stock*y) - state
    edit('panel',`${y.toFixed(2)}`);
    edit('change',`${change>0? '▲':'▼'}${Math.abs(change)}<br/>${Math.floor(change/(y-change)*100)}%`);
    edit('stock',`매수할 가상화폐 수  (현재 소유: ${stock}ATC)`);
    edit('cost','매입시 가격: '+buycost+'$  (현재 소유:'+money+'$)')
    edit('state',`평가손익: ${profit} $`)
    //알려주기
    if (buycost> money){
        document.getElementById('cost').style.color = 'red'
    }else document.getElementById('cost').style.color = 'black'
    if (change>0){
        document.getElementById('change').style.color = 'red'
    }else document.getElementById('change').style.color = 'blue'
    if (profit> 0){
        document.getElementById('state').style.color = 'red'
    }else if (profit<0) document.getElementById('state').style.color = 'blue'
    else document.getElementById('state').style.color = 'black'
}, 100);