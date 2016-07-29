class CommentForm extends React.Component {
    _formSubmit(e) {
        e.preventDefault();
        this.props.addComment(this._name.value, this._content.value);
    }
    render() {
        return (
            <form className="comment-form" onSubmit={this._formSubmit.bind(this)}>
                <label>Join the discussion</label>
                <div className="comment-form-fields">
                    <input placeholder="Name:" ref={input => this._name = input} />
                    <textarea placeholder="Content:" ref={textarea => this._content = textarea}></textarea>
                </div>
                <div className="Comment-form-actions">
                    <button type="submit">
                        Post comment
                    </button>
                </div>
            </form>
        );
    }
    
}

class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowComments : false,
            comments : []
        };
    }
    _fetchComments() {
        $.get("/get").done(this._setCommentsAtState.bind(this));
    }
    _sendComment(comment) {
        $.post("/sendAndGet", {...comment}).done(this._setCommentsAtState.bind(this));
    }

    _deleteComment(key) {
        $.ajax({
            method:"delete",
            url:`/removeAndGet/${key}`
        }).done(this._setCommentsAtState.bind(this));
    }
    
    _setCommentsAtState(comments) {
        this.setState({comments});
    }
    
    componentDidMount() {
        this._fetchComments();
        this._timer = setInterval(() => this._fetchComments(), 3000);
    }
    
    componentWillUnmount() {
        clearInterval(this._timer);
    }
    
    _getCommentCountMessage() {
        if (this.state.comments.length === 1) {
            return "1 comment";
        } else if (this.state.comments.length < 1) {
            return "No comments yet";
        } else {
            return `${this.state.comments.length} comments`;
        }
    }
    _getComments() {
        return this.state.comments.map(
                comment => <Comment {...comment} id={comment.key} onDelete={this._deleteComment.bind(this)} />
            );
    }
    _toggleViewButton(e) {
        e.preventDefault();
        this.setState({
            isShowComments : !this.state.isShowComments 
        });
    }
    _viewCommentList() {
        if (this.state.isShowComments) {
            return (
                <div className="comment-list">
                    {this._getComments()}
                </div>
            );
        }
        return;
    }
    _showCommentsMessage() {
        if (this.state.isShowComments) {
            return "hide comments";
        } else {
            return "show comments";
        }
    }
    
    _addComment(name, body) {
        let data = {name, body};
        this._sendComment(data);
    }
    render() {
        return (
            <div className="comment-box">
                <CommentForm addComment={this._addComment.bind(this)} />
                <h3>Comments</h3>
                <h4 className="commnet-count">{this._getCommentCountMessage()}</h4>
                <button onClick={this._toggleViewButton.bind(this)}>{this._showCommentsMessage()}</button>
                {this._viewCommentList()}
            </div>
        );
    }
}

class Comment extends React.Component {
    _deleteButton(e) {
        e.preventDefault();
        this.props.onDelete(this.props.id);
    }
    render() {
        return (
            <div className="comment">
                <p className="comment-header">{this.props.name}</p>
                <p className="comment-body">{this.props.body}</p>
                <p className="comment-footer">
                    <a href="#" 
                        className="comment-footer-delete" 
                        onClick={this._deleteButton.bind(this)}>
                        Delete Comment
                    </a>
                </p>
            </div>
        );
    }    
}

ReactDOM.render(<CommentBox />, document.getElementById("content"));