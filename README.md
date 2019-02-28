# hexo-cookieconsent

A hexo plugin for quickly adding the https://github.com/insites/cookieconsent/ lightweight JavaScript plugin for alerting users about the use of cookies on your website.

## Installation
``` bash
$ npm i hexo-cookieconsent
```
## Usage
Inside your hexo _config.yml file.
``` yaml
cookieconsent:
  enable: true
```
The plugin has several options.

## Options
Go to: https://cookieconsent.insites.com/download/

Create your cookieconsent how you want it using the form.
Paste the object into your hexo _config.yml file under "options".
``` yaml
cookieconsent:
  enable: true
  options: {
             "palette": {
               "popup": {
                 "background": "#eb6c44",
                 "text": "#ffffff"
               },
               "button": {
                 "background": "#f5d948"
               }
             },
             "theme": "classic",
             "position": "top",
             "static": true,
             "content": {
               "message": "This website uses cookies to ensure you get the best experience on our website. Who doesn't like cookies?",
               "dismiss": "Feed me",
               "link": "Cookie recipes",
               "href": "buzzcat.com"
             }
           }
```

The script is inserted during hexo generate so don't forget:
```
hexo generate
```


TODO: advanced compliance options