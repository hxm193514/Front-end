 var tab = document.getElementsByClassName('tab')[0].children;
 var content = document.getElementsByClassName('content');
 for (let i = 0; i < tab.length; i++) {
     (function (i) {
         tab[i].onclick = function () {
           this.className += " bj";
           content[i].className += " show";
        
          for(var j = 0;j<tab.length;j++)
          {
              if(i!=j)
              {
                content[j].className = "content";
                tab[j].className = '';
              }
          }
         }
     }(i))
 }