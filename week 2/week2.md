# 2주차 Props 통해서 말하자!

## 들어가기 전에 React.js 에서 이야기 하는 elements, components, instance 란?
https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html
https://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html
https://facebook.github.io/react/blog/2014/10/14/introducing-react-elements.html
https://gist.github.com/sebmarkbage/fcb1b6ab493b0c77d589

## Comments 엔진을 Components 기반으로 설계하기
![Components 기반 설계](CommentBox_Image.png)
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
### 그 다음 것을 붙여 봅시다 - CommentBox
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
## 흠 먼가 데이터가 같은데 -_-a 다른 데이터를 넣을려면 설마 Component를 다시 만들어야 하나요..
* 설마... 그럼 이거 왜 씀..
* props 라는 것을 사용하여 **부모가 자식한데 데이터를 넘겨 줄 수 있음(중요!!!!, 단방향)**
* 그럼 어떻게 사용나요. xml에 속성 값(attribute) 주듯이 사용 가능
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
* 그럼 자식은 어떻게 받아요?? --> {this.props.XXXX} 형식으로 받을 수 있어요!
```javascript
var CommentBox = React.createClass({
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

