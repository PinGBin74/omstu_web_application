from sqlalchemy.ext.asyncio import AsyncSession

from src.dealer.repository import (
    create_dealer,
    delete_dealer,
    get_dealer_by_id,
    get_dealers,
    update_dealer,
)
from src.dealer.schema import DealerCreate, DealerUpdate
from src.models import Dealer


async def get_dealers_service(session: AsyncSession) -> list[Dealer]:
    return await get_dealers(session)


async def get_dealer_by_id_service(
    session: AsyncSession, dealer_id: int
) -> Dealer:
    return await get_dealer_by_id(session, dealer_id)


async def create_dealer_service(
    session: AsyncSession, dealer_data: DealerCreate
) -> Dealer:
    dealer = Dealer(**dealer_data.dict())
    return await create_dealer(session, dealer)


async def update_dealer_service(
    session: AsyncSession, dealer_id: int, dealer_data: DealerUpdate
) -> Dealer:
    db_dealer = await get_dealer_by_id(session, dealer_id)
    return await update_dealer(
        session, db_dealer, dealer_data.dict(exclude_unset=True)
    )


async def delete_dealer_service(session: AsyncSession, dealer_id: int) -> None:
    db_dealer = await get_dealer_by_id(session, dealer_id)
    await delete_dealer(session, db_dealer)
