# Songfiy

![Logo](https://i.ibb.co/h26NdcZ/image.png)

This apps was created for downloading and listening to music.

### How run this API?

Create the .env file as shown in .env.example

#### Important 
Dont forget run migrations before run API

Command for install depends
``` 
npm install
```

For production build
```
npm run build

npm start
```

For development mode
```
npm run start:dev
```

This API uses the [yt-dlp](https://github.com/yt-dlp) library for its work.

### How install yt-dlp?

Download the latest version of python from https://www.python.org/

For windows
```
python -m pip install yt-dlp
```
For Linux
```
python3 -m pip3 install yt-dlp
```

OPEN API documentation http://localhost:5000/docs