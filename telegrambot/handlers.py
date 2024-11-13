from utils import Utils
import asyncio


class Handlers:
    def __init__(self, bot):
        self.bot = bot
        self.utils = Utils()
        self.request_count = 5
        
    async def send_start_message(self, message):
        text = "Hello, I'm a bot assistant. I can send you any music from YouTube for free and without restrictions. You can find out more with the command /help"
        await self.bot.send_message(message.chat.id, text)

    async def send_help_message(self, message):    
        await self.bot.reply_to(message, message.text)

    async def message_handler(self, message):
        try:
            video_id = self.utils.extract_video_id(message.text)

            if not video_id:
                 return
        
            metadata = await self.utils.request_to_song(video_id)

            sended_message = None

            if not metadata:
                sended_message = await self.bot.reply_to(message, "This song is not in the database, it will be sent as soon as the download is completed")
                
                count = 0
                downloading = None

                while count <= self.request_count:
                    downloading = await self.utils.download_to_song(video_id)
                
                    if downloading:
                        break

                    count += 1
                    await asyncio.sleep(5)
                     
                if not downloading:
                    raise Exception("Could not get the song at the moment. Perhaps the link is not a song")

                metadata = await self.utils.request_to_song(video_id)

            await self.bot.send_audio(message.chat.id, metadata.get("file_id"))

        except Exception as err:
             await self.bot.reply_to(message, str(err))
        finally: 
            if sended_message:
                 await self.bot.delete_message(sended_message.chat.id, sended_message.message_id)
            

    def start_handlers(self):
        self.bot.register_message_handler(self.send_start_message, commands=["start"])
        self.bot.register_message_handler(self.send_help_message, commands=["help"])
        self.bot.register_message_handler(self.message_handler, func=lambda message: True)
    