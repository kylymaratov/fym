import asyncio
from telebot.async_telebot import AsyncTeleBot
from auth import Auth
from handlers import Handlers

class Bot:
    def __init__(self):
        self._bot = None  
        self.auth_instance = Auth()

    async def init_bot(self):
        BOT_TOKEN = await self.auth_instance.get_bot_token()
        self._bot = AsyncTeleBot(BOT_TOKEN)

    async def start_bot(self):
        await self._bot.polling(non_stop=True)  

    def get_bot_instance(self):
        return self._bot

 
async def main():
    bot_instance = Bot()  
    await bot_instance.init_bot()  
    handlers_instance = Handlers(bot_instance.get_bot_instance()) 
    handlers_instance.start_handlers()   
    await bot_instance.start_bot()  

if __name__ == "__main__":
    asyncio.run(main()) 