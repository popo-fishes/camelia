# 构建依赖
FROM registry.cn-hangzhou.aliyuncs.com/sync_f/node:18-alpine AS builder

RUN npm config set registry https://registry.npmmirror.com && \
    npm i -g pnpm@8.15.7

WORKDIR /app

COPY ./packages/camelia/package.json ./packages/camelia/
COPY ./.docs/package.json ./.docs/
COPY ./build/package.json ./build/
COPY ./build-theme/package.json ./build-theme/
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN pnpm i --frozen-lockfile

COPY . .

RUN cd .docs && npm run docs:build


FROM registry.cn-hangzhou.aliyuncs.com/sync_f/nginx:1.27-alpine AS runner

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/.docs/docs-dist ./docs-dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
