from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import base64
import config
import aiohttp
import re

class Auth:
    def __init__(self):
        self.secret_key = config.SECRET_KEY    

    async def decrypt(self, encrypted_text):
        iv_hex, encrypted_hex = encrypted_text.split(':')
        iv = bytes.fromhex(iv_hex)
        encrypted_data = bytes.fromhex(encrypted_hex)
 
        if isinstance(self.secret_key, str):
            self.secret_key = self.secret_key.encode('utf-8')
        if len(self.secret_key) != 32:
            self.secret_key = base64.b64encode(self.secret_key)[:32]
     
        cipher = Cipher(algorithms.AES(self.secret_key), modes.CBC(iv), backend=default_backend())
        decryptor = cipher.decryptor()
    
        decrypted_data = decryptor.update(encrypted_data) + decryptor.finalize()
          
        return decrypted_data.decode('utf-8')

    async def get_bot_token(self):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(config.SERVER_HOST + "/env") as response:
                    if response.status != 200:
                        print("Server response with bad status code")
                        return None   

                    data = await response.json()   
           
            BOT_TOKEN = await self.decrypt(data.get("BOT_TOKEN"))
           
            BOT_TOKEN = re.sub(r'[^0-9A-Za-z:]', '', BOT_TOKEN)
            
            return BOT_TOKEN.strip()
        except Exception as e:
            print("Failed to get bot options from server:", e)
            return None 
             



 