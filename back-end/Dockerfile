FROM node:18

WORKDIR /usr/src/

COPY . .

EXPOSE 5000

RUN npm i && npm run build && npx prisma generate
# só quando eu estiver rodando isso como container
CMD ["npm", "start"]