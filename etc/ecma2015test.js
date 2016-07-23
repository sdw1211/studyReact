/********************************
 * 참고 http://ccoenraets.github.io/es6-tutorial/ecmascript6-destructuring.html
 * let 을 써보자.
 * var 와 다르게 block scope
 * 특별한 경우가 아니면 var 보다는 let을 사용할 것을 권장
 * ******************************/
 function testLet() {
     
     for (let i=0; i < 5; i++) {
         console.log(i);
     }
     
     //console.log(i); //에러 let은 block-scope 이기 때문에 for 문에서만 사용가능
 }
 
 testLet();
 /********************************
 * Destructuring
 * 배열이나 objets 를 쉽게 분해할 수 있는 방법을 제공
 * 여러 개의 리턴 값을 받고 변수에 넣을 수 있는 기능
 * ******************************/
 function testDestructuring() {
     let test = false;
     let test2 = "하하하하하하";
     let test3 = 1212121212;
     
     return {test, test2, test3};
 }
 
 let {test, test2, test3} = testDestructuring();
 
 console.log(test);
 console.log(test2);
 console.log(test3);
 /******************************************
  * Arrow Functions
  * 함수 표현을 간단하게 가능
  * 여기서 this는 function 바로 밖의 this!!
  * 그래서 var that = this; 이딴 짓을 안해도 된다.
  ******************************************/
  let b = [1,2,3,4,5,6,7];
  b.map(value => console.log(value));
  
  /**************************************8
   * Template String 
   *  
   * *************************************/
   let templateString = function() {
    let data = "!!!";
    let vvvv = "@@@@";
    
    console.log(`HAHAHAHA ${data} - ${vvvv}`); 
   
   };
   
   templateString();
   