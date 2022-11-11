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
            filterRise: false,
            filterSalary: false
            // mod: ''
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
            mod: 'Search'
        });
    }

    //App-filter
    filterRise = (items) => {
        return items.filter(item => {
            return item.rise
        })
    }

    filterSalary = (items) => {
        return items.filter(item => {
            return item.salary > 1000
        })
    }

    onToggleFilterRise = () => {
        if (this.state.filterRise) {return}
        this.setState({
            filterRise: !this.state.filterRise,
            filterSalary: false,
            mod: 'Rise'
        })
    }

    onToggleFilterSalary = () => {
        if (this.state.filterSalary) {return}
        this.setState({
            filterSalary: !this.state.filterSalary,
            filterRise: false,
            mod: 'Salary'
        })
    }

    onOffFilters = () => {
        this.setState({
            filterSalary: false,
            filterRise: false,
            mod: 'Off-filter'
        })
    }

    render () {
        const {data, term} = this.state;
        const amountEmployees = this.state.data.length;
        const amountIncreasedEmployees = this.state.data.filter(item => item.increase).length;
        // const visibleData = this.state.term ? this.searchEmp(data, term) : 
        //                                         this.state.filterRise ? this.filterRise(data) : 
        //                                             this.state.filterSalary ? this.filterSalary(data) : this.state.data;

        const visibleData = (this.state.term && this.searchEmp(data, term)) ||
                            (this.state.filterRise && this.filterRise(data)) ||
                            (this.state.filterSalary && this.filterSalary(data)) ||
                            this.state.data;

        return (
            <div className="app">
                <AppInfo amountEmployees={amountEmployees} amountIncreasedEmployees={amountIncreasedEmployees}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter 
                        onToggleFilterRise={this.onToggleFilterRise} 
                        onToggleFilterSalary={this.onToggleFilterSalary} 
                        onOffFilters={this.onOffFilters}
                        buttonRiseActive={this.state.filterRise} 
                        buttonSalaryActive={this.state.filterSalary}/>
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



// const updatedData = () => {
//     if (mod === '') {
//         return this.state.data
//     }
//     if (mod === 'Search') {
//         return this.searchEmp
//     }
//     if(mod === 'Rise') {
//         return this.filterRise
//     }
//     if(mod === 'Salary') {
//         return this.filterSalary
//     }
//     if(mod === 'Off-filter') {
//         return this.state.data
//     }
// }