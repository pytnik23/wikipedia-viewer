!function(){function e(){var e=n.value,r="";r+="https://en.wikipedia.org/w/api.php?action=opensearch&format=json",r+="&search="+e;var c=function(){var e=0;return function(t,n,r){var c="_jsonp_"+e++;t+=t.match(/\?/)?"&callback="+c:"?callback="+c;var a=document.createElement("script");a.type="text/javascript",a.src=t,window[c]=function(e){n.call(r||window,e),document.getElementsByTagName("head")[0].removeChild(a),a=null,delete window[c]},document.getElementsByTagName("head")[0].appendChild(a)}}();c(r,function(e){t(e)})}function t(e){if(!e)return void console.log("Error!");u.innerText="";var t=e,n=document.createDocumentFragment();c.style.height="10%",o.innerText=t[0];for(var r=0;r<t[1].length;r++){var d=document.createElement("a"),i=document.createElement("h3"),l=document.createElement("p");i.innerText=t[1][r],l.innerText=t[2][r],d.appendChild(i),d.appendChild(l),d.href=t[3][r],d.target="_blank",n.appendChild(d)}u.appendChild(n),a.style.opacity=1}var n=document.querySelector(".search__input"),r=document.querySelector(".search__button"),c=document.querySelector(".search-wrapper"),a=document.querySelector(".search-output"),o=document.querySelector(".search-query__text"),u=document.querySelector(".search-results");r.addEventListener("click",e),n.addEventListener("keypress",function(t){13===t.keyCode&&(e(),this.blur())})}();