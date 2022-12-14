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
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    //Add-form
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

    //List
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

    //Search-panel
    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({
            term,
        });
    }

    //App-filter
    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise': 
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            case 'rise & moreThen1000':
                return items.filter(item => item.rise).filter(item => item.salary > 1000)
            default: 
                return items
        }
    }

    onFilterSelect = (filter) => {
        if ((this.state.filter === 'rise' || this.state.filter === 'moreThen1000') && filter !== 'all' && this.state.filter !== filter) {
            this.setState({
                filter: 'rise & moreThen1000'
            })
            return;
        } if (this.state.filter === filter) {
            this.setState({
                filter: 'all'
            })
            return
        } if (this.state.filter === 'rise & moreThen1000' && filter === 'rise') {
            this.setState({
                filter: 'moreThen1000'
            })
            return
        } if (this.state.filter === 'rise & moreThen1000' && filter === 'moreThen1000') {
            this.setState({
                filter: 'rise'
            })
            return
        }
        else {
            this.setState({filter});
        }
    }

    render () {
        const {data, term, filter} = this.state;
        const amountEmployees = this.state.data.length;
        const amountIncreasedEmployees = this.state.data.filter(item => item.increase).length;

        const visibleData = this.filterPost(this.searchEmp(data, term), filter)

        return (
            <div className="app">
                <AppInfo amountEmployees={amountEmployees} amountIncreasedEmployees={amountIncreasedEmployees}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleData} 
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>

                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;