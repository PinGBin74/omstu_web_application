from pydantic import BaseModel


class CarBase(BaseModel):
    firm: str
    model: str
    year: int
    power: int
    color: str
    price: int
    dealer_id: int


class CarCreate(CarBase):
    pass


class CarUpdate(BaseModel):
    firm: str | None = None
    model: str | None = None
    year: int | None = None
    power: int | None = None
    color: str | None = None
    price: int | None = None
    dealer_id: int | None = None


class Car(CarBase):
    id: int

    class Config:
        from_attributes = True
