import React from 'react';
import CarCard from './CarCard';
import '../styles/CarList.css';

const CarList = ({ cars, onDelete, onUpdate }) => {
    if (cars.length === 0) {
        return (
            <div className="no-cars">
                <p>Автомобили не найдены</p>
            </div>
        );
    }

    return (
        <div className="cars-grid">
            {cars.map(car => (
                <CarCard
                    key={car.id}
                    car={car}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
};

export default CarList;