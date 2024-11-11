import React, { useEffect, useState } from 'react';
import { Table, Input, Modal, Button } from 'antd';
import { fetchReceipts, fetchReceiptFile } from '../services/api';

const ReceiptList = () => {
    const [receipts, setReceipts] = useState([]);
    const [year, setYear] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    useEffect(() => {
        const loadReceipts = async () => {
            try {
                const filters = year ? { year } : {};
                const data = await fetchReceipts(filters);
                setReceipts(data.results || []); // Asegurarse de que 'data.results' sea un arreglo
            } catch (error) {
                console.error('Error al cargar recibos:', error);
            }
        };

        loadReceipts();
    }, [year]);

    const showModal = (receipt) => {
        setSelectedReceipt(receipt);
        setIsModalVisible(true);
    };

    const handleDownload = async () => {
        if (selectedReceipt) {
            try {
                const fileUrl = await fetchReceiptFile(selectedReceipt.id);
                const link = document.createElement('a');
                link.href = fileUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.click();
            } catch (error) {
                console.error("Error al descargar el recibo:", error);
            }
        }
    };

    const columns = [
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            render: (text) => text || 'Sin datos',
        },
        {
            title: 'Empleado',
            dataIndex: 'employeeFullName',
            key: 'employeeFullName',
            render: (text) => text || 'Sin datos',
        },
        {
            title: 'Fecha',
            dataIndex: 'fullDate',
            key: 'fullDate',
            render: (text) => text || 'Sin datos',
        },
        {
            title: 'Enviado',
            dataIndex: 'isSended',
            key: 'isSended',
            render: (isSended) => (isSended ? 'Sí' : 'No'),
        },
        {
            title: 'Firmado',
            dataIndex: 'isSigned',
            key: 'isSigned',
            render: (isSigned) => (isSigned ? 'Sí' : 'No'),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Lista de recibos</h1>
            <Input
                type="number"
                placeholder="Filtrar por año"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={{ marginBottom: '20px', width: '200px' }}
            />
            <Table
                dataSource={receipts}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                locale={{ emptyText: 'No hay datos disponibles' }}
                onRow={(record) => ({
                    onClick: () => showModal(record),
                })}
            />

            <Modal
                title="Vista previa del recibo"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        Cerrar
                    </Button>,
                    <Button key="download" type="primary" onClick={handleDownload}>
                        Descargar PDF
                    </Button>,
                ]}
            >
                {selectedReceipt ? (
                    <div>
                        <p><strong>Tipo:</strong> {selectedReceipt.type || 'Sin datos'}</p>
                        <p><strong>Empleado:</strong> {selectedReceipt.employeeFullName || 'Sin datos'}</p>
                        <p><strong>Fecha:</strong> {selectedReceipt.fullDate || 'Sin datos'}</p>
                        <p><strong>Enviado:</strong> {selectedReceipt.isSended ? "Sí" : "No"}</p>
                        <p><strong>Firmado:</strong> {selectedReceipt.isSigned ? "Sí" : "No"}</p>
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
            </Modal>
        </div>
    );
};

export default ReceiptList;
