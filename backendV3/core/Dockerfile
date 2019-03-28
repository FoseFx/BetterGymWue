FROM rust:1.33.0-slim-stretch AS build

WORKDIR /usr/src/app
RUN rustup default nightly

COPY . ./

RUN cargo install --path .

RUN cargo build --release

RUN ldd target/release/cache-server

RUN LANG=en objdump -s -j .interp target/release/cache-server

FROM alpine

RUN apk --no-cache add ca-certificates

WORKDIR /root/app

COPY --from=build /usr/src/app/target/release/ ./
COPY --from=build /lib/x86_64-linux-gnu/libdl.so.2 /lib/x86_64-linux-gnu/libdl.so.2
COPY --from=build /lib/x86_64-linux-gnu/librt.so.1 /lib/x86_64-linux-gnu/librt.so.1
COPY --from=build /lib/x86_64-linux-gnu/libpthread.so.0 /lib/x86_64-linux-gnu/libpthread.so.0
COPY --from=build /lib/x86_64-linux-gnu/libgcc_s.so.1 /lib/x86_64-linux-gnu/libgcc_s.so.1
COPY --from=build /lib/x86_64-linux-gnu/libc.so.6 /lib/x86_64-linux-gnu/libc.so.6
COPY --from=build /lib64/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2
COPY --from=build /lib/x86_64-linux-gnu/libm.so.6 /lib/x86_64-linux-gnu/libm.so.6


EXPOSE 8000
ARG REDIS_PATH="redis://redis:6379/"
ENV REDIS_PATH=${REDIS_PATH}


CMD ["/root/app/cache-server"]

