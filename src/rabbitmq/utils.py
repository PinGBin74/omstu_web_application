import json
from typing import Any

import aio_pika
from aio_pika import DeliveryMode, ExchangeType, Message

from src.settings import Settings

settings = Settings()


async def publish_car_event(event_type: str, payload: dict[str, Any]) -> None:
    connection = await aio_pika.connect_robust(settings.rabbitmq_url)
    async with connection:
        channel = await connection.channel()
        exchange = await channel.declare_exchange(
            "cars_events_exchange",
            ExchangeType.DIRECT,
            durable=True,
        )
        queue = await channel.declare_queue(
            "cars_events_queue",
            durable=True,
        )
        await queue.bind(exchange, routing_key="cars.events")

        body = json.dumps(
            {"eventType": event_type, "car": payload},
            ensure_ascii=False,
        )
        message = Message(
            body.encode(),
            delivery_mode=DeliveryMode.PERSISTENT,
            content_type="application/json",
        )
        await exchange.publish(message, routing_key="cars.events")
