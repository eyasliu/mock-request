import {h, Component} from 'preact'

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
const query = ((search) => {
	const data = {}
	search.slice(1).split('&').forEach(item => {
		const p = item.split('=')
		data[p[0]] = p[1] || true
	})
	return data;
})(window.location.search)

export default class App extends Component{
	constructor(props){
		super()
		this.state = {
			res: '',
			method: (query.method && query.method.toUpperCase()) || 'GET',
			path: query.path || '',
			body: ''
		}
		if(query.submit){
			this.submit()
		}
	}
	submit(e){
		const {method, path, body} = this.state
		this.setState({
			res: '正在请求，请稍后...'
		})
		fetch(path, {
			method
		}).then(res => res.text()).then(data =>{
			let parseData
			try{
				parseData = JSON.stringify(JSON.parse(data), null, 4)
			}catch(e){
				parseData = data
			}
			this.setState({
				res: parseData
			})
		}).catch(e => {
			this.setState({res: e.message})
		})
	}

	render(){
		return (
			<div className="container">
				{/*<div className="form">
					<div className="form-line">
						<select 
							name="method" 
							value={this.state.method} 
							onChange={e => this.setState({method: e.target.value})}
						>
							{methods.map(item => <option value={item}>{item}</option>)}
						</select>
						<input type="text" value={this.state.path} onChange={e => this.setState({path: e.target.value})} />
					</div>
					{<div className="form-line">
						<textarea name="body" value={this.state.body} onChange={e => this.setState({body: e.target.value})}></textarea>
					</div>
					<div className="form-line">
						<textarea name="header" onChange={e => this.setState({header: e.target.value})}></textarea>
					</div>}
					<div className="form-line">
						<button onClick={::this.submit}>发起请求</button>
					</div>
				</div>*/}
				{this.state.res && <pre className="code">{this.state.res}</pre>}
			</div>
		)
	}
} 