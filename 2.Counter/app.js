const Counter = React.createClass({
  render(){
    return <h1>Counter {this.state.count}</h1>
  },
  
  getInitialState(){
    return { count: 0 }
  }, 
  
  componentDidMount(){
    const timerId = setInterval(() =>{
      this.setState({
        count:(this.state.count+1) % 10,
        timerId
      })
    }, 1000)
  },
  
  componentWillUnmount(){
    clearInterval(this.state.timerId)
  }
})

ReactDOM.render(
  <Counter />,
  document.getElementById('app')
)


////http://jsbin.com/tasiwa/edit?html,js,output