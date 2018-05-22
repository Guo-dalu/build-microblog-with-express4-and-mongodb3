# build microblog/todolist with nodejs(database: [mongodb,mysql]) 

## introduction

A microblog demo building with express4 and mongodb3, 

in '/todolist' path it also has a to-do-list demo using mysql as database and knex as ORM,

wish it may help beginners for node.js, enjoy~

date: 2018.5

demo pics:

homepage
![](https://github.com/Guo-dalu/build-microblog-with-express4-and-mongodb3/blob/master/public/images/microblog.jpeg)

after login
![](https://github.com/Guo-dalu/build-microblog-with-express4-and-mongodb3/blob/master/public/images/login.jpeg)

register
![](https://github.com/Guo-dalu/build-microblog-with-express4-and-mongodb3/blob/master/public/images/register.jpeg)

todolist
![](https://github.com/Guo-dalu/build-microblog-with-express4-and-mongodb3/blob/master/public/images/todolist.jpeg)

《node.js 开发指南》一书中有一个express+mongodb搭建微博的例子，但书已经很老了，很多api都过时了。本项目以此为基础，把api都更新到了最新版。同时用knex连接mysql做了一个todolist的例子，包括了基本的增删改查操作，直接嵌在了路径'/todolist'下面。
node 的初学者在踩坑时可以参照本项目。

对应blog：[迁移到express4：从零搭建微博踩坑实战（绿皮书nodejs开发指南 -> 搭建博客之 express更新到4.x, bootstrap 更新到4.x 的2018版](https://blog.csdn.net/github_36487770/article/details/80319121)

[手把手教你用express + mysql + knex 做个 todoList](https://blog.csdn.net/github_36487770/article/details/80406834)

##dependencies

- "body-parser": "^1.18.3",
- "bootstrap": "^4.1.1",
- "connect-flash": "^0.1.1",
- "connect-mongo": "^2.0.1",
- "cookie-parser": "~1.4.3",
- "debug": "~2.6.9",
- "ejs": "~2.5.7",
- "express": "~4.16.0",
- "express-session": "^1.15.6",
- "http-errors": "~1.6.2",
- "jquery": "^3.3.1",
- "knex": "^0.14.6",
- "method-override": "^2.3.10",
- "mongodb": "^3.0.8",
- "morgan": "~1.9.0",
- "multer": "^1.3.0",
- "mysql": "^2.15.0",
- "popper.js": "^1.14.3",
- "serve-favicon": "^2.5.0",
- "vue": "^2.5.16"
  
