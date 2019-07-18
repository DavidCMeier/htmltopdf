# htmltopdf

install dependencies: 
``npm install``

If you want to use with docker: 

``` 
docker build -t davidcmeier/htmltopdf .
docker run -P 5000:5000 -d davidcmeier/htmltopdf
```

otherwise if you want to run in local: ``node htmltopdf``

## How to use

When you have the server up, just make a post call send it a json like this in the body: 
```
{
  html:'<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<h1>Hello World!</h1>
</body>
</html>'
  landscape: true
}
```

### html: string
 Please, dont use single quotes into your html, or make a encode previusly.
### landscape: boolean
  With this attribute you can define if your pdf is in horizontal or not. Accept a Boolean
