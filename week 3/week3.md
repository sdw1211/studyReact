# React의 Stats와 Event

## React.js Life Cycle

## render()

1. props와 stats 데이터 확인
1. 해당 데이터에 맞게 element를 생성(Dom element 또는 React Component)
1. 만약 랜더링한 데이터가 없거나 할 때는 null 이나 false도 리턴할 수 있음
1. render() 함수는 pure 하기 때문에, state에 따라 변경되지 않고 매 번 같은 결과 값을 나타낸다.
1. 즉 브라우저에서 어떤 액션이 발생을 하더라고 render() 된 데이터는 영향을 받지 않는다.

## Mounting
### componentWillMount()
### componentDidMount()

## Updating
### componentWillReceiveProps()
### shouldComponentUpdate()
### componentWillUpdate()
### componentDidUpdate()

## Unmounting
### componentWillUnmount()

![React Life Cycle](https://scontent.xx.fbcdn.net/t31.0-8/10697276_10154774642145430_8286640594425143330_o.jpg)
https://www.facebook.com/photo.php?fbid=10154774642145430&set=gm.1491610957781164&type=1&theater

## Component Stats
## Event 합치기