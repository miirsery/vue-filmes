from aiogram import Router, types
from aiogram.filters import Command

movie_router = Router()


@movie_router.message(Command(commands=["start"]))
async def command_start_handler(message: types.Message) -> None:
    await message.answer('Hello')
