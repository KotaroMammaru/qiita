import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import './index.css'


function Popup (props) {
    return (
        <div className="popup">
            <h1>{props.text}</h1>
            <button onClick={props.closePopup}>close</button>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postsList: [],
            pops: Array(3).fill(false)
        };
    }
    renderImageList(list) {
        this.renderaxios();
        const posts = list.map((item, index) => {
            return (
                <li className="item" key={index}>
                    <a href={item.url}>{item.title}</a>
                    {this.state.pops[index] ?
                        null
                        :<button onClick={this.togglePopup(index)}>show popup</button>
                    }
                    {this.state.pops[index] ?
                        <Popup text={item.body} closePopup={this.togglePopup(index)} />
                        :null
                    }
                </li>
            )
        });
        return posts
    }
    togglePopup(i) {
        const pops = this.state.pops.slice()
        pops[i] = ! pops[i]
        this.setState({
            pops: pops
        })
    }
    
    renderaxios(){
        const url = 'https://qiita.com/api/v2/items?page=1&per_page=3';
       axios
        .get(url, {
            headers: {
                Authorization: "Bearer b73157fc33f765e8d39ac7f44c263651f22b3e00"
            }
        }).then((res) => {
            this.setState({postsList: res.data})
        } ).catch(console.error);
    }
    
    render() {
        const url = 'https://qiita.com/api/v2/items?page=1&per_page=3';
       axios
        .get(url, {
            headers: {
                Authorization: "Bearer b73157fc33f765e8d39ac7f44c263651f22b3e00"
            }
        }).then((res) => {
            this.setState({postsList: res.data})
        } ).catch(console.error);
        return (
            <div className="whole">
                <header>
                Qiita
                </header>
                <div className="link">
                    <ul>{this.renderImageList(this.state.postsList)}</ul>
                </div>
            </div>
            
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
);