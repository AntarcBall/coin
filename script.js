// 변수,DOM객체선언
let money = 10000
let buycost = 0;
let buystock = 0;
var stock = 0;
var time = 0;
var state = 0;
const thickness = 6;
cvs = document.getElementById('canvas');//세팅
ctx = cvs.getContext('2d');
buybtn = document.getElementById('buybtn');
sellbtn = document.getElementById('sellbtn')
x=0;y=cvs.height/2//캔버스 관련 세팅
//함수 선언, 클릭 이벤트 정의
function intRand(a,b){
    return Math.floor((Math.random() * (b-a+1)) + a);
}
function edit(id,inner) {
    document.getElementById(id).innerHTML = inner;
}
buybtn.addEventListener('click',function () {//매수
    if(buycost<= money){
        console.log(`${y}$짜리주식 ${buystock}주를 ${buycost}달러로 사셨습니다.`)
        state += buycost
        stock += buystock
        money -= buycost
    }
})
sellbtn.addEventListener('click', function () { //매도
    money += stock * Math.floor(y)
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
}
function initBackground() {
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function randomChange(){ //변동 
    return intRand(-10,10) //기본 변화
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
grid(cvs.width/(thickness+2),0);
setInterval(() => {
    time ++;
    ctx.beginPath(); //시작
    ctx.lineWidth=thickness; 
    chartDraw();
    x += thickness+2;//옆으로가기
    if (x>cvs.width){ //선넘으면 다시 복귀
        initBackground();
        grid(cvs.width/(thickness+2),0);
        x = 0
    }    
    ctx.closePath();   
    edit('panel',`${y.toFixed(2)}$/ATD (time = ${time})`);
    edit('stock',`매수할 가상화폐 수 (현재 ${stock}ATD 보유)` );
    edit('cost','매수가격: '+buycost+'$ 현재 소유:'+money+'$')
    let profit = y*stock - state
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
}, 200);