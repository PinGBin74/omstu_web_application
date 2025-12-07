import React, { useState } from 'react';
import EditCarModal from './EditCarModal';
import '../styles/CarCard.css';

const CarCard = ({ car, onDelete, onUpdate }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const getCarImageUrl = () => {
        const searchQuery = `${car.firm}+${car.model}+car`;
        return `https://source.unsplash.com/featured/?${encodeURIComponent(searchQuery)}`;
    };

    const handleEdit = async (updatedCar) => {
        try {
            await onUpdate(car.id, updatedCar);
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating car:', error);
        }
    };

    return (
        <>
            <div className="car-card">
                <div className="car-image">
                    <img
                        src={getCarImageUrl()}
                        alt={`${car.firm} ${car.model}`}
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&h=200&fit=crop';
                        }}
                    />
                    <div className="car-year">{car.year}</div>
                </div>

                <div className="car-content">
                    <div className="car-header">
                        <h3 className="car-title">{car.firm} {car.model}</h3>
                        <span className="car-id">ID: {car.id}</span>
                    </div>

                    <div className="car-specs">
                        <div className="spec-item">
                            <span className="spec-label">Мощность:</span>
                            <span className="spec-value">{car.power} HP</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Цвет:</span>
                            <div className="color-display">
                                <div
                                    className="color-circle"
                                    style={{ backgroundColor: car.color.toLowerCase() }}
                                />
                                <span className="color-text">{car.color}</span>
                            </div>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Цена:</span>
                            <span className="spec-value price">${car.price.toLocaleString()}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Дилер ID:</span>
                            <span className="spec-value">{car.dealer_id}</span>
                        </div>
                    </div>

                    <div className="car-actions">
                        <button
                            className="btn btn-edit"
                            onClick={() => setShowEditModal(true)}
                            title="Редактировать"
                        >
                            ✏️ Редактировать
                        </button>
                        <button
                            className="btn btn-delete"
                            onClick={() => onDelete(car.id)}
                            title="Удалить"
                        >
                            🗑️ Удалить
                        </button>
                    </div>
                </div>
            </div>

            {showEditModal && (
                <EditCarModal
                    car={car}
                    onSave={handleEdit}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </>
    );
};

export default CarCard;