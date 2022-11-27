
# import json

from aiogram import Bot
from aiogram.fsm.context import FSMContext
from aiogram.types import Message

# from aiogram.types import Message

# from aiohttp.web_response import json_response
from aiohttp.web_request import Request

from aiohttp.web_response import json_response
# from aiogram.utils.web_app import safe_parse_webapp_init_data

from tgbot.keyboards.inline import movie_main_keyboard


async def send_success_message(chat_id: int, text: str):
    bot = Bot(token='5953327450:AAFSJcqCf5UIej6EEKvHxwfCqaWftitXVxI')
    await bot.send_message(chat_id=chat_id, text=text)


async def hello_movie(message: Message, state: FSMContext):
    await state.clear()
    await message.answer('Привет?', reply_markup=movie_main_keyboard)


async def send_notification(request: Request):
    data = await request.json()
    print(data)
    await send_success_message(
        829559384,
        f'the movie {data["movie"]["title"]} has been successfully added'
    )
    return json_response({"ok": True})
