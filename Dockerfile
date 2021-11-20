FROM node:16.13.0 as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
ENV PORT 8000
EXPOSE $PORT
CMD ["npm", "run", "build"]
