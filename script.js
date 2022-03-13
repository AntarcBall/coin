alert('ㄱㄱ')
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
const fees = 0.01;
const thickness = 6;
let change = 0;
var watchY = 0;
const max = 1000;
let y_history = []
cvs = document.getElementById('canvas');//세팅
ctx = cvs.getContext('2d');
buybtn = document.getElementById('buybtn');
sellbtn = document.getElementById('sellbtn');
upbtn= document.getElementById('up');
downbtn= document.getElementById('down');
sellallbtn = document.getElementById('sellallbtn')
//시작문구
var now = new Date();	
var hours = now.getHours();	 var minutes = now.getMinutes();	
var date = now.getDate();var months = now.getMonth() +1;
edit('log',`(${months}/${date}|${hours}:${minutes}) 참고:살 때 ${fees*100}%의 수수료 비용이 있으며 모든 매매시 내림이 적용됩니다.`)
x=0;y=max/2//캔버스 관련 세팅
y_history.push(max/2   )
//함수 선언, 클릭 이벤트 정의
function getInner(id){return document.getElementById(id).innerHTML;}
function intRand(a,b){return Math.floor((Math.random() * (b-a+1)) + a);}
function edit(id,inner) {document.getElementById(id).innerHTML = inner;}
function writeLog(value){edit('log',getInner('log')+'('+time+'|'+y.toFixed(2)+')'+value+'<br/>')}
buybtn.addEventListener('click',function () {//매수
    if(buycost<= money && buycost > 0){
        if(transtock%1 == 0){
            writeLog(`${transtock}ATC를 ${fees*100}%수수료 적용되어 ${buycost}달러로 사셨습니다.`)
            stockstate += transtock;
            state += buycost
            averageY = (state / stockstate)
            stock += transtock
            money -= buycost
        }else writeLog('매입은 자연수로 해야 합니다.');
    }
})
function sell(volume){ //매도
    if(stock>0 && volume>0 && volume%1 == 0){
        writeLog(`${volume}ATC를 총 ${sellcost}달러로 매도했습니다`)
        state -= averageY*volume;
        money += sellcost;
        stock -= volume;
        stockstate -= volume;
}
}
sellbtn.addEventListener('click', function () {sell(transtock);}) //매도버튼
sellallbtn.addEventListener('click',function(){sell(stock);}) //전체매도버튼
upbtn.addEventListener('click', function () {watchY -= 10}) //위
downbtn.addEventListener('click', function () {watchY += 10}) //아래
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
    ctx.beginPath()
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    grid(cvs.width/(thickness+2),10);
    ctx.closePath();
}
function randomChange(){ //변동 
var sign = intRand(0,1)*2 -1
    ran =sign * intRand(3,20)
    return ran //기본 변화
}
function chartDraw(){
    ctx.moveTo(x,cvs.height-y/max*cvs.height)
    change = randomChange()
    if (intRand(1,3)>1){
        
    }
    if (y < max*0.1){
        change += 3
    }else if (y> max*0.9) change -= 3;
    y += change //y이동
    if(change>0){  //변화량 확인
        ctx.strokeStyle = '#FF0000'
    }else{ctx.strokeStyle = '#0000FF'    }
    ctx.lineTo(x,cvs.height- y/max*cvs.height)
    ctx.stroke();
    x += thickness +2
    if (x >= cvs.width) {
        x = 0
        initBackground();
    }
    y_history.push(y)
}   
function makeLable(number){
    var number = document.createElement( 'div' );
    var numberText = document.createTextNode(max-i*(max/10));
    number.appendChild( numberText );
    document.body.appendChild( number );
    number.style.position = 'relative'
    number.style.top = i*28-880+'px'
    number.style.left = '1150px'
}
for(var i=0;i<11;i++){
    makeLable(i);
}
initBackground();
setInterval(() => { //차트 그리기
    ctx.beginPath()
    time ++;
    ctx.lineWidth=thickness; 
    chartDraw();
    ctx.closePath();
    
}, 3000);
setInterval(() => { //출력
    sellcost =  Math.floor(transtock *y)
    transtock = Number(document.getElementById('howmany').value)//구매예정량 
    buycost = Math.floor((1+fees)*transtock*y)//구매예정가격
    profit = Math.floor(stock*y) - state
    edit('panel',`${y.toFixed(2)}`);
    edit('change',`${change>0? '▲':'▼'}${Math.abs(change)}<br/>${(change/(y-change)*100).toFixed(1)}%`);
    edit('stock',`매수할 가상화폐 수  (현재 소유: ${stock}ATC)`);
    edit('cost','매입시 가격: '+buycost+'$  (현재 소유:'+money+'$)')
    edit('state',`평가손익: ${Math.floor(profit)} $`)
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
