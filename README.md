# webpack4-test

## 启动方式

> dll为抽离出的依赖库，这部分是不变的，可以先单独打包，每次构建时直接依赖就可以，可以大幅度提升构建和打包效率

#### 开发环境
先使用 `npm run build:dll:dev`
在 `npm start`

#### 生产环境
先使用 `npm run build:dll`
在 `npm run build`