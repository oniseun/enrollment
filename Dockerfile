FROM node:10.14.1-alpine

LABEL maintainer="acumen <seunoni34@gmail.com>"

ENV LINUX alpine
ENV APP acumen

# Create applicatin folder and adjust persmissions
RUN mkdir -p /var/www/acumen && chown -Rf nobody:nobody /var/www/acumen
COPY --chown=nobody:nobody . /var/www/acumen

# Create link for configs
RUN ln -sf /etc/config/serviceAccount.json /var/www/acumen/serviceAccount.json

WORKDIR /var/www/acumen
EXPOSE 8080

CMD [ "/usr/local/bin/npm", \
    "--prefix", \
    "/var/www/acumen", \
    "start" ]
