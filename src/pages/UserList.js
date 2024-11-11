import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { fetchUsers } from '../services/api';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data.results); // Asegúrate de que 'data.results' contenga la lista de usuarios
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
            }
        };

        loadUsers();
    }, []);

    const columns = [
        {
            title: 'Número',
            dataIndex: 'employeeNumber',
            key: 'employeeNumber',
        },
        {
            title: 'Nombre',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Correo electrónico',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Teléfono',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Lista de empleados</h1>
            <Table dataSource={users} columns={columns} rowKey="id" />
        </div>
    );
};
export default UserList;
