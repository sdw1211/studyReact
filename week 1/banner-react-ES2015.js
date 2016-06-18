class BannerBox extends React.Component {
 	constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

	componentDidMount() {
		$.ajax({
			url:this.props.url,
			dataType:"jsonp",
			jsonp:"callback",
			data:{appKey:'2013111211', key:'8f17633e-4', channel:'est'},
			type:"get",
			success:function(data) {
				console.log(data);
				this.setState({data : data.banners});
			}.bind(this)
		});
	}

	render() {
		return (
			<div className="banner m_banner" style={{height: "1452px"}}>
				<NaviBox data={this.state.data} />
				<ImageBox data={this.state.data} />
			</div>
		);
	}
};

class NaviBox extends React.Component {
	render() {
		let navList = function() {
			var output = [], i=0;
			
			for (;i<this.props.data.length; i++) {
				let prop = {
					key : this.props.data[i].imageNo,
					index : i,
					imageOrder : this.props.data[i].imageOrder,
				};

				output.push(
					<Navi {...prop} />
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
};

class Navi extends React.Component {
	render() {
		let getClass = function(data) {
			return  data === 1 ? "on" : "";
		};

		return (
			<li className={getClass(this.props.imageOrder)}>
				<a href="#n" data-index={this.props.index} />
			</li>
		);
	}
}


class ImageBox extends React.Component {
	render() {
		let imageList = this.props.data.map((image) => <Image {...image} />);
		
		return (
			<ul className="b_img">
				{imageList}
			</ul>
		);
	}
}

class Image extends React.Component {
	render() {
		let liStyle =  {
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
}

ReactDOM.render(
		<BannerBox url={"http://openapi.estgames.co.kr/banner/view.json"} />,
		document.getElementById("content")
);
