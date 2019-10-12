import React from 'react';
import axios from 'axios';


class Row extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }

    handleClick(row) {
        const url = 'https://blooming-woodland-66726.herokuapp.com/api/v1/measurement/';
        if(this.state.edit) { // true - you need to update
            // Send request to backend and make it update
            if(Number(row.temperature) < -3 || Number(row.temperature) > 3 ) {
                alert('Please enter temperature between - 3 and +3');
                return false;
            }
            this.setState({edit: false});

            axios.put(url + row.id, {temperature: row.temperature}).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            });

        } else {
            this.setState({edit: true});
        }
    }

    handleChange(e) {
        e.preventDefault();
        const {row} = this.state;
        row.temperature = e.target.value;
        this.setState({row});
    }

    componentWillMount() {
        const { row } = this.props;
        this.setState({ row});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { row } = nextProps;
        this.setState({ row});
    }

    render() {

        const { row } = this.state;
        let label = 'Edit';
        let className = 'btn btn-default btn-small';

        if(this.state.edit) {
            label = 'Update';
            className = 'btn btn-success btn-small';
        }



        return (
            <tr>
                <td>{row.unit_id}</td>
                <td>{this.state.edit === true ? <input onChange={(e) => this.handleChange(e)} value={row.temperature} style={{display: 'inline-block', maxWidth: '150px'}} className="form-control" type="text"/> : row.temperature}</td>
                <td>{row.unix_timestamp}</td>
                <td>
                    <button onClick={() => this.handleClick(row)} className={className}> {label} </button>
                </td>
            </tr>
        )
    }
}

export default Row;
