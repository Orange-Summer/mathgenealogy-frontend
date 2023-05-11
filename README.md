# 数学家数字族谱的可视化系统-前端(mathgenealogy-frontend)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Nginx 设置

由于 Vue 中路由使用 history 模式，Vue 路由在 Nginx 中需要一些额外设置。

```
location / {
    try_files $uri $uri/ /index.html;
}
```

Axios 请求路径中没有指定 ip，默认会从 localhost 发出请求，需要进行反向代理到后端接口。

```
location ^~ /api
{
    proxy_pass http://ip或网址:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_http_version 1.1;
    # proxy_hide_header Upgrade;

    add_header X-Cache $upstream_cache_status;
    #Set Nginx Cache

    set $static_filemz6dwsTu 0;
    if ( $uri ~* "\.(gif|png|jpg|css|js|woff|woff2)$" )
    {
        set $static_filemz6dwsTu 1;
        expires 1m;
    }
    if ( $static_filemz6dwsTu = 0 )
    {
        add_header Cache-Control no-cache;
    }
}
```
