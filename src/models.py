from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.infrastructure.database.models import Base


class Dealer(Base):
    __tablename__ = "dealers"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    city: Mapped[str]
    address: Mapped[str]
    area: Mapped[str]
    rating: Mapped[float]

    cars: Mapped[list["Cars"]] = relationship(back_populates="dealer")


class Cars(Base):
    __tablename__ = "cars"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    firm: Mapped[str]
    model: Mapped[str]
    year: Mapped[int]
    power: Mapped[int]
    color: Mapped[str]
    price: Mapped[int]

    dealer_id: Mapped[int] = mapped_column(ForeignKey("dealers.id"))
    dealer: Mapped["Dealer"] = relationship(back_populates="cars")
