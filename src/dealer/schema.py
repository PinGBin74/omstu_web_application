from pydantic import BaseModel


class DealerBase(BaseModel):
    name: str
    city: str
    address: str
    area: str
    rating: float


class DealerCreate(DealerBase):
    pass


class DealerUpdate(BaseModel):
    name: str | None = None
    city: str | None = None
    address: str | None = None
    area: str | None = None
    rating: float | None = None


class Dealer(DealerBase):
    id: int

    class Config:
        from_attributes = True
