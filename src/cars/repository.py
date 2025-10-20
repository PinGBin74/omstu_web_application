from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.exception import NotFoundCarError
from src.models import Cars


async def get_cars(session: AsyncSession) -> list[Cars]:
    result = await session.execute(select(Cars))
    return result.scalars().all()


async def get_car_by_id(session: AsyncSession, car_id: int) -> Cars:
    result = await session.execute(select(Cars).where(Cars.id == car_id))
    car = result.scalar_one_or_none()
    if not car:
        raise NotFoundCarError(f"Car with id {car_id} not found")
    return car


async def create_car(session: AsyncSession, car: Cars) -> Cars:
    session.add(car)
    await session.commit()
    await session.refresh(car)
    return car


async def update_car(
    session: AsyncSession, db_car: Cars, updates: dict
) -> Cars:
    for field, value in updates.items():
        setattr(db_car, field, value)
    await session.commit()
    await session.refresh(db_car)
    return db_car


async def delete_car(session: AsyncSession, db_car: Cars) -> None:
    await session.delete(db_car)
    await session.commit()
