import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
    const navigate = useNavigate();

    // Limpiar cualquier token almacenado cuando se carga la página
    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        try {
            const data = await login(username, password);
            localStorage.setItem('token', data.token);
            navigate('/users');
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status === 401) {
                setErrorMessage('Credenciales incorrectas. Inténtalo de nuevo.');
            } else {
                setErrorMessage('Ocurrió un error. Por favor, intenta más tarde.');
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form className="bg-white p-4 rounded shadow-sm" onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3 position-relative">
                    <input
                        type={showPassword ? 'text' : 'password'} // Cambia entre texto y contraseña
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary position-absolute top-0 end-0 mt-1 me-2"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.9rem' }}
                    >
                        {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                    {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
