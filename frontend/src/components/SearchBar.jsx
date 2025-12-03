import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchId, setSearchId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchId);
    };

    const handleClear = () => {
        setSearchId('');
        onSearch('');
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-input-container">
                <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Поиск по ID автомобиля"
                    className="search-input"
                />
                {searchId && (
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={handleClear}
                    >
                        ×
                    </button>
                )}
            </div>
            <button type="submit" className="search-btn">
                🔍 Найти
            </button>
        </form>
    );
};

export default SearchBar;