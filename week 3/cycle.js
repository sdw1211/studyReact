var MountTest = React.createClass({
   getInitialState : function() {
        console.log("getInitialState");
        return {
            test : 100
        };
   }, getDefaultProps : function() {
        console.log("getDefaultProps");
        return {
            aaaa : 100
        };
   }, componentWillMount : function() {
        console.log("componentWillMount");
        //console.log(this.state);
        //console.log(this.props);
        //this.setState({test : 200});
   }, componentDidMount : function() {
        console.log("componentDidMount");
        //console.log(this.state);
        //console.log(this.props);
   }, componentWillReceiveProps : function(nextProps) {
        console.log("componentWillReceiveProps");
        //console.log(this.state);
        //console.log(this.props);
   }, shouldComponentUpdate : function(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        //console.log(this.state);
        //console.log(this.props);
        return true;
   }, componentWillUpdate : function(nextProps, nextState) {
        console.log("componentWillUpdate");
        //console.log(this.state);
        //console.log(this.props);
   }, componentDidUpdate : function(prevProps, prevState) {
        console.log("componentDidUpdate");
        //console.log(this.state);
        //console.log(this.props);
   }, componentWillUnmount : function() {
        console.log("componentWillUnmount");
        //console.log(this.state);
        //console.log(this.props);
   }, render : function() {
        console.log("render()");
        return (
             <div aaa={200} onClick={this._click}>{this.state.test}</div>
        );
   }, _click : function(e) {
       e.preventDefault();
       this.setState({test:this.state.test + 20});
   }
});

ReactDOM.render(<MountTest aaaa={200} />, document.getElementById("content"));
ReactDOM.render(<MountTest aaaa={500} />, document.getElementById("content"));
//ReactDOM.render(<div></div>, document.getElementById("content"));