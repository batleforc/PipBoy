ARG BASETAG=20.04

FROM ubuntu:${BASETAG} as stage-ubuntu

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y \
  inetutils-ping \
  lsb-release \
  net-tools \
  unzip \
  vim \
  zip \
  curl \
  git \
  wget \
  nano \
  && rm -rf /var/lib/apt/lists/*

FROM stage-ubuntu as stage-xfce

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y \
  mousepad \
  locales \
  supervisor \
  xfce4 \
  xfce4-terminal \
  && locale-gen fr_FR.UTF-8 \
  && apt-get purge -y \
  pm-utils \
  xscreensaver* \
  && rm -rf /var/lib/apt/lists/*

FROM stage-xfce as stage-vnc

RUN wget -qO- https://jztkft.dl.sourceforge.net/project/tigervnc/stable/1.12.0/tigervnc-1.12.0.x86_64.tar.gz | tar xz --strip 1 -C /


FROM stage-xfce as stage-wrapper

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y \
  gettext \
  libnss-wrapper \
  && rm -rf /var/lib/apt/lists/*

FROM stage-wrapper as stage-final

ARG ARG_HOME
ARG ARG_REFRESHED_AT
ARG ARG_VERSION_STICKER
ARG ARG_VNC_BLACKLIST_THRESHOLD
ARG ARG_VNC_BLACKLIST_TIMEOUT
ARG ARG_VNC_PW
ARG USERNAME

ENV \
  LANG='fr_FR.UTF-8' \
  LANGUAGE='fr_FR:fr' \
  LC_ALL='fr_FR.UTF-8'

ENV \
  DISPLAY=:1 \
  HOME=${ARG_HOME:-/home/headless} \
  REFRESHED_AT=${ARG_REFRESHED_AT} \
  VERSION_STICKER=${ARG_VERSION_STICKER} \
  VNC_BLACKLIST_THRESHOLD=${ARG_VNC_BLACKLIST_THRESHOLD:-20} \
  VNC_BLACKLIST_TIMEOUT=${ARG_VNC_BLACKLIST_TIMEOUT:-0} \
  VNC_COL_DEPTH=24 \
  VNC_PORT="5901" \
  VNC_PW=${ARG_VNC_PW:-headless} \
  VNC_RESOLUTION=1920x1080x24 \
  VNC_VIEW_ONLY=false \
  RESOLUTION=1920x1080x24

WORKDIR ${HOME}