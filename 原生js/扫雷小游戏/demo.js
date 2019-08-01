// 点击开始游戏 --> 动态生成100个小格 100div
// leftClick 没有雷 --》 显示数字（代表以当前小格为中心周围8个格的雷数） 扩散（当前周围8个格斗没有雷）
//ruggtClick 没有标记并且不是数字--》进行标记。有标记--》取消标记  判断标记是否正确，正确标记-1，10个正确标记，提示成功


var starBtn = document.getElementById("starBtn");
var box = document.getElementById("box");
var promptText = document.getElementById('promptText');
var minesNum;
var mineOver;
var grid;
var mineMap = [];
var isLei;
bindEvent();

//开始绑定的事件
function bindEvent() {
    starBtn.onclick = function () {
        box.style.display = 'block';
        promptText.style.display = 'block';
        init();
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

    for (var m = 0; m < minesNum; m++) {
        var mineIndex = Math.floor(Math.random() * grid.length);
        if (mineMap[mineIndex].mine === 0) {
            mineMap[mineIndex].mine = 1;
            grid[mineIndex].classList.add('isLei');
        }
    }
}

function leftClick(dom) {
    isLei = document.getElementsByClassName('isLei');
    if (dom && dom.classList.contains('isLei')) {
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('show');
        }
    }
}
function rightClick(dom){
    isLei = document.getElementsByClassName('isLei');
    if (dom && dom.classList.contains('isLei')) {
            isLei[i].classList.add('sign');
    }
}