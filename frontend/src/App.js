import React, { useState, useEffect } from 'react';
import CarList from './components/CarList';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import AddCarModal from './components/AddCarModal';
import { getCars, getCarById, createCar, updateCar, deleteCar, checkHealth } from './services/api';
import './styles/App.css';

function App() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('Проверка соединения...');

    useEffect(() => {
        const checkConnection = async () => {
            try {
                await checkHealth();
                setConnectionStatus('✓ Соединение с backend установлено');
                fetchAllCars();
            } catch (err) {
                setConnectionStatus('✗ Ошибка соединения с backend');
                setError('Не удалось подключиться к серверу. Убедитесь, что backend запущен на порту 8000.');
                console.error('Connection error:', err);
                setLoading(false);
            }
        };

        checkConnection();
    }, []);

    const fetchAllCars = async () => {
        try {
            setLoading(true);
            console.log('Starting to fetch cars...');
            const data = await getCars();
            console.log('Received cars data:', data);
            setCars(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching cars:', err);
            setError(`Ошибка при загрузке автомобилей: ${err.message}`);

            if (err.message.includes('Failed to fetch') || err.message.includes('Network')) {
                setCars([
                    {
                        id: 1,
                        firm: "Honda",
                        model: "Pilot",
                        year: 2016,
                        power: 130,
                        color: "Black",
                        price: 51000,
                        dealer_id: 1
                    },
                    {
                        id: 2,
                        firm: "BMW",
                        model: "X5",
                        year: 2002,
                        power: 170,
                        color: "Green",
                        price: 73000,
                        dealer_id: 2
                    }
                ]);
                setError('Используются тестовые данные. Backend недоступен.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (id) => {
        if (!id) {
            fetchAllCars();
            return;
        }

        try {
            setLoading(true);
            const car = await getCarById(id);
            setCars([car]);
            setError(null);
        } catch (err) {
            console.error('Search error:', err);
            setError(`Автомобиль с ID ${id} не найден`);
            setCars([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
            return;
        }

        try {
            await deleteCar(id);
            setCars(cars.filter(car => car.id !== id));
            setError(null);
            console.log(`Car ${id} deleted successfully`);
        } catch (err) {
            console.error('Delete error:', err);
            setError('Ошибка при удалении автомобиля');
        }
    };

    const handleUpdate = async (id, updatedCar) => {
        try {
            console.log('Updating car with data:', updatedCar);
            const updated = await updateCar(id, updatedCar);
            console.log('Update response:', updated);
            setCars(cars.map(car => car.id === id ? updated : car));
            setError(null);
            return updated;
        } catch (err) {
            console.error('Update error:', err);
            setError('Ошибка при обновлении автомобиля');
            throw err;
        }
    };

    const handleAddCar = async (newCar) => {
        try {
            console.log('Adding new car:', newCar);
            const created = await createCar(newCar);
            console.log('Created car:', created);
            setCars([...cars, created]);
            setShowAddModal(false);
            setError(null);
        } catch (err) {
            console.error('Add car error:', err);
            setError('Ошибка при добавлении автомобиля. Проверьте данные.');
            throw err;
        }
    };

    return (
        <div className="app">
            <Header />
            <main className="container">
                <div className="connection-status">
                    {connectionStatus}
                </div>

                <div className="controls">
                    <SearchBar onSearch={handleSearch} />
                    <button
                        className="btn-add"
                        onClick={() => setShowAddModal(true)}
                    >
                        + Добавить автомобиль
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                        <strong>Ошибка:</strong> {error}
                    </div>
                )}

                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        Загрузка автомобилей...
                    </div>
                ) : (
                    <>
                        <div className="cars-info">
                            Найдено автомобилей: {cars.length}
                        </div>
                        <CarList
                            cars={cars}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    </>
                )}

                {showAddModal && (
                    <AddCarModal
                        onSave={handleAddCar}
                        onClose={() => setShowAddModal(false)}
                    />
                )}
            </main>
        </div>
    );
}

export default App;