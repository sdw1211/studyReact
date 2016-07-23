

class Comment extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.name}</p>
                <p>{this.props.comment}</p>
            </div>    
            );
    }
}

class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {
            showcomment : false,
            comments : [
    {name : "David Seo",  comment:"dwdwqdqwd", key:1},
    {name : "Antonio Seo",  comment:"asqqsq", key:2}
    ]
        };
    }
    
    _addComment(name, comment) {
        let com = {name : name,  comment:comment, key:this.state.comments.length + 1};
        this.setState({
            comments : this.state.comments.concat([com])
            
        });
    }
    _getComments() {
        return this.state.comments.map(comment => 
        <Comment {...comment} />);
    }
    
    _getTitle() {
        return this.state.comments.length + " Comments"
    }
    
    _clickButton(e) {
        e.preventDefault();
        this.setState({showcomment : !this.state.showcomment});

    }
    
    
    render() {
        let comment = null;
        
        if (this.state.showcomment) {
            comment = (<div>
                    <div>{this._getTitle()}</div>
                    <div>
                        {this._getComments()}
                    </div>
                </div>);
        }
        
        return (<div className="comment-box">
                    <CommentForm add={this._addComment.bind(this)}/>
                    <button onClick={this._clickButton.bind(this)}>show comments</button>
                    <div>Comment</div>
                    {comment}
                </div>);
    }
}

class CommentForm extends React.Component{
    _submit(e) {
        e.preventDefault();
        this.props.add(this._name.value, this._comment.value);
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this._submit.bind(this)}>
                    <input ref={data => this._name = data}/>
                    <textarea ref={data => this._comment = data} />
                    <button>submit</button>
                </form>
            </div>
            
            );
    }
}


ReactDOM.render(
    <CommentBox />, document.getElementById("content")
    );