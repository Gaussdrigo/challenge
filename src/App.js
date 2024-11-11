import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, FileOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import UserList from './pages/UserList';
import ReceiptList from './pages/ReceiptList';
import logo from './assets/logo.png';
import 'antd/dist/reset.css';

const { Header, Content, Sider } = Layout;

const App = () => {
    const menuItems = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: <Link to="/users">Empleados</Link>,
        },
        {
            key: '2',
            icon: <FileOutlined />,
            label: <Link to="/receipts">Recibos</Link>,
        },
        {
            key: '3',
            icon: <MessageOutlined />,
            label: 'Comunicados',
        },
        {
            key: '4',
            icon: <SettingOutlined />,
            label: 'Configuración',
        },
    ];

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible>
                    <div className="logo" style={{ padding: 16 }}>
                        <img src={logo} alt="dTalent Logo" style={{ width: '100%', maxWidth: '120px' }} />
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0, background: '#001529', color: 'white', textAlign: 'center' }}>
                        <h2 style={{ color: 'white' }}>Sistema de Gestión de Empleados</h2>
                    </Header>
                    <Content style={{ margin: '16px' }}>
                        <Routes>
                            {/* Redirige la ruta raíz ("/") a "/users" */}
                            <Route path="/" element={<Navigate to="/users" />} />
                            <Route path="/users" element={<UserList />} />
                            <Route path="/receipts" element={<ReceiptList />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};

export default App;
