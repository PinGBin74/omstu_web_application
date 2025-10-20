from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.dealer.schema import Dealer, DealerCreate, DealerUpdate
from src.dealer.service import (
    create_dealer_service,
    delete_dealer_service,
    get_dealer_by_id_service,
    get_dealers_service,
    update_dealer_service,
)
from src.exception import NotFoundDealerError
from src.infrastructure.database.database import get_db_session

router = APIRouter(prefix="/dealer", tags=["dealer"])


@router.get("/", response_model=list[Dealer])
async def get_dealers(session: AsyncSession = Depends(get_db_session)):
    return await get_dealers_service(session)


@router.get("/{dealer_id}", response_model=Dealer)
async def get_dealer_by_id(
    dealer_id: int, session: AsyncSession = Depends(get_db_session)
):
    try:

        return await get_dealer_by_id_service(session, dealer_id)
    except NotFoundDealerError as e:
        raise HTTPException(status_code=404, detail=str(e)) from e


@router.post("/", response_model=Dealer)
async def create_dealer(
    dealer: DealerCreate, session: AsyncSession = Depends(get_db_session)
):
    return await create_dealer_service(session, dealer)


@router.put("/{dealer_id}", response_model=Dealer)
async def update_dealer(
    dealer_id: int,
    dealer: DealerUpdate,
    session: AsyncSession = Depends(get_db_session),
):
    return await update_dealer_service(session, dealer_id, dealer)


@router.delete("/{dealer_id}")
async def delete_dealer(
    dealer_id: int, session: AsyncSession = Depends(get_db_session)
):
    await delete_dealer_service(session, dealer_id)
    return {"status": "deleted"}
