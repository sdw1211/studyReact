var Form = ({isSubmitted, buttonText}) =>  {
	if (isSubmitted) {
		return {
			type : Message,
			$$typeof: Symbol.for('react.element'),
			props : {
				text : 'Success!'
			}
		}
	}

	return {
		type: Button,
		$$typeof: Symbol.for('react.element'),
		props : {
			children:buttonText,
			color:'blue'
		}
	};
};

var Message = ({text})=> {
	return {
		type : "div",
		$$typeof: Symbol.for('react.element'),
		props: {
			children:text
		}
	}	
};

var Button = ({color})=> {
	return {
		type : "button",
		$$typeof: Symbol.for('react.element'),
		props: {
			className:"button",
			style:{color:color},
			children: {
				type: "p",
				$$typeof: Symbol.for('react.element'),
				props : {
					children:"OK!"
				}
			}
		}
	}	
};

ReactDOM.render(<Form isSubmitted={false} buttonText={'하하하하'}  />
	, document.getElementById("content"));