import React, { useState } from 'react';
import { fetchReceiptFile } from '../services/api';

const ReceiptDownload = () => {
    const [receiptId, setReceiptId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleDownload = async () => {
        setErrorMessage(''); // Limpiar cualquier error previo
        try {
            const fileUrl = await fetchReceiptFile(receiptId); // Obtener el enlace del archivo PDF

            // Crear un enlace temporal para redirigir al archivo PDF en S3
            const link = document.createElement('a');
            link.href = fileUrl;
            link.target = '_blank'; // Abre en una nueva pestaña
            link.rel = 'noopener noreferrer'; // Seguridad adicional
            link.click();
        } catch (error) {
            console.error('Error al obtener el enlace del archivo:', error);
            setErrorMessage('No se pudo obtener el archivo. Verifica el ID del recibo.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Descargar Recibo</h2>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="receiptId">ID del Recibo:</label>
                <input
                    type="text"
                    id="receiptId"
                    value={receiptId}
                    onChange={(e) => setReceiptId(e.target.value)}
                    placeholder="Ingresa el ID del recibo"
                    style={{ marginLeft: '10px', padding: '5px' }}
                />
            </div>
            <button onClick={handleDownload} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Descargar PDF
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default ReceiptDownload;
 