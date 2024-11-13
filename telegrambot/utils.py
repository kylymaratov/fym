import re
import aiohttp
import config

class Utils:
    def __init__(self):
        pass

    def extract_video_id(self, url):
        match = re.search(r'v=([a-zA-Z0-9_-]{11})', url)
        if match:
            return match.group(1)
        return None
    
    async def download_to_song(self, songId):
         async with aiohttp.ClientSession() as session:
                async with session.get(config.SERVER_HOST + "/api/v1/song/listen?songId=" + songId) as response:
                   
                   if response.status == 206:
                        return True
                   if response.status == 410:
                        raise Exception("This song is not available for download")
                   if response.status != 200:
                        return None
                   return True
           
    
    async def request_to_song(self, songId):
        async with aiohttp.ClientSession() as session:
                async with session.get(config.SERVER_HOST + "/api/v1/song?songId=" + songId) as response:
                    if response.status != 200:
                        return None   

                    data = await response.json()   

        try:
            metadata = data.get("metadata")
            return metadata 
        except: 
             return None
            
           
           
            
           