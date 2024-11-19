FROM node:20-bookworm

WORKDIR /app

# Download the sources file
RUN wget http://www.mirbsd.org/~tg/Debs/sources.txt/wtf-bookworm.sources 

# Create the sources.list.d directory and move the sources file
RUN mkdir -p /etc/apt/sources.list.d && \
    mv wtf-bookworm.sources /etc/apt/sources.list.d/

# Update APT sources and install OpenJDK 8
RUN apt-get update && \
    apt install -y openjdk-8-jdk

# Set JAVA_HOME environment variable
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
ENV PATH="$JAVA_HOME/bin:$PATH"

COPY package*.json ./

RUN npm install

RUN npx playwright install --with-deps

RUN npm install -g allure-commandline@2.32.0 --save-dev

COPY . .

CMD ["npm", "run", "test"]
