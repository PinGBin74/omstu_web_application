import React from 'react';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <h1>🚗 Каталог автомобилей</h1>
                <p>Управление автомобилями через Web API</p>
            </div>
        </header>
    );
};

export default Header;