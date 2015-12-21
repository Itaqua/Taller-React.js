const NavigationItem = React.createClass({
    render() {
        return (
            <li onClick={this.onClick} className={this.props.selected ? "selected" : ""}>
                {this.props.item.data.display_name}
            </li>
        )
    },
    onClick() {
        this.props.itemSelected(this.props.item)
    }
})

const Navigation = React.createClass({
    render() {
        const items = this.props.items.map((item)=>{
            return (
                <NavigationItem key={item.data.id}
                    item={item} itemSelected={this.setSelectedItem}
                    selected={item.data.url === this.props.activeUrl} />
            )
        })

        return (
            <div className="navigation">
                <div className="header">Navigation</div>
                <ul>
                    {items}
                </ul>
            </div>
        )
    },
    setSelectedItem(item) {
        this.props.itemSelected(item)
    },
})

const StoryList = React.createClass({
    render() {
        const storyNodes = this.props.items.map((item)=>{
            return (
                <tr key={item.data.url}>
                    <td>
                        <p className="score">{item.data.score}</p>
                        <img src={item.data.url} style={{width:25, height:25}}/>
                    </td>
                    <td>
                        <p className="title">
                            <a href={item.data.url} target="_blank">
                                {item.data.title}
                            </a>
                        </p>
                        <p className="author">
                            Posted by <b>{item.data.author}</b>
                        </p>
                    </td>
                </tr>
            )
        })

        return (
            <table>
                <tbody>
                    {storyNodes}
                </tbody>
            </table>
        )
    }
})

const App = React.createClass({
    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <Navigation activeUrl={this.state.activeNavigationUrl}
                    items={this.state.navigationItems}
                    itemSelected={this.setSelectedItem} />
                <StoryList items={this.state.storyItems} />
            </div>
        )
    },
    componentDidMount() {
        const cbname = "fn" + Date.now()
        const script = document.createElement("script")
        script.src = "https://www.reddit.com/reddits.json?jsonp=" + cbname

        window[cbname] = (jsonData) => {
            this.setState({
                navigationItems: jsonData.data.children
            })
            delete window[cbname]
        }

        document.head.appendChild(script)
    },
    getInitialState() {
        return ({
            activeNavigationUrl: "",
            navigationItems: [],
            storyItems: [],
            title: "Please select a sub"
        })
    },
    
    setSelectedItem(item) {
        const cbname = "fn" + Date.now()
        const script = document.createElement("script")
        script.src = "https://www.reddit.com/" + item.data.url + ".json?sort=top&t=month&jsonp=" + cbname

        window[cbname] = (jsonData)=>{
            this.setState({storyItems: jsonData.data.children})
            delete window[cbname]
        }
        
        document.head.appendChild(script)

        this.setState({
            activeNavigationUrl: item.data.url,
            title: item.data.display_name
        })
    }
})


ReactDOM.render(
  <App />,
  document.getElementById('app')
)
