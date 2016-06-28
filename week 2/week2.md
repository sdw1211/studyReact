# 2주차 Props 통해서 말하자!

## React.js 에서 이야기 하는 element와 component의 관계?

* An element is a plain object describing a component instance or DOM node and its desired properties.
* element에는 **두 가지의 정보**만을 가지고 있다
  * type -> component type
  * property
* element는 실제 instance는 아니고, 사용자가 React에게 나 이런 것이 화면에 있었으면 좋겠네 하고 알려주는 방법
* 메소드 호출 불가(호출할 메소드도 없음 왜냐 딸랑 두개 일 뿐이니..)
* DOM Element를 하나 예를 들어보면
  ```html
    <button class="button button-blue"><b>OK</b></button>
  ```
* 이 DOM Element 의 React에서의 실제 tree 구조를 보면
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
* 실제 DOM Instance가 아닌 표현체
* 그럼 React Element는 먼가 틀린가요?
  ```javascript
    {
      type: Button,
      props: {
        color: 'blue',
        children: 'OK!'
      }
    }  
  ```
* An element describing a component is also an element, just like an element describing the DOM node. They can be nested and mixed with each other.
* 결론은 React Element나 DOM Element 는 서로 같기 때문에 서로 각자를 사용할 수 있다.(is a, has a 관계 둘다 가능)
* Component 는 properties 를 받아서 element tree를 리턴해주는 것
* The returned element tree can contain both elements describing DOM nodes, and elements describing other components. This lets you compose independent parts of UI without relying on their internal DOM structure.
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
