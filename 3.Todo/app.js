//http://jsbin.com/hakato/edit?js,output

const Row =  React.createClass({
  render(){
    const {el} = this.props
    
    return (
      <li>
        <button onClick={this.doDelete}>x</button>&nbsp;
        {el}[editar]
      </li>
    )
  },
  
  doDelete(){
    const {doDelete, el} =this.props
    doDelete(el)
  }
  
})

const List = React.createClass({
  render(){
    const {values, doDelete} = this.props
    const elems = values.map((el)=> (<Row el={el} doDelete={doDelete}/>))
    
    return (
      <ul>
        {elems}
      </ul>
    )
  },
                                        
  getDefaultProps(){
    return { values: [] }
  }
})
    
const Form = React.createClass({
  render(){
    return (
      <div>
        Nueva Tarea:
        <input ref="txtTodo" type="text"/>
        <button onClick={this.add}>Agregar</button>
      </div>
    )
  },
  
  add(){
    const txt = ReactDOM.findDOMNode(this.refs.txtTodo)    
    this.props.add(txt.value)
    txt.value = ""
  }
})    
    
const Todo = React.createClass({
  render(){
    const {todos} = this.state
    return (
      <div>
        <h2>My Todos</h2>
        <Form add={this.addTodo}/>
        <div> count: {todos.length} </div>
        <List values={todos} doDelete={this.doDelete}/>
      </div>
    )
  },
  
  getInitialState(){
    return { todos: [] }
  },
  
  addTodo(todo){
    const {todos} = this.state 
    //const todos = this.state.todos
    //const {x,y,z} = this.state.point3d
    todos.push(todo)
    this.setState({ todos })
  },
  
  doDelete(el){
    const todos = this.state.todos.filter((td) => td != el)
    
    this.setState({ todos })
  }
})    

ReactDOM.render(
  <Todo/>,
  document.getElementById("myapp")
)