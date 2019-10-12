import React from 'react';
import Row from './Row';
import axios from 'axios';
import './App.css';


const timeOut = 10;

class Table extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            measurement: [
                {id: 1, unit_id: 1, temperature: -3, unix_timestamp: 132131231},
                {id: 2, unit_id: 2, temperature: -2, unix_timestamp: 1321989231},
                {id: 3, unit_id: 3, temperature: -1, unix_timestamp: 109080931231},
                {id: 4, unit_id: 4, temperature: -1, unix_timestamp: 109080931231},
                {id: 5, unit_id: 5, temperature: -1, unix_timestamp: 109080931231},
                {id: 6, unit_id: 6, temperature: 1, unix_timestamp: 109080931231},
            ],
            timer: timeOut,
            average: 0,
            headers : {
                id : 'ID',
                unit_id : 'Unit ID',
                temperature: 'TEMP',
                unix_timestamp: 'TS'
            }
        }
    }

    fetchData() {
        const url = 'https://blooming-woodland-66726.herokuapp.com/api/v1/measurement';
        axios.get(url).then(res => {

            this.setState({measurement: res.data.rows, average: res.data.average});
            this.forceUpdate();
            return res.data;
        }).catch(error => {
            throw new Error(error);
            console.dir(error);
        });
    }

    componentWillMount() {
        this.fetchData();
        setInterval(() => {
            let timer = this.state.timer;
            if (timer <= 0) {
                this.fetchData();
                timer = timeOut;
            }
            this.setState({timer: timer - 1});
        }, 1000, this)
    }

    handleHeaderClick(col) {
        const {measurement, headers} = this.state;
        const order = headers[col].includes('-') ? 1 : -1;

        const sorted = measurement.sort((a, b) => {
            if (a[col] > b[col]) return -1 * order;
            if (a[col] < b[col]) return 1 * order;
            if (a[col] === b[col]) return 0;
        });
        headers[col] = headers[col].includes('-') ? headers[col].replace('-', '') : '-' + headers[col];
        this.setState({measurement: sorted, headers});
    }

    render() {
        return (
            <div style={{marginTop: '30px'}}>
                <h2>Measurement</h2>
                <p> Refreshing after :
                    {
                        ' ' + this.state.timer + '  '
                    }
                    seconds
                </p>

                <h4>Average temperature (last 5) : {this.state.average} C </h4>
                <table className="table table-striped sortable">
                    <thead className="thead-dark">
                    <tr>
                        <th onClick={() => this.handleHeaderClick('unit_id')}>{this.state.headers.unit_id}</th>
                        <th onClick={() => this.handleHeaderClick('temperature')}>{this.state.headers.temperature}</th>
                        <th onClick={() => this.handleHeaderClick('unix_timestamp')}>{this.state.headers.unix_timestamp}</th>
                        <th>Edit</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.measurement.map(row =>
                            <Row key={row.id} row={row}/>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table;
