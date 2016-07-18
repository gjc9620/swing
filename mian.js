/**
 * Created by gujiacheng on 16/6/6.
 */
const co = function (genfun) {
  const gen = genfun();
  const next = (value) => {
    const ret = gen.next(value);
    if(ret.done) return
    ret.value((err, val)=>{
      if(err){ return console.error(err) }
      next(val);
    });
  };
  next();
};

let text =  document.getElementsByClassName("text");
let test =  document.getElementById("test");
let data = test.innerHTML;
let body =  document.querySelector("body");
let flag = 0;
let start = null;
let domHeight = 20;
let rowCount = test.offsetHeight / domHeight;
let Doms = new Array(rowCount).fill(1).map((v, i)=>{
    return (
      `<div class="row"   >
		    <div   class="text" style="top:-${i*domHeight}px">${data}
		    </div>
		  </div>`
		)
});
body.innerHTML = Doms.join("");

const change = function(Dom){
  return callback=>{
    console.log(Dom);
    let flag = 0;
    let an = function(){
      if(flag >= 100) return callback(null);
      Dom.style.backgroundImage = `linear-gradient(to right, red ${flag+=0.3}%, #000 0%)`;
      window.requestAnimationFrame(an);
    };
    window.requestAnimationFrame(an);
  }
};

const changeStart = function () {
  let {childNodes} = body;
  let childNodesArr = [].slice.apply(childNodes);
  co(
    function *() {
      for(let i=0;i<childNodesArr.length;i++){
        yield change(childNodesArr[i].children[0]);
      }
    }
  )
};
[].slice.apply(text).forEach(v=> v.onclick = changeStart );













