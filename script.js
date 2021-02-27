// 변수,DOM객체선언
let money = 10000
let buycost = 0;
let buystock = 0;
var stock = 0;
var time = 0;
var state = 0;
let profit = 0;
const thickness = 6;
cvs = document.getElementById('canvas');//세팅
ctx = cvs.getContext('2d');
buybtn = document.getElementById('buybtn');
sellbtn = document.getElementById('sellbtn')

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
buybtn.addEventListener('click',function () {//매수
    if(buycost<= money && buycost > 0){
        edit('log',`${getInner('log')}(${time}|${y}) ${buystock}ATC를 ${buycost}달러로 사셨습니다.<br/>`)
        state += buycost
        stock += buystock
        money -= buycost
    }
})
sellbtn.addEventListener('click', function () { //매도
    sellcost = stock * Math.floor(y)
    edit('log',`${getInner('log')}(${time}|${y}) ${stock}ATC를 총 ${sellcost}달러로 매도했습니다. 수익:${profit}$!<br/>`)
    state = 0;
    money += sellcost
    stock = 0
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
    ran =sign * intRand(1,10) *1.5
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
    number.style.top = i*28-780+'px'
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
    
}, 2000);
setInterval(() => { //출력
    profit = Math.floor (y*stock) - state
    edit('panel',`${y.toFixed(2)}$/ATC (time = ${time})`);
    edit('stock',`매수할 가상화폐 수 (현재 ${stock}ATC 보유)` );
    edit('cost','매수가격: '+buycost+'$ 현재 소유:'+money+'$')
    edit('state',`현재 손익: ${profit} $`)
    //알려주기
    buystock = Number(document.getElementById('howmany').value)//구매예정주
    buycost = Math.floor(buystock*y)//구매예정가격
    if (buycost> money){
        document.getElementById('cost').style.color = 'red'
    }else document.getElementById('cost').style.color = 'black'
    if (profit> 0){
        document.getElementById('state').style.color = 'red'
    }else document.getElementById('state').style.color = 'blue'
}, 100);