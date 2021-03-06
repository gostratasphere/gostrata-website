FROM node:8

# Create app directory
WORKDIR /app
RUN touch output && echo ${CODEBUILD_SOURCE_VERSION} > output

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 80
CMD [ "node", "./bin/gostrata" ]

