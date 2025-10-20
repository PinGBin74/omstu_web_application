from functools import wraps
from typing import Any, Callable, Coroutine

from src.rabbitmq.utils import publish_car_event


def publish_car_event_after(
    event_type: str,
) -> Callable[
    [Callable[..., Coroutine[Any, Any, Any]]],
    Callable[..., Coroutine[Any, Any, Any]],
]:

    def decorator(
        func: Callable[..., Coroutine[Any, Any, Any]],
    ) -> Callable[..., Coroutine[Any, Any, Any]]:
        @wraps(func)
        async def wrapper(*args, **kwargs) -> Any:
            result = await func(*args, **kwargs)
            if result and hasattr(result, "firm"):
                payload = {
                    "firm": result.firm,
                    "model": result.model,
                    "year": result.year,
                    "power": result.power,
                    "color": result.color,
                    "price": result.price,
                }
                await publish_car_event(event_type, payload)
            return result

        return wrapper

    return decorator
