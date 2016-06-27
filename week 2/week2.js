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

ReactDOM.render(
  <CommentBox />,
  document.getElementById("content")
);
