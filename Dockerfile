FROM node:20

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y python3 python3-pip python3-venv
RUN python3 -m venv /opt/venv
RUN /opt/venv/bin/pip install yt-dlp
ENV PATH="/opt/venv/bin:$PATH"

RUN npm install
 
COPY . .

RUN npm run build

RUN npm run migration:generate -- ./src/database/migration/Init

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
