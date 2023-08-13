import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Table } from 'antd';
import { IoTrash, IoPencilSharp } from "react-icons/io5";

import style from './Table.module.css'
import { IconContext } from 'react-icons';

const handlDelete = () => {
    alert("Delete");
};


const columns = [
    {
        title: 'Nome do representante',
        dataIndex: 'name',
        width: 150,
        align: 'center',
    },
    {
        title: 'Equipe',
        dataIndex: 'equip',
        width: 150,
        align: 'center',
    },
    {
        title: 'Orgão',
        dataIndex: 'organ',
        width: 150,
        align: 'center',
    },
    {
        title: 'Conselho',
        dataIndex: 'council',
        width: 150,
        align: 'center',
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        width: 150,
        align: 'center',
    },
    {
        title: 'Operações',
        dataIndex: 'operation',
        width: 60,
        align: 'center',
        render: () => (
            <div className={style.operation}>
                <IconContext.Provider value={{ color: "#93000A", size: 20 }}>
                    <button onClick={handlDelete}>
                        <IoTrash />
                    </button>
                </IconContext.Provider>

                <IconContext.Provider value={{ color: "#2C74AC", size: 20 }}>
                    <NavLink to='/editUser'>
                        <IoPencilSharp />
                    </NavLink>
                </IconContext.Provider>
            </div>
        ),
    },
];


const DrawerTable = ({ data }) => (
    <Fragment>
        {data.map(item => (
            <div key={item.key} className={style.drawerTable} >
                <p><h3>Sigla:</h3> {item.sigla}</p>
                <p><h3>Unidade:</h3> {item.unidade}</p>
                <p><h3>Ofício que solicitou:</h3> {item.requestedOffice}</p>
                <p><h3>Ofício que indicou:</h3> {item.designatedOffice}</p>
                <p><h3>Portaria interna:</h3> {item.internalConcierge}</p>
                <p><h3>Observações:</h3> {item.comments}</p>
            </div>
        ))}
    </Fragment>
);


const App = () => {

    const expandedRowRender = (data) => {
        return <DrawerTable data={data.description} />;
    };

    const data = [];

    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            equip: `Teste`,
            organ: 'Teste',
            council: 'Teste',
            email: `teste@teste.com`,
            description: [{
                key: i,
                sigla: 'SIGLA',
                unidade: '000000',
                requestedOffice: 'xxxxxx',
                designatedOffice: 'xxxxxx',
                internalConcierge: 'xxxxx',
                comments: 'xxxxxx'
            }]
        });
    }

    return (
        <Table
            className={style.table}
            columns={columns}
            dataSource={data}
            responsive
            pagination={{
                defaultPageSize: 10,
            }}
            expandable={{
                expandedRowRender,
                rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
        />
    );
};

export default App;