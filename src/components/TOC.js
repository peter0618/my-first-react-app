import {Component} from "react";

class TOC extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(`shouldComponentUpdate`, nextProps.data, this.props.data);
        return nextProps.data !== this.props.data;
    }

    render() {
        console.log('TOC render()');
        let lists = [];
        let data = this.props.data
        let i = 0;
        while(i < data.length){
            lists.push(
                <li key={data[i].id}>
                    <a
                        href={"/content/"+ data[i].id}
                        data-id = {data[i].id}
                        onClick={function(e) {
                            // debugger;
                            e.preventDefault();
                            this.props.onChangePage(Number.parseInt(e.target.dataset.id));
                        }.bind(this)}>{data[i].title}</a></li>);
            i++;
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        )
    }
}

export default TOC;
