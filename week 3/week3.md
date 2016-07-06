# React의 Stats와 Event

## React.js Life Cycle

## Component Specifications
### render()

1. props와 stats 데이터 확인
1. 해당 데이터에 맞게 element를 생성(Dom element 또는 React Component)
1. 만약 랜더링한 데이터가 없거나 할 때는 null 이나 false도 리턴할 수 있음
1. render() 함수는 pure 하기 때문에, state에 따라 변경되지 않고 매 번 같은 결과 값을 나타낸다.
1. 즉 브라우저에서 어떤 액션이 발생을 하더라고 render() 된 데이터는 영향을 받지 않는다.

### getInitialState()

1. Component 가 마운트 되기 직전에 한번 만 동작
2. state 값을 초기화할 목적으로 사용

### getDefaultProps()

1. Component 를 선언할 때 한 번 생성되어 캐싱되어 있음
2. props 값에 default 값을 선언할 목적으로 사용


## Lifecycle Methods
### Mounting
#### componentWillMount()
- Mount 가 되기 직전에 한 번 실행하는 함수
- state 가 변경될 경우 아래 updating 관련 함수가 호출하는게 아니고 변경된 state 값을 이용해서 render() 함수가 호출
#### componentDidMount()
- Mount 가 되고 난 후에 실행하는 함수
- 이 단계에서부터 자식 노드의 ref 데이터를 가져올 수 있다.
- 자식 노드에 componentDidMount 함수가 있는 경우 그것 부터 실행
- Ajax 를 이용한 데이터 변경 로직을 이 단계에서 사용한다.

### Updating
#### componentWillReceiveProps(nextProps)
- 새로운 프로퍼티를 받거나 프로퍼티 값이 변경되었을 때 실행하는 함수
- Mount 할 때는 동작하지 않음
- props가 변경할 때 state 값을 변경할 경우가 있는 경우 해당 함수에서 호출

#### shouldComponentUpdate(nextProps, nextState)
- 새로운 props나 state를 받고 reder() 함수를 호출하기 전에 실행하는 함수
- 받은 state와 props 값을 검증해서 false을 리턴할 경우 다음 단계 전부 무시
- 잘못할 경우 알 수 없는 버그 찾는게 쉽지 않기 때문에 잘 써야 함

#### componentWillUpdate(nextProps, nextState)
- render() 하고 난 후에 실행하는 함수
- 여기서 setState를 사용할 경우 무한 루프에 빠짐

#### componentDidUpdate(prevProps, prevState)
- render() 하고 난 후에 실행하는 함수

### Unmounting
#### componentWillUnmount()
- DOM에서 unmount 되기 직전에 호출하는 함수

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

## Synthetic Events

### 입력 폼을 하나 만들어 봅시다!
### 이런 html을 폼으로 구성
```html
<form class="comment-form">
    <label>댓글 입력 창</label>
    <div class="comment-form-field">
        <input placeholder="이름" />
        <textarea placeholder="내용"></textarea>
    </div>
    <div class="comment-form-actions">
        <button type="submit">
            등록!
        </button>
    </div>
</form>
```

### 이것을 한번 React 로 만들어 봅시다.

1. 우선 html로 CommentForm 을 구성
```javascript
    var CommentForm = React.createClass({
        render : function() {
            return (
                <form className="comment-form">
                    <label>댓글 입력 창</label>
                    <div className="comment-form-field">
                        <input placeholder="이름" />
                        <textarea placeholder="내용"></textarea>
                    </div>
                    <div className="comment-form-actions">
                        <button type="submit">
                            등록!
                        </button>
                    </div>
                </form>
            );
        }
        
    });
```
2. Event를 등록
```javascript
    var CommentForm = React.createClass({
        _submit : function(event) {
            event.preventDefault();
        }, render : function() {
            return (
                <form className="comment-form" onSubmit={this._submit}>
                    <label>댓글 입력 창</label>
                    <div className="comment-form-field">
                        <input placeholder="이름" />
                        <textarea placeholder="내용"></textarea>
                    </div>
                    <div className="comment-form-actions">
                        <button type="submit">
                            등록!
                        </button>
                    </div>
                </form>
            );
        }
        
    });
```
2. 입력 하는 곳에 ref 를 설정
```javascript
    var CommentForm = React.createClass({
        _submit : function(event) {
            event.preventDefault();
            
            let name=this._name;
            let body=this._body;

        }, render : function() {
            return (
                <form className="comment-form" onSubmit={this._submit}>
                    <label>댓글 입력 창</label>
                    <div className="comment-form-field">
                        <input placeholder="이름" ref={name => this._name = name} />
                        <textarea placeholder="내용" ref={function(body) {
                            this._body = body;
                        }.bind(this)}></textarea>
                    </div>
                    <div className="comment-form-actions">
                        <button type="submit">
                            등록!
                        </button>
                    </div>
                </form>
            );
        }
        
    });
```

2. 입력은 어떻게 할까요?
```javascript
    var CommentForm = React.createClass({
        _submit : function(event) {
            event.preventDefault();
            
            let name=this._name;
            let body=this._body;
            
            this.prop.addComment(name.value, body.value);
        }, render : function() {
            return (
                <form className="comment-form" onSubmit={this._submit}>
                    <label>댓글 입력 창</label>
                    <div className="comment-form-field">
                        <input placeholder="이름" ref={name => this._name = name} />
                        <textarea placeholder="내용" ref={function(body) {
                            this._body = body;
                        }.bind(this)}></textarea>
                    </div>
                    <div className="comment-form-actions">
                        <button type="submit">
                            등록!
                        </button>
                    </div>
                </form>
            );
        }
        
    });
```
  - prop 는 함수로 가져올 수 있다.
  - 부모에게서 받은 prop를 이용해서 부모의 함수를 호출하는 것이 가능

3. 그럼 CommentBox는 어떤 내용이 추가
```javascript
    var CommentBox = React.createClass({
        ...
        render:function() {
            <div className="comment-box">
                <CommentForm addComment={this._addComment} />
            ...
            </div>
        }
        
        _addComment:function(name, body) {
            // 댓글 추가
        }
    });
```
4. 자동으로 데이터를 변경할 수 있도록 수정해봅시다.
```javascript
    var CommentBox = React.createClass({
        getInitialState:function() {
            return {
                showComments : true,
                comments: [
                    {id : 1, author : "Antonio Seo", body:"Hello! Rosaria"},
                    {id : 2, author : "Rosaria Huh", body:"Hello! Antonio"}
                ]
            };
        }
        ...
        render:function() {
            <div className="comment-box">
                <CommentForm addComment={this._addComment} />
            ...
            </div>
        }
        
        _addComment:function(name, body) {
            // 댓글 추가
            let comment = {
                id : this.state.comments.length + 1,
                author : name,
                body : body
            }
            
            this.setState({
                comments : this.state.comments.concat([comment])
            });
        }
    });
```


# 참고 문헌
- 코드스쿨 강의(<http://www.codeschool.com>)
- <https://facebook.github.io/react/docs/component-specs.html>
- <https://facebook.github.io/react/docs/events.html>