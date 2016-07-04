var data  = [
    {id : 1, auth : "서동우", content:"하하하하"}
    , {id : 2, auth : "호호호", content:"히히히히히히히"}
    , {id : 3, auth : "호호호", content:"히히히히히히히"}
    ];

var Comment = React.createClass({
    
    render : function() {
        return (
            <div className="comment">
                <p className="comment-header">{this.props.auth}</p>
                <p className="comment-body">{this.props.content}</p>
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
    _getComments : function(comments) {
        return comments.map(comment => <Comment auth={comment.auth} content={comment.content} key={comment.id} />);
    },
    render : function() {
        return (
            <div class="comment-box">
                <h3>JOIN THE DISCUSSION</h3>
                <h4 class="comment-count">{data.length} COMMENTS</h4>
                <div class="comment-list">
                  {this._getComments(data)}
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox />,
    document.getElementById("content"));