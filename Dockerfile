# ===== 构建阶段 =====
FROM node:20-alpine AS builder
WORKDIR /app

# 单独复制 lock 文件以利用 Docker 缓存层
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# 复制源码
COPY . .

# 构建：velite 编译内容 → next build
RUN npm run build

# ===== 运行阶段 =====
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非 root 用户（安全最佳实践）
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# 从构建阶段复制运行所需的最小文件集
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.velite ./.velite

# 赋予权限
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
