import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex. M', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3}
            ],
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id),
            }
        })
    }

    addItem = (name, salary) => {
        const obj = {
            name: name,
            salary: salary,
            increase: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            return {
                data: data.concat(obj),
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    render () {
        const amountEmployees = this.state.data.length;
        const amountIncreasedEmployees = this.state.data.filter(item => item.increase).length;

        return (
            <div className="app">
                <AppInfo amountEmployees={amountEmployees} amountIncreasedEmployees={amountIncreasedEmployees}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployeesList data={this.state.data} 
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>

                <EmployeesAddForm data={this.state.data} 
                onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;