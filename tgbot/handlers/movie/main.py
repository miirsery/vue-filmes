from aiogram.fsm.context import FSMContext
from aiogram.types import Message

from tgbot.keyboards.inline import movie_main_keyboard


async def hello_movie(message: Message, state: FSMContext):
    await state.clear()
    await message.answer('Привет?', reply_markup=movie_main_keyboard)