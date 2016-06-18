var BannerBox = React.createClass({
	getInitialState: function() {
	    return {data: []};
	}, componentDidMount: function() {
		$.ajax({
			url:this.props.url,
			dataType:"jsonp",
			jsonp:"callback",
			data:{appKey:'2013111211', key:'8f17633e-4', channel:'est'},
			type:"get",
			success:function(data) {
				this.setState({data : data.banners});
			}.bind(this)
		});
	},
	render : function() {
		return (
			<div className="banner m_banner" style={{height: "1452px"}}>
				<NavBox data={this.state.data} />
				<ImageBox data={this.state.data} />
			</div>
		);
	}
});

var NavBox = React.createClass({
	render : function() {
		var navList = function() {
			var output = [], i=0;
			
			for (;i<this.props.data.length; i++) {

				var prop = {
					key : this.props.data[i].imageNo,
					index : i,
					imageOrder : this.props.data[i].imageOrder
				};

				output.push(
					<Nav {...prop} />
				);
			}
			
			return output;
		}.bind(this);
		
		return (
			<ul className="nav">
				{navList()}
			</ul>
		);
	}
});

var Nav = React.createClass({
	render : function() {
		
		var getClass = function(data) {
			return  data === 1 ? "on" : "";
		};
		return (
			<li className={getClass(this.props.imageOrder)}>
				<a href="#n" data-index={this.props.index} />
			</li>
		);
	}
});

var ImageBox = React.createClass({
	render : function() {
		var imageList = this.props.data.map((image) => <Image {...image} key={image.imageNo} />);
		
		return (
			<ul className="b_img">
				{imageList}
			</ul>
		);
	}
});

var Image = React.createClass({
	render : function() {
		var liStyle =  {
			background : "url(" + this.props.imageUrl + ") no-repeat"
		}, getClass = function(data) {
			return  data === 1 ? "on" : "";
		};
		
		return (
			<li className={getClass(this.props.imageOrder)} style={liStyle}>
				<a href={this.props.targetUrl} target={this.props.target}></a>
			</li>
		);
	}
});

ReactDOM.render(
		<BannerBox url={"http://openapi.estgames.co.kr/banner/view.json"} />,
		document.getElementById("content")
);
