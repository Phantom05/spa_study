

const ev =(_=>{

  const ev = new (class extends WeakMap{
    constructor(){super();}
    addEv(el, event, listener){
      if(!this.has(el)) this.set(el, new Map);
      const channel = this.get(el);
      if(!channel.has(event)) channel.set(event, new Set);
      channel.get(event).add(listener);
      return this;
    }
    getEv(el, event){
      if(!this.has(el) || !this.get(el).has(event)) return;
      return this.get(el).get(event);
    }
  });

  const listener =e=>{
    let {target, type} = e;
    do{
      const list = ev.getEv(target, type);
      if(list){
        list.forEach(f=>f({target, type}));
        break;
      }
    }while(target = target.parentNode);
  };
  

  'click,mousedown,mouseup,touchstart,touchend'.split(',')
.forEach(ev=>document.body.addEventListener(ev, listener));

  return ev;
})();
 
 
const f =({target:{id}})=>console.log(id);
console.log(
  'wrapper,self'.split(',').map(v=>document.querySelector('#' + v))
);


// //이벤트리스너를 관리하는 구조체
// const ev = new (class extends WeakMap{
//   constructor(){super();}
 
//   //리스너추가 - 엘리먼트, 이벤트명, 리스너
//   addEv(el, event, listener){
//     //1. 엘리먼트별 Map생성
//     if(!this.has(el)) this.set(el, new Map);
//     const channel = this.get(el);
 
//     //2. 이벤트별 Set생성
//     if(!channel.has(event)) channel.set(event, new Set);
 
//     //3. 리스너는 이벤트별 Set에 추가
//     channel.get(event).add(listener);
//     return this;
//   }
 
//   //이벤트별 Set얻기
//   getEv(el, event){
//     if(!this.has(el) || !this.get(el).has(event)) return;
//     return this.get(el).get(event);
//   }
// });

// //통합리스너-버블링으로 검색해가자!
// const listener =e=>{
//   let {target, type} = e;
//   do{
//     //현재 타겟에 리스너가 설정되었다면
//     const list = ev.getEv(target, type);
//     if(list){
//       //돌면서 실행!
//       list.forEach(f=>f({target, type}));
//       break;
//     }
//   //아니라면 부모로 이동
//   }while(target = target.parentNode);
// };
// 'click,mousedown,mouseup,touchstart,touchend'.split(',')
//   .forEach(ev=>document.body.addEventListener(ev, listener));

//   const f =({target:{id}})=>console.log(id);
 
//   //각각 이벤트를 등록한다.
//   'wrapper,self'.split(',').forEach(
//     id=>ev.addEv(document.querySelector('#' + id), 'click', f)
//   );
  

