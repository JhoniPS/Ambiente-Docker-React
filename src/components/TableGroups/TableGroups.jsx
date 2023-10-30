import React from 'react';
import { NavLink } from 'react-router-dom';
import { Table } from 'antd';
import { IoTrash, IoPencilSharp } from "react-icons/io5";

import style from './TableGroups.module.css'
import { IconContext } from 'react-icons';

const handlDelete = () => {
    alert("Delete");
};


const columns = [
    {
        title: 'Nome do representante',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: 'Equipe',
        dataIndex: 'equip',
        width: '20%',
    },
    {
        title: 'Orgão',
        dataIndex: 'organ',
        width: '20%',
    },
    {
        title: 'Conselho',
        dataIndex: 'council',
        width: '20%',
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        width: '20%',
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
                    <NavLink to='/editGroup'>
                        <IoPencilSharp />
                    </NavLink>
                </IconContext.Provider>
            </div>
        ),
    },
];

const TableGroups = () => {

    const data = [];

    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            equip: `Teste`,
            organ: 'Teste',
            council: 'Teste',
            email: `teste@teste.com`,
        });
    }

    const handleRowClick = (record) => {
        alert(record.key);
    };

    return (
        <Table
            bordered
            className={style.table}
            rowKey={(record) => record.key}
            columns={columns}
            dataSource={data}
            responsive
            pagination={{
                defaultPageSize: 10,
            }}
            onRow={(record) => {
                return {
                    onClick: () => handleRowClick(record),
                };
            }}
        />
    );
};

export default TableGroups;