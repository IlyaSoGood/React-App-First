import './app-info.css';


const AppInfo = ({amountEmployees, amountIncreasedEmployees}) => {

    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {amountEmployees}</h2>
            <h2>Премию получат: {amountIncreasedEmployees}</h2>
        </div>
    )
}

export default AppInfo;