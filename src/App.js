import './App.css';
import React, {Component} from "react";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";

class App extends Component {
    constructor(props) {
        super(props);
        this.maxId = 3;
        this.state = {
            mode:'create',
            selected_content_id:2,
            subject:{title:'WEB', sub:'World Wide Web!'},
            welcome:{title:'Welcome', desc:'Hello, React!!'},
            contents:[
                {id:1, title:'HTML', desc:'HTML is for information'},
                {id:2, title:'CSS', desc:'CSS is for design'},
                {id:3, title:'JavaScript', desc:'JavaScript is for interactive'},
            ],
        }
    }
    render() {
        console.log('App render');
        var _title, _desc, _article = null;
        if(this.state.mode === 'welcome') {
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc}></ReadContent>
        } else if(this.state.mode === 'read'){
            var i = 0;
            while(i < this.state.contents.length){
                var data = this.state.contents[i];
                if(data.id === this.state.selected_content_id){
                    _title = data.title;
                    _desc = data.desc;
                    break;
                }
                i++;
            }
            _article = <ReadContent title={_title} desc={_desc}></ReadContent>
        } else if (this.state.mode === 'create'){
            _article = <CreateContent onSubmit = {function(_title, _desc) {
                this.setState(state => {
                    this.maxId++;
                    state.contents = state.contents.concat({id: this.maxId, title: _title, desc: _desc});
                    state.mode = 'read';
                    state.selected_content_id = this.maxId;
                    return state;
                });
            }.bind(this)}>

            </CreateContent>
        }
        return (
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    onChangePage={function(){
                        this.setState({mode:'welcome'});
                    }.bind(this)}
                >
                </Subject>
                <TOC onChangePage= {function(id){
                    this.setState({
                        mode:'read',
                        selected_content_id:id
                    })
                }.bind(this)}
                     data={this.state.contents}>
                </TOC>
                <Control onChangeMode={function(_mode) {
                        this.setState({mode:_mode});
                    }.bind(this)}>
                </Control>
                {_article}
            </div>
        );
    }
}

export default App;
