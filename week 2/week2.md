# 2주차 Props 통해서 말하자!

## React.js 에서 이야기 하는 element와 component의 관계?

* An element is a plain object describing a component instance or DOM node and its desired properties.
* element에는 **두 가지의 정보**를 가지고 있다
  * type -> component type
  * property
* element는 실제 instance는 아니다(그래서 실제 돔이랑 관련이 없다.)
* React에게 나 이런 것 좀 그려도 될까 하고 알려주는 하나의 설계도 같은 개념?
* 메소드나 이런 것은 존재하지 않는다.
* DOM Element로 하나의 예를 만들어보면

 ```html
  <button class="button button-blue"><b>OK</b></button>
 ```

* 이 DOM Element 를 React에서의 elements 로 구현을 하면.
  
  ```javascript
    {
      type: 'button',
      props: {
        className: 'button button-blue',
        children: {
          type: 'b',
          props: {
            children: 'OK!'
          }
        }
      }
    }  
  ```
  
* Vitural DOM에서 위와 같은 형태로 되어 있다.
* 그렇기 때문에 실제 DOM과는 연관이 되지 않는다.
* 그럼 Dom Element는 저렇고 React Element 는 어떨까요?
  
  ```javascript
    {
      type: Button,
      props: {
        color: 'blue',
        children: 'OK!'
      }
    }  
  ```
  
* 생긴게 똑같다. 결론은 React Element나 DOM Element나 서로 형태가 똑같기 때문에, 서로 부모 자식관계가 될 수도 있고, 서로 동등한 관계로 될 수가 있다.
* 결론은 React Element나 DOM Element 는 서로 같기 때문에 서로 각자를 사용할 수 있다.(is a, has a 관계 둘다 가능)
* React 에서 Component의 역할은 Property를 Input으로 받아서 Ouput으로 React Element Tree를 준다.
* 이 같은 특징을 이용해서 좀 더 재사용가능하고, 유연한 Component를 구성해서 사용할 수 있다.

* Component 를 선언하는 방법
  * function 방법
```javascript
const Button = ({ children, color }) => ({
  type: 'button',
  props: {
    className: 'button button-' + color,
    children: {
      type: 'b',
      props: {
        children: children
      }
    }
  }
});
```
  * class 방법
```javascript
class Button extends React.Component {
  render() {
    const { children, color } = this.props;
    return {
      type: 'button',
      props: {
        className: 'button button-' + color,
        children: {
          type: 'b',
          props: {
            children: children
          }
        }
      }
    };
  }
}
```
  * factory 를 이용하는 방법
```javascript
const Button = React.createClass({
  render() {
    const { children, color } = this.props;
    return {
      type: 'button',
      props: {
        className: 'button button-' + color,
        children: {
          type: 'b',
          props: {
            children: children
          }
        }
      }
    };
  }
});
```

* 여러가지 방법이 있는데 이것들은 전부 React Component 다!! 
* 하지만 위와 같은 방식으로 직접 element를 생성하는 건 추천하지 않고, JAX를 사용하거나 createElement 등을 이용해서 처리하자~!
* Top-Down Reconciliation
  * ReactDOM.render() 나 setState()가 호출 될 때 reconciliation이라는 절차가 실행이된다.
  * 해당 절차는 Dom elemement 가 리턴 될 때까지 계속 동작하고, Dom element가 리턴 될 때 reactDOM, reactNative 와 같은 Rederer 들이 최적화된 Reder 를 실행하게 된다.

## Comments 엔진을 Components 기반으로 설계하기

![Components 기반 설계](https://raw.githubusercontent.com/sdw1211/studyReact/master/week%202/CommentBox_Image.PNG)

## 자 그럼 한번 만들어볼까요??

### html 결과물

```html
<div class="comment-box">
    <h3>JOIN THE DISCUSSION</h3>
    <h4 class="comment-count">2 COMMENTS</h4>
    <div class="comment-list">
        <div class="comment">
            <p class="comment-header">Anne Droid</p>
            <p class="comment-body">I wanner know what live is ....</p>
            <div class="comment-footer">
                <a herf="#" class="comment-footer-delete">
                    DELETE COMMENT
                </a>
            </div>
        </div>
        <div class="comment">
            <p class="comment-header">Anne Droid</p>
            <p class="comment-body">I wanner know what live is ....</p>
            <div class="comment-footer">
                <a herf="#" class="comment-footer-delete">
                    DELETE COMMENT
                </a>
            </div>
        </div>
    </div>
</div>
```

### 작은 것 부터 만들어 봅시다 - Comment

```javascript
var Comment = React.createClass({
    render : function() {
        return (
            <div className="comment">
                <p className="comment-header">Anne Droid</p>
                <p className="comment-body">I wanner know what live is ....</p>
                <div className="comment-footer">
                    <a herf="#" className="comment-footer-delete">
                        DELETE COMMENT
                    </a>
                </div>
            </div>
        );
    }
});
```

### 그 다음 것도 만들어봅시다. - CommentBox

```javascript
var CommentBox = React.createClass({
    render : function() {
        return (
            <div class="comment-box">
                <h3>JOIN THE DISCUSSION</h3>
                <h4 class="comment-count">2 COMMENTS</h4>
                <div class="comment-list">
                    <Comment />
                  <Comment />
                </div>
            </div>
        );
    }
});
```

## 흠 먼가 데이터가 같은데... 다른 데이터를 넣을려면 설마 Component를 다시 만들어야 하나요..

- 설마... 그럼 이거 왜 씀..
- props 라는 것을 사용하여 **부모가 자식한데 데이터를 넘겨 줄 수 있음(중요!!!!, 단방향)**
- 그럼 어떻게 사용나요. xml에 속성 값(attribute) 주듯이 사용 가능

  ```javascript
  var CommentBox = React.createClass({
    render : function() {
        return (
            <div class="comment-box">
                <h3>JOIN THE DISCUSSION</h3>
                <h4 class="comment-count">2 COMMENTS</h4>
                <div class="comment-list">
                    <Comment author="Antonio Seo" body="Hello!! Rosaria"/>
                     <Comment author="Rosaria Huh" body="Hello!! Antonio"/>
                </div>
            </div>
        );
    }
  });
  ```

- 그럼 자식은 어떻게 받아요?? --> {this.props.XXXX} 형식으로 받을 수 있어요!

  ```javascript
  var Comment = React.createClass({
    render : function() {
        return (
            <div className="comment">
                <p className="comment-header">{this.props.author}</p>
                <p className="comment-body">{this.props.body}</p>
                <div className="comment-footer">
                    <a herf="#" className="comment-footer-delete">
                        DELETE COMMENT
                    </a>
                </div>
            </div>
        );
    }
  });
  ```

# 여러 개의 데이터 처리는 이렇게 합니다.

## 아래와 같이 배열로 데이터를 받아온다고 합니다.

```javascript
  var commentsList = [
    {id : 1, author : "Antonio Seo", body:"Hello! Rosaria"},
    {id : 2, author : "Rosaria Huh", body:"Hello! Antonio"}
  ];
```

## 그럼 아래와 같이 수정해 봅시다.

```javascript
  var CommentBox = React.createClass({
    _getComments: function() {
        var commentsList = [
            {id : 1, author : "Antonio Seo", body:"Hello! Rosaria"},
            {id : 2, author : "Rosaria Huh", body:"Hello! Antonio"}
        ];

        return commentsList.map((comment)
                => <Comment author={comment.author} body={comment.body} key={comment.id} />);
    }, render : function() {
            var comments = this._getCommets();
        return (
          <div class="comment-box">
              <h3>JOIN THE DISCUSSION</h3>
              <h4 class="comment-count">{comments.length} COMMENTS</h4>
              <div class="comment-list">
                  {comments}
              </div>
          </div>
      );
    }
  });
```

## 자 끝났을까요?? 타이틀이 먼가 이상해요..

- 2건 이상일 때는 맞는거 같은데, 1건이하는 안맞아요.
- 그럼 이렇게 수정해봅시다.

  ```javascript
    var CommentBox = React.createClass({
        ....
        _getCommentsTitle : function(commentCount) {
            if (commentCount === 0) {
                return "No comments yet";
            } else if (commentCount === 1) {
                return "1 COMMENT";
            } else {
                return commentCount + " COMMENT";
            }
        }
    });
  ```

## 자 그럼 최종판은 이렇습니다.

```javascript
var CommentBox = React.createClass({
    _getComments: function() {
            var commentsList = [
                    {id : 1, author : "Antonio Seo", body:"Hello! Rosaria"},
                    {id : 2, author : "Rosaria Huh", body:"Hello! Antonio"}
            ];

            return commentsList.map((comment) => <Comment author={comment.author} body={comment.body} key={comment.id} />);
    }, _getCommentsTitle : function(commentCount) {
        if (commentCount === 0) {
            return "No comments yet";
        } else if (commentCount === 1) {
            return "1 COMMENT";
        } else {
            return commentCount + " COMMENT";
        }
    }, render : function() {
                    var comments = this._getComments(),
                             title = this._getCommentsTitle(comments.length);
            return (
                <div class="comment-box">
                        <h3>JOIN THE DISCUSSION</h3>
                        <h4 class="comment-count">{title}</h4>
                        <div class="comment-list">
                                {comments}
                        </div>
                </div>
        );
    }
});
```
# 참고 문헌

* 코드스쿨 강의(http://www.codeschool.com)
* https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html
* https://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html
* https://facebook.github.io/react/blog/2014/10/14/introducing-react-elements.html
* https://gist.github.com/sebmarkbage/fcb1b6ab493b0c77d589
