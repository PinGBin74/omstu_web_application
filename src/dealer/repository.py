from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.exception import NotFoundDealerError
from src.models import Dealer


async def get_dealers(session: AsyncSession) -> list[Dealer]:
    result = await session.execute(select(Dealer))
    return result.scalars().all()


async def get_dealer_by_id(session: AsyncSession, dealer_id: int) -> Dealer:
    result = await session.execute(
        select(Dealer).where(Dealer.id == dealer_id)
    )
    dealer = result.scalar_one_or_none()
    if not dealer:
        raise NotFoundDealerError(f"Dealer with id {dealer_id} not found")
    return dealer


async def create_dealer(session: AsyncSession, dealer: Dealer) -> Dealer:
    session.add(dealer)
    await session.commit()
    await session.refresh(dealer)
    return dealer


async def update_dealer(
    session: AsyncSession, db_dealer: Dealer, updates: dict
) -> Dealer:
    for field, value in updates.items():
        setattr(db_dealer, field, value)
    await session.commit()
    await session.refresh(db_dealer)
    return db_dealer


async def delete_dealer(session: AsyncSession, db_dealer: Dealer) -> None:
    await session.delete(db_dealer)
    await session.commit()
