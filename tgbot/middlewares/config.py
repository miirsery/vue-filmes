from aiogram import BaseMiddleware

from tgbot.config import Config


class ConfigMiddleware(BaseMiddleware):
    """Позволяет хендлерам получать config"""

    def __init__(self, config: Config):
        self.config = config

    async def __call__(self, handler, event, data):
        data['config'] = self.config
        return await handler(event, data)