# Handle Versioning with Nginx

So, about a month ago due to a problem in data center, we had to change the production server manually. Because our databases were not in cluster mode, we had to shutdown some of our services, move the data to new server and start the services again. But there was an issue, we didn't want for any of our users to access the platform, before all of the services were up and running, but us developers needed to check the platform on that time to confirm the status. So, we had to find a way to handle this situation. I figured we can solve this with nginx, and setting a custom headers for requests. To make long story short, we managed to do this, but after that I thought, we can use this method to handle other kind of situations, like canary release, A/B testing, or a simple versioning. So, I decided to write this post to share my idea with you.

## Table of Contents

- [How to differentiate requests](#how-to-differentiate-requests)
- [Lets check the different configs](#lets-check-the-different-configs)
  - [Pre-Release for developers, by header](#pre-release-for-developers-by-header)
  - [Canary release based on cookie](#canary-release-based-on-cookie)
  - [Other methods](#other-methods)
  - [A better way to handle upstreams](#a-better-way-to-handle-upstreams)
- [Configuring Headers and Cookies](#configuring-headers-and-cookies)
- [Conclusion](#conclusion)

## How to differentiate requests

The first thing we need to do is to differentiate the requests. We can do this with setting a custom header for requests. For example, we can set a header like `X-Canary-Release: true` for canary release, or `X-Version: v1` for versioning, or even add a secret key to access some juicy stuff ;) . But the problem here is how to change request for web pages? If we only needed to handle API requests, we could easily set the headers in our clients, but for web pages, we need to change the requests in the browser. After some research, I found a extension for this named [Requestly](https://chromewebstore.google.com/detail/mdnleldcmiljblolnjhpnblkcekpdkpa). This extension allows us to set custom headers for requests. So, we can set the headers for our requests with this extension.

But this is not a best solution, imagine talking to a user and say "Hey, can you install this extension so that we can test a change of our platform with you?" :) . Surely there is a better solution. Few days later, I was in a cafe and was eating cookies that this problem came to my mind. Suddenly the lamp above my head turned on, "Oh wait, what about the infamous Cookies?".

So I searched a little bit and found a module to check existence and value of a cookies. Note that by setting cookies for APIs that are not for the current web page domain we may encounter issues and some ad blockers may block it, so it is better to use header versioning for API requests

Now we have a method for versioning front-end code and also a method to version APIs. Lets see what are they.

## Lets check the different configs

I created a few configuration template for nginx to read values from cookie or headers and serve the requests based on their values.

### Pre-Release for developers, by header

First we check the config based on headers and we set it in a way that our dev team can check pre-release version.

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name  SERVER_NAME;
    set $proxy_pass_address "default_server_address";

    # Extract version from header "X-Is-Dev"
    if ($http_x_is_dev = "SOMETHING_SECRET") {
        set $proxy_pass_address "pre_release_server_address";
    }

    location / {
        proxy_pass $default_server_address;
        include /etc/nginx/conf.d/customs/proxy.conf;
        expires off;
    }
}
```

In here we set the proxy pass address (`proxy_pass_address` variable) to default value. After that we check if a header named "X-Is-Dev" exists, and if it's value is `SOMETHING_SECRET`, and if it check's out, we change the `proxy_pass_address` to address to send the request to pre-release version.

### Canary release based on cookie

Now we want to let few of our customers to check the new front-end panel, to make sure it is working flawlessly. For this you can use the following template.

```nginx
upstream v2_1 {
    server
        SERVER_NAME;
}

upstream v2_2 {
    server
        SERVER_NAME;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name  SERVER_NAME;
    set $version "v2_1";

    # Extract version from cookie "app_version"
    if ($cookie_app_version) {
        set $version $cookie_app_version;
    }

    location / {
        proxy_pass http://$version;
    }
}
```

In here we set the upstreams for our different versions. After that we set the default version to `v2_1`. When a request comes, we check if a cookie named `app_version` exists, and if it does, we set the version to the value of the cookie. So, if the cookie exists and it's value is `v2_2`, the request will be sent to `v2_2` upstream, and if it doesn't exist, the request will be sent to `v2_1` upstream.

<br>

***Important Note:*** It is better to add a validation step to check if the value of the cookie is valid or not. For example, if the value of the cookie is `v2_3`, but we don't have a upstream with that name, nginx will return a 502 error. So, it is better to check if the value of the cookie is valid or not.

### Other methods

Here we only mentioned methods with `proxy_pass`, and `upstream`, but you can use this method with other methods too. For example, you can use this method with `try_files` and `root` directive to serve different files based on the version.

```nginx
location / {
    root /var/www/html/$version;
    try_files index.html;
}
```

### A better way to handle upstreams

A good practice that I found useful is to use upstreams for different versions, each in a seprarate file, and import the upstreams in the main config file. This way, besides accessing all the utility that `upstream` brings, we can easily add or remove upstream. For example, we can change your deployment script to add a new upstream file for each new version, and then reload nginx config. This way, you wouldn't need to think about nginx config when deploying a new version.

```nginx
# /etc/nginx/conf.d/upstreams/v2_1.conf
upstream v2_1 {
    server
        SERVER_NAME;
}
```

```nginx
# /etc/nginx/conf.d/upstreams/v2_2.conf
upstream v2_2 {
    server
        SERVER_NAME;
}
```

```nginx
# /etc/nginx/conf.d/app.conf
include /etc/nginx/conf.d/upstreams/*.conf;

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name  SERVER_NAME;
    set $version "v2_1";

    # Extract version from cookie "app_version"
    if ($cookie_app_version) {
        set $version $cookie_app_version;
    }

    location / {
        proxy_pass http://$version;
    }
}
```

## Configuring Headers and Cookies

Now we need to configure our clients to send the headers or cookies. There are 3 ways to do this:

<br>

**1. Set the headers in the client**

This is the easiest way. You can set the headers in your client, and send the requests. For example, in axios you can do this:

```js
axios.get('https://api.example.com', {
    headers: {
        'X-Is-Dev': THE_SECRET_KEY,
    },
});
```

<br>

**2. Change cookies in browser**

For changing cookies in browser, you only need to run the following code in your browser, or set it up to add this when user changes the version he wants to see.

```js
document.cookie = "app_version=v2_2; path=/; expires=${new Date(new Date().setFullYear(new Date().getFullYear()+1))}`;
```

This will set the cookie named `app_version` to `v2_2` and will expire in 1 year. (Make sure to update the cookie periodically, so that it doesn't expire)

<br>

**3. Use Requestly**

As mentioned before, if you want your developers to test the pre-release version, you can use [Requestly](https://chromewebstore.google.com/detail/mdnleldcmiljblolnjhpnblkcekpdkpa) extension to set the headers.

## Conclusion

In this post we learned how to handle versioning with nginx. We learned how to set headers and cookies, and how to read them in nginx config. We also learned how to use upstreams to handle different versions. I hope you enjoyed reading this and more importantly, I hope it was useful for you. If you have any questions or suggestions, feel free to contact me.
