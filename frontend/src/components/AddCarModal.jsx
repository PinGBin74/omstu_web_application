import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';
import { getDealers } from '../services/api'; // Добавьте эту функцию

const AddCarModal = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({
        firm: '',
        model: '',
        year: new Date().getFullYear(),
        power: 100,
        color: 'Black',
        price: 0,
        dealer_id: 1, // Используем существующий dealer_id
    });
    const [dealers, setDealers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingDealers, setLoadingDealers] = useState(true);

    useEffect(() => {
        // Загружаем дилеров при монтировании компонента
        const loadDealers = async () => {
            try {
                // Здесь должна быть функция getDealers в вашем API
                // Для начала используем фиксированные значения
                setDealers([
                    { id: 1, name: "АвтоМир" },
                    { id: 2, name: "СпортКар" },
                    { id: 3, name: "АвтоТех" }
                ]);
            } catch (error) {
                console.error('Error loading dealers:', error);
            } finally {
                setLoadingDealers(false);
            }
        };

        loadDealers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'year' || name === 'power' || name === 'price' || name === 'dealer_id'
                ? parseInt(value) || 0
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валидация
        if (!formData.firm.trim() || !formData.model.trim()) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        if (formData.year < 1900 || formData.year > new Date().getFullYear()) {
            alert('Пожалуйста, введите корректный год выпуска');
            return;
        }

        if (formData.power <= 0) {
            alert('Мощность должна быть положительным числом');
            return;
        }

        if (formData.price <= 0) {
            alert('Цена должна быть положительным числом');
            return;
        }

        if (!formData.dealer_id || formData.dealer_id <= 0) {
            alert('Пожалуйста, выберите дилерский центр');
            return;
        }

        setLoading(true);
        try {
            await onSave(formData);
        } catch (error) {
            // Ошибка обрабатывается в родительском компоненте
            console.error('Error in handleSubmit:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Добавить новый автомобиль</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Марка *</label>
                            <input
                                type="text"
                                name="firm"
                                value={formData.firm}
                                onChange={handleChange}
                                placeholder="Например: Honda"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Модель *</label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                placeholder="Например: Pilot"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Год выпуска *</label>
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                min="1900"
                                max={new Date().getFullYear()}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Мощность (HP) *</label>
                            <input
                                type="number"
                                name="power"
                                value={formData.power}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Цвет *</label>
                            <select
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                required
                            >
                                <option value="Black">Черный</option>
                                <option value="White">Белый</option>
                                <option value="Red">Красный</option>
                                <option value="Blue">Синий</option>
                                <option value="Green">Зеленый</option>
                                <option value="Silver">Серебристый</option>
                                <option value="Gray">Серый</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Цена ($) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Дилерский центр *</label>
                            {loadingDealers ? (
                                <select disabled>
                                    <option>Загрузка дилеров...</option>
                                </select>
                            ) : (
                                <select
                                    name="dealer_id"
                                    value={formData.dealer_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Выберите дилера</option>
                                    {dealers.map(dealer => (
                                        <option key={dealer.id} value={dealer.id}>
                                            {dealer.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="btn btn-cancel"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="btn btn-save"
                            disabled={loading}
                        >
                            {loading ? 'Добавление...' : 'Добавить автомобиль'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCarModal;