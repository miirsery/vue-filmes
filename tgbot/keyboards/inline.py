from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup


movie_main_keyboard = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text='Отправить', callback_data='send_data')]
])
