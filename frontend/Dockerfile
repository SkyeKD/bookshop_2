FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

ARG VITE_BOOK_APP_API_BASE_URL
ENV VITE_BOOK_APP_API_BASE_URL=$VITE_BOOK_APP_API_BASE_URL


COPY . .

RUN npm run build

EXPOSE 3000

# Start the frontend service
# CMD ["npm", "run", "dev", "--", "--host"]
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
