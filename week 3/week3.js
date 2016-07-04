var Comment = React.createClass({
  getDefaultProps : function() {
      return {
        author : "HAHAHAH"  
      };
  }, propTypes : {
    author : React.PropTypes.string.isRequired,
    body : React.PropTypes.string
  },  render : function() {
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

var CommentBox = React.createClass({
    getInitialState: function() {
      return {
        showcomment : false,
        comments : [
                    {id : 1, author : "Antonio Seo", body:"Hello! Rosaria"},
                    {id : 2, author : "Rosaria Huh", body:"Hello! Antonio"}
            ]
      };
    }, _getComments: function() {
            var commentsList = this.state.comments;

            return commentsList.map((comment) => <Comment author={comment.author} body={comment.body} key={comment.id} />);
    }, _getCommentsTitle : function(commentCount) {
        if (commentCount === 0) {
            return "No comments yet";
        } else if (commentCount === 1) {
            return "1 COMMENT";
        } else {
            return commentCount + " COMMENT";
        }
    }, _getCommentList : function(comments) {
        if (this.state.showcomment) {
            return (
                    <div className="comment-list">
                        {comments}
                    </div>
                );
        }
        
        return ;
    }, _getButtonTitle : function() {
       if (this.state.showcomment) {
           return "Hide comments";
       } else {
           return "Show comments";
       }
    }, _clickButton : function(event) {
        event.preventDefault();
        this.setState({showcomment : !this.state.showcomment});
    },_addComment : function(name, content) {
        var comment = {
            id : this.state.comments.length + 1,
            author : name,
            body : content
        }
        
        this.setState({
            comments : this.state.comments.concat([comment])
 
            });
    },render : function() {
                    var comments = this._getComments(),
                        title = this._getCommentsTitle(comments.length),
                        commentsList = this._getCommentList(comments),
                        buttonTitle = this._getButtonTitle();
            return (
                <div className="comment-box">
                        <h3>JOIN THE DISCUSSION</h3>
                        <CommentForm addComment={this._addComment} />
                        <h4 className="comment-count">{title}</h4>
                        <button onClick={this._clickButton}>{buttonTitle}</button>
                        {commentsList}
                </div>
        );
    }
});

var CommentForm = React.createClass({
    _submit : function(event) {
       event.preventDefault();
       
       let name = this._name;
       let content = this._content;
       
       this.props.addComment(name.value, content.value);
       
    }, render : function() {
        return (
            <form className="comment-Form" onSubmit={this._submit}>
                <label>Join the disscusion</label>
                <div className="comment-Fields">
                    <p><input placeholder="Name" ref={name => this._name = name}  /></p>
                    <p><textarea placeholder="내용" ref={content => this._content = content} /></p>
                </div>
                <div className="comment-Action">
                    <p><input type="submit" value="등록하기" /></p>
                </div>
            </form>);
    }
    
});

ReactDOM.render(
  <CommentBox  />,
  document.getElementById("content")
);
