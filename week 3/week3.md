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
### 커맨트 리스트를 보고 말고 할 수 있는 버튼을 만들어봅시다.

### 버튼에 이벤트를 주기 위해서 할 수 있는 방법
1. 직접 DOM을 수정한다 --> Jquery, Backbone etc..
2. 간접적으로 DOM을 수정한다 --> React

### 직접 변경하는 방식의 예 - JQuery
```javascript
    $(".show-btn").on("click", function() {
       $(".comment-list").show();
    });
    $(".show-btn").on("click", function() {
       $(".comment-list").hide();
    });
```
- Events --> DOM updates

### 간접적으로 변경하는 방식의 예 - React
```javascript
render() {
    if (this.state.showComments) {
        //보여주는 코드
    }
    // 코드가 없어요..
}
```
- Events --> Update state --> DOM updates 

### 한번 구현을 해 봅시다.

1. 먼저 state 를 확인하는 구분을 추가
```javascript
    var CommentBox = React.createClass({
        ...
        render : function() {
                        var comments = this._getComments(),
                            title = this._getCommentsTitle(comments.length);
                if (this.state.showComments) {
                    //추가해야 할 소스를 넣어야 합니다.                
                }
                return (
                    <div className="comment-box">
                            <h3>JOIN THE DISCUSSION</h3>
                            <h4 className="comment-count">{title}</h4>
                            <div className="comment-list">
                                    {comments}
                            </div>
                    </div>
            );
        }
    });
```
2. showComments 가 true일 경우 보여줘야 할 부분을 if 문에 추가
```javascript
    var CommentBox = React.createClass({
        ...
        render : function() {
                        var comments = this._getComments(),
                            title = this._getCommentsTitle(comments.length),
                            commentNodes;
                if (this.state.showComments) {
                    commentNodes = <div className="comment-list">{comments}</div>;
                }
                return (
                    <div className="comment-box">
                            <h3>JOIN THE DISCUSSION</h3>
                            <h4 className="comment-count">{title}</h4>
                            {commentNodes}
                    </div>
            );
        }
    });
```
3. state에 초기 값을 설정
```javascript
    var CommentBox = React.createClass({
        getInitialState: function() {
            return {
                showComments : true
            };
        }
        ...
    });
    //ECMA 2015
    class CommentBox extends React.Component {
        constructor() {
            super();
            this.state = {
                showComments : true
            };
        }
    }
```
4. state 를 수정하는 방법
```javascript
    this.state.showComments = ture; //잘못된 방법
    this.setState({showComments : true}); // 옳은 방법
```
5. 버튼 이벤트를 이용해서 상태를 변경하기
```javascript
    var CommentBox = React.createClass({
        ...
        render:function() {
            ...
            let buttonTitle = "Show comments";
            if (this.state.showcomment) {
                buttonTitle = "Hide comments";
            }
            <button onClick={this._clickButton}>{buttonTitle}</button>
            ...
        }
        
        _clickButton:function(event) {
            this.setState({
                showComments : !this.state.showComments
            });
        }
    });
```

## Event 합치기


# 참고 문헌
- 코드스쿨 강의(<http://www.codeschool.com>)
- <https://facebook.github.io/react/docs/component-specs.html>
