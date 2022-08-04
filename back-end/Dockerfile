FROM node:18

WORKDIR /app/

COPY . .

EXPOSE 5000

RUN npm i

# só quando eu estiver rodando isso como container
CMD ["node", "run", "dev:migrate"]