import './app-filter.css';


const AppFilter = ({onToggleFilterRise, onToggleFilterSalary, onOffFilters, buttonRiseActive, buttonSalaryActive}) => {
    let buttonDisable = 'btn btn-outline-light';
    let buttonActive = 'btn btn-light';

    let buttonOffFilter = buttonActive;
    let buttonRiseFilter = buttonDisable;
    let buttonSalaryFilter = buttonDisable;

    if (buttonRiseActive) {
        buttonOffFilter = buttonDisable;
        buttonRiseFilter = buttonActive;
        buttonSalaryFilter = buttonDisable;
    }

    if(buttonSalaryActive) {
        buttonOffFilter = buttonDisable;
        buttonRiseFilter = buttonDisable;
        buttonSalaryFilter = buttonActive;
    }

    return (
        <div className="btn-group">
            <button 
                className={buttonOffFilter}
                type="button"
                onClick={onOffFilters}>
                    Все сотрудники
            </button>
            <button 
                className={buttonRiseFilter}
                type="button"
                onClick={onToggleFilterRise}>
                    На повышение
            </button>
            <button 
                className={buttonSalaryFilter}
                type="button"
                onClick={onToggleFilterSalary}>
                    З/П больше 1000$
            </button>
        </div>
    )
}

export default AppFilter;