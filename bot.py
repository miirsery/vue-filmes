import asyncio
import logging
import nest_asyncio

from aiogram import Bot, Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage
from aiohttp.web import run_app
from aiogram.webhook.aiohttp_server import SimpleRequestHandler, \
    setup_application
from aiohttp.web_app import Application

from tgbot.config import Config, load_config
from tgbot.handlers.movie.router import movie_router
from tgbot.handlers.authorization.main import authorization
from tgbot.handlers.movie.main import send_notification
from tgbot.middlewares.config import ConfigMiddleware


logger = logging.getLogger(__name__)


def register_all_handlers(dp):
    dp.include_router(movie_router)


def register_all_middlewares(dp: Dispatcher, config: Config):
    config_middleware = ConfigMiddleware(config)

    dp.update.middleware(config_middleware)


async def on_startup(bot: Bot, base_url: str):
    await bot.set_webhook(f"{base_url}/webhook")


async def main():
    nest_asyncio.apply()

    logging.basicConfig(
        level=logging.INFO,
        format=u'%(filename)s:%(lineno)d #%(levelname)-8s [%(asctime)s]'
        '- %(name)s - %(message)s'
        )
    logger.info("Starting bot")
    config = load_config(".env")

    storage = MemoryStorage() if config.tg_bot.use_redis else MemoryStorage()
    bot = Bot(token=config.tg_bot.token, parse_mode='HTML')
    dp = Dispatcher(storage=storage)
    dp["base_url"] = 'https://9925-176-51-109-142.eu.ngrok.io'
    dp.startup.register(on_startup)

    app = Application()
    app["bot"] = bot

    register_all_handlers(dp)

    app.router.add_post("/api/v1/authorization", authorization)
    app.router.add_post("/api/v1/movies", send_notification)
    SimpleRequestHandler(
        dispatcher=dp,
        bot=bot,
    ).register(app, path="/webhook")
    setup_application(app, dp, bot=bot)

    run_app(app, host="127.0.0.1", port=8001)

    # start
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
