import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import { formatQuantity } from '../helpers';

const BudgetControl = ({ spends, setSpends, budget, setBudget, setIsValidBudget }) => {

    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)

    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        const totalSpent = spends.reduce((total, spend) => {
            return spend.quantity + total
        }, 0)

        const totalAvailable = budget - totalSpent

        const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2)

        setSpent(totalSpent)
        setAvailable(totalAvailable)
        setTimeout(() => {
            setPercentage(newPercentage)
        }, 1000)
    }, [spends])

    const handleResetApp = () => {
        const result = confirm('¿Desea reiniciar presupuesto y gastos?')

        if (result) {
            setSpends([])
            setBudget(0)
            setIsValidBudget(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={percentage}
                    text={`${percentage}% Gastado`}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Reset App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatQuantity(budget)}
                </p>
                <p className={`${available < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formatQuantity(available)}
                </p>
                <p>
                    <span>Gastado: </span> {formatQuantity(spent)}
                </p>
            </div>
        </div>
    );
};

export default BudgetControl;
