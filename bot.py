import asyncio
import logging

from aiogram import Bot, Dispatcher, types
from aiogram.fsm.storage.memory import MemoryStorage

from tgbot.config import Config, load_config
from tgbot.handlers.movie.router import movie_router
from tgbot.middlewares.config import ConfigMiddleware

logger = logging.getLogger(__name__)


def register_all_handlers(dp):
    dp.include_router(movie_router)


def register_all_middlewares(dp: Dispatcher, config: Config):
    config_middleware = ConfigMiddleware(config)

    dp.update.middleware(config_middleware)


async def main():
    logging.basicConfig(
        level=logging.INFO,
        format=u'%(filename)s:%(lineno)d #%(levelname)-8s [%(asctime)s] - %(name)s - %(message)s',
        )
    logger.info("Starting bot")
    config = load_config(".env")

    storage = MemoryStorage() if config.tg_bot.use_redis else MemoryStorage()
    bot = Bot(token=config.tg_bot.token, parse_mode='HTML')
    dp = Dispatcher(storage=storage)

    register_all_handlers(dp)   

    #start
    await bot.delete_webhook(drop_pending_updates=True)
    try:
        await dp.start_polling(bot)
    finally:
        await dp.storage.close()
        await bot.session.close()


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.error("Bot stopped!")
