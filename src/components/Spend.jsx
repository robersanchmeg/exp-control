import React from 'react';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import { formatDate, formatQuantity } from '../helpers';
import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

const diccionaryIcons = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

const Spend = ({ spend, setEditSpend, deleteSpend }) => {
    const { category, name, quantity, id, date } = spend

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditSpend(spend)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => deleteSpend(id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>
                    <div className='contenido-gasto'>
                        <img
                            src={diccionaryIcons[category]}
                            alt="Icono Gasto"
                        />
                        <div className='descripcion-gasto'>
                            <p className='categoria'>{category}</p>
                            <p className='nombre-gasto'>{name}</p>
                            <p className='fecha-gasto'>
                                Agregado el: {' '}
                                <span>{formatDate(date)}</span>
                            </p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>{formatQuantity(quantity)}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};

export default Spend;
