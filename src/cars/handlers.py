from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.cars.schema import Car, CarCreate, CarUpdate
from src.cars.service import (
    create_car_service,
    delete_car_service,
    get_car_by_id_service,
    get_cars_service,
    update_car_service,
)
from src.exception import NotFoundCarError
from src.infrastructure.database.database import get_db_session

router = APIRouter(prefix="/car", tags=["car"])


@router.get("/", response_model=list[Car])
async def get_cars(session: AsyncSession = Depends(get_db_session)):
    return await get_cars_service(session)


@router.get("/{car_id}", response_model=Car)
async def get_car_by_id(
    car_id: int, session: AsyncSession = Depends(get_db_session)
):
    try:

        return await get_car_by_id_service(session, car_id)
    except NotFoundCarError as e:
        raise HTTPException(status_code=404, detail=str(e)) from e


@router.post("/", response_model=Car)
async def create_car(
    car: CarCreate, session: AsyncSession = Depends(get_db_session)
):
    return await create_car_service(session, car)


@router.put("/{car_id}", response_model=Car)
async def update_car(
    car_id: int,
    car: CarUpdate,
    session: AsyncSession = Depends(get_db_session),
):
    return await update_car_service(session, car_id, car)


@router.delete("/{car_id}")
async def delete_car(
    car_id: int, session: AsyncSession = Depends(get_db_session)
):
    await delete_car_service(session, car_id)
    return {"status": "deleted"}
