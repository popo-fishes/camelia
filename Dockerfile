# 构建依赖
FROM registry.cn-hangzhou.aliyuncs.com/sync_f/node:18-alpine AS builder

RUN npm config set registry https://registry.npmmirror.com && \
    npm i -g pnpm@10.13.0

WORKDIR /app

COPY ./packages/camelia/package.json ./packages/camelia/
COPY ./.docs/package.json ./.docs/
COPY ./build/package.json ./build/
COPY ./build-theme/package.json ./build-theme/
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN cd ./.docs && npm i

RUN pnpm i --frozen-lockfile

COPY . .

# 调试：查看 /app 和 /app/packages 目录，确认 camelia 存在（可选，排查用）
RUN ls -la /app/ && ls -la /app/packages/ && ls -la /app/packages/components

RUN cd ./.docs && npm run docs:build


FROM registry.cn-hangzhou.aliyuncs.com/sync_f/nginx:1.27-alpine AS runner

WORKDIR /app

COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/.docs/docs-dist ./docs-dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
