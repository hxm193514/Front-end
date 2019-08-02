// 点击开始游戏 --> 动态生成100个小格 100div
// leftClick 没有雷 --》 显示数字（代表以当前小格为中心周围8个格的雷数） 扩散（当前周围8个格斗没有雷）
//ruggtClick 没有标记并且不是数字--》进行标记。有标记--》取消标记  判断标记是否正确，正确标记-1，10个正确标记，提示成功


var starBtn = document.getElementById("starBtn");
var box = document.getElementById("box");
var promptText = document.getElementById('promptText');
var amount = document.getElementById('amount'); //雷的数量
var cpm = document.getElementById('cpm');
var boxcpm = document.getElementById('boxcpm');
var close1 = document.getElementById('close');
var minesNum;
var mineOver;
var grid;
var mineMap = [];
var isLei = document.getElementsByClassName('isLei');
bindEvent();
var startGameBool = true;
//开始绑定的事件
function bindEvent() {
    starBtn.onclick = function () {
        if (startGameBool == true) {
            box.style.display = 'block';
            promptText.style.display = 'block';
            init();
            startGameBool= false;
        }
    }
    box.oncontextmenu = function () {
        return false;
    }
    box.onmousedown = function (e) {
        var event = e.target;
        if (e.which == 1) {
            leftClick(event);
        } else if (e.which == 3) {
            rightClick(event);
        }
    }
    close1.onclick = function(){
        close();
    }

}

function init() {
    minesNum = 10;
    mineOver = 10;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var con = document.createElement('div');
            con.classList.add('grid');
            con.setAttribute('id', i + '-' + j);
            box.appendChild(con);
            mineMap.push({
                mine: 0
            });
        }
    }
    grid = document.getElementsByClassName('grid');
    while (minesNum) {
        var mineIndex = Math.floor(Math.random() * 100);
        if (mineMap[mineIndex].mine === 0) {
            mineMap[mineIndex].mine = 1;
            grid[mineIndex].classList.add('isLei');
            minesNum--;
        }
    }
    mineOver = isLei.length;
    amount.innerHTML = mineOver;
}

function leftClick(dom) {
    if (dom && dom.classList.contains('isLei')) {
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('show');
        }
        setTimeout(function() {
            boxcpm.style.display = 'block';
            cpm.style.backgroundImage = "url(img/over.jpg)";
        }, 1000);
      
    } else {
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('num');
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var aroudBox = document.getElementById(i + '-' + j);
                if (aroudBox && aroudBox.classList.contains('isLei')) {
                    n++;
                }
            }
        }
        dom && (dom.innerHTML = n);
        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }
}

function rightClick(dom) {

    if (dom.classList.contains('num')) {
        return;
    }
    dom.classList.toggle('sign');
    if (dom.classList.contains('isLei') && dom.classList.contains('sign')) {
        mineOver--;
            if(mineOver==0)
            {
                boxcpm.style.display = 'block';
                cpm.style.backgroundImage = "url(img/success.png)";
            }
    }
    if (dom.classList.contains('isLei') && !dom.classList.contains('sign')) {
        mineOver++;
    }
   
    amount.innerHTML = mineOver;
}
function close(){
    isLei.length;
    boxcpm.style.display = 'none';
    box.style.display = 'none';
    box.innerHTML = '';
  
    promptText.style.display = 'none';
    startGameBool = true;
}