from sqlalchemy.ext.asyncio import AsyncSession

from src.cars.repository import (
    create_car,
    delete_car,
    get_car_by_id,
    get_cars,
    update_car,
)
from src.cars.schema import CarCreate, CarUpdate
from src.decorators import publish_car_event_after
from src.exception import NotFoundCarError
from src.models import Cars


async def get_cars_service(session: AsyncSession) -> list[Cars]:
    return await get_cars(session)


async def get_car_by_id_service(session: AsyncSession, car_id: int) -> Cars:
    try:
        return await get_car_by_id(session, car_id)
    except NotFoundCarError as e:
        raise NotFoundCarError(f"Car with id {car_id} not found") from e


@publish_car_event_after("CREATE")
async def create_car_service(
    session: AsyncSession, car_data: CarCreate
) -> Cars:
    car = Cars(**car_data.dict())
    return await create_car(session, car)


@publish_car_event_after("UPDATE")
async def update_car_service(
    session: AsyncSession, car_id: int, car_data: CarUpdate
) -> Cars:
    db_car = await get_car_by_id(session, car_id)
    return await update_car(session, db_car, car_data.dict(exclude_unset=True))


@publish_car_event_after("DELETE")
async def delete_car_service(session: AsyncSession, car_id: int) -> Cars:
    db_car = await get_car_by_id(session, car_id)
    await delete_car(session, db_car)
    return db_car
