

from aiogram import Bot
# from aiogram.types import (
#     # InlineQueryResultArticle,
#     # InputTextMessageContent,
# )

from aiohttp.web_response import json_response
from aiohttp.web_request import Request
# from aiogram.utils.web_app import safe_parse_webapp_init_data


async def send_success_message(chat_id: int, text: str):
    bot = Bot(token='5953327450:AAFSJcqCf5UIej6EEKvHxwfCqaWftitXVxI')
    await bot.send_message(chat_id=chat_id, text=text)


async def authorization(request: Request) -> None:
    data = await request.json()

    await send_success_message(
        data["user"]["id"],
        f'Welcome to us, {data["user"]["username"]} '
    )

    return json_response({"ok": True})
#     bot: Bot = request.app["bot"]
#     data = await request.json()
#     # data = await request.post()  # application/x-www-form-urlencoded

#     # print(data['_auth'])
#     # data = json.dumps(data)
#     print(data)
#     # print(dir(data))
#     try:
#         # Нет поля _auth в data
#         web_app_init_data = safe_parse_webapp_init_data(
#             token=bot.token, init_data=data["_auth"]
#             )
#     except ValueError:
#         return json_response({"ok": False, "err": "Unauthorized"},
#  status=401)
#     # print(data)
#     # # send_message(text='Hi')

#     # # Bot.send_message(chat_id='miirsery', text='123')

#     await bot.answer_web_app_query(
#         web_app_query_id=web_app_init_data.query_id,
#         result=InlineQueryResultArticle(
#             id=web_app_init_data.query_id,
#             title="Demo",
#             input_message_content=InputTextMessageContent(
#                 message_text="Hello, World!",
#                 parse_mode=None,
#                 ),
#             ),
#         )
#     return json_response({"ok": True})
