FROM node:18-alpine
WORKDIR /app
RUN npm init -y && npm install express cors typeorm sqlite3
COPY server.js .
COPY src/ ./src/
EXPOSE 3000
CMD ["node", "server.js"]