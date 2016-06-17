# React.js 스터디

## 1주차 First Component

### React 가 멀까요?
* React 는 사용자 UI를 만들기 위한 자바스크립트 **라이브러리**
* MV* 에서 V 만을 위해서 개발됨
* 목적 : building large applications with data that changes over time.
* 페이스북, 드랍박스, 인스타그램, Paypal, 넷플렉스 등에서 이용
* Simple
* Declarative
	* 쉽게 Interactive 한 UI를 만들 수 있다..(정말로?)
	* Component 기반의 디자인으로 설계할 경우 최대한 활용 가능
* Component-Based
	* 템플릿 엔진과는 틀림.
	* 너가 할일은 컴퍼넌트를 만드는 일 뿐!!!!
* Learn Once, Write Anywhere
	* Node.js 랑 합쳐서 mobile app도 만들 수 있데.(react.js native)

### React가 왜 만들어 졌을까요?

* React really shines when your data changes over time.
* React는 프레임워크가 아니다!!
	* 재사용가능한 유저 인터페이스를 만들기 위해 라이브러리!
	* 데이터가 빈번하게 발생하는 재사용 가능한 UI 컴퍼넌트 개발에 추천을 함
* React는 템플릿을 사용하지 않는다!
	* React는 여러 개의 component 을 조립만든다.
	* 오직 자바스크립트와 마크업 만을 사용해서 만든다.

### 사전에 필요한 지식은?
* 자바스크립트에 대한 기본 지식
* ES2015 - 이건 알아도 되고 몰라도 되고
	* class
	* =>
	* let

### Component 기반의 아키텍쳐

* React는 Component에서 시작해서 Component로 끝
* 그렇기 때문에 React를 개발하기 위해서는 너가 만들고자 하는 것을 최대한 Component화 시킬 수 있는게 중요
* 최대한 작고 단순하게!!

### React Component

* 자바스크립트의 함수와 비슷하게 동작
* render()라는 함수를 가지고 있어야 한다.
* 데이터가 변경되면 해당 부분을 찾아서 자동으로 변경

### Virtual DOM

* DOM 처럼 생겼지만 DOM 이 아닌 머 그런거.
* 메모리 기반의 구현체
* React에서는 render()가 발생하면 우선 Virtual DOM을 수정한고 그 후 실제 DOM은 최소한의 변경을 처리
* 실제 render()를 통해서 나온 결과 값은 String도 아니고 DOM도 아닌 DOM과 비슷한 어떤 것이 나옴
* 이러한 작업은 reconciliation 이라고 한다...고..(아 영어)

### 한번 만들어 봅시다.

### JAX 란?

* React로 개발하다 보면 String도 아닌 먼가를 return 하고 있는데..
* 이 마크업 언어를 JAX라고 함
* javascript XML 을 줄여서 JAX라고 함.
* compile vs transpile
* babel 라이브러리를 이용해서 transpile 된다고 보면 되요..

### JAX를 사용해보자!

### JAX를 쓰는게 과연 좋을까?

* STF?
* javascript 안에 HTML 을 쓴단말인가...
* 개념분리(Separation of Concerns)에 맞나...
* You don't have to use JSX with React. You can just use plain JS. However, we recommend using JSX because it is a concise and familiar syntax for defining tree structures with attributes

### 참고문헌

* https://facebook.github.io/react/blog/2013/06/05/why-react.html
* http://www.codeschool.com 의 react.js 강의
* https://facebook.github.io/react
