# node20-slimで起動する
FROM node:20-slim

ENV HOME=/docker/super-shiharai-kun
WORKDIR $HOME

# Install node_modules
COPY package* $HOME/
RUN npm ci

# Copy source files
COPY --chown=node:node src $HOME/src

USER node

EXPOSE 8080
ENTRYPOINT ["npm"]
CMD ["start"]
