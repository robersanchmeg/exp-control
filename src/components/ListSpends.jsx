import React from 'react';
import Spend from './Spend';

const ListSpends = ({
    spends,
    setEditSpend,
    deleteSpend,
    filter,
    spendsFilter
}) => {
    return (
        <div className='listado-gastos contenedor'>

            {
                filter ? (
                    <>
                        <h2>{spendsFilter.length ? 'Gastos' : 'No hay Gastos en esta categoría'}</h2>
                        {spendsFilter.map(spend => (
                            <Spend
                                key={spend.id}
                                spend={spend}
                                setEditSpend={setEditSpend}
                                deleteSpend={deleteSpend}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h2>{spends.length ? 'Gastos' : 'No hay Gastos aún'}</h2>
                        {spends.map(spend => (
                            <Spend
                                key={spend.id}
                                spend={spend}
                                setEditSpend={setEditSpend}
                                deleteSpend={deleteSpend}
                            />
                        ))}
                    </>
                )
            }

        </div>
    );
};

export default ListSpends;
