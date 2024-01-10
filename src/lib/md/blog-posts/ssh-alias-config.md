# Don't use SSH Clients! Use SSH Aliases instead

I have been using SSH Clients for years now for the convenience of not typing config(username@host and then IP) every time, but recently found another way for it that is encouraging me to ditch SSH Clients. I am going to explain it in this blog post.

## Table of Content

- [What are SSH, SSH Clients and SSH Aliases?](#what-are-ssh-ssh-clients-and-ssh-aliases)
- [How did I find out about SSH Aliases?](#how-did-i-find-out-about-ssh-aliases)
- [What is the SSH config file?](#what-is-the-ssh-config-file)
- [SSH Config Boilerplate](#ssh-config-boilerplate)
  - [Simple SSH Connection](#simple-ssh-connection)
  - [Local Port Forwarding](#local-port-forwarding)
  - [Remote Port Forwarding](#remote-port-forwarding)
  - [SOCKS Proxy](#socks-proxy)
  - [SSH Proxy Jump (SSH through SSH)](#ssh-proxy-jump-ssh-through-ssh)
- [Conclusion](#conclusion)
- [References](#references)

## What are SSH, SSH Clients and SSH Aliases?

As I mentioned in a [previous blog post](/blog/ssh-key-remote-connect-doesnt-work), **SSH** is a protocol that allows you to connect to a remote server and execute commands on it.

**SSH Clients** are applications that allow you to connect to a remote server using SSH protocol. They are very useful because they allow you to save your connection configurations and connect to the server with a single click. They also have other features like SFTP, which allows you to transfer files between your local machine and the server, or SSH Tunneling, which allows you to connect to a server that is behind a firewall. My favorite SSH Client and the one i have been using is [Termius](https://termius.com/). It's a very good SSH Client with a lot of features (like synchronization across devices).

**SSH Aliases** is a method to save some of your configuration to use it later. It's a feature of SSH itself, and you don't need any third party application to use it.

## How did I find out about SSH Aliases?

Actually I have been using SSH Aliases for a long time, but I didn't know what it actually is and what can it do. There is an extension in VS Code named [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh). Using this extension you can connect to a remote server using SSH protocol and develop in it. It's very useful because you can use all the features of VS Code in the remote server. When you are setting up the extension, it asks you to enter an info for connecting, and saves it in a ssh config file and will use it later.

Few weeks ago when I was searching for the problem I had in the [previous blog post](/blog/ssh-key-remote-connect-doesnt-work), I found out that the config file that VS Code is using is actually the config file of SSH client itself, and it is also has way more feature than I thought. So I started to RTFM (read the f**king manual) and read the whole man page of SSH. There was a lot of useful information in it, and it also had lot of config options that the average user doesn't need. I created a few boilerplate configs that you can use, for different use cases, and I am gonna share them with you.

## What is the SSH config file?

Before talking about config options, let's talk about the config file itself. The config file is located in `~/.ssh/config` for user config and `/etc/ssh/ssh_config` for system config. You can edit it using any text editor. The config file is divided into sections, and each section is for a specific host(s). You can also include other files as a config file, and it's very useful if you want to separate your config for different use cases or for different servers.

## SSH Config Boilerplate

For each config there is two part, mandatory and optional. The mandatory part is the you have to have it for the config to work, but you can omit the optional part, or oven put it in other boiler plates. For usage after putting you value instead of the placeholders, add the config to your config file.

### Simple SSH Connection

This is the most basic config for connecting to a server using SSH. It's very similar to the `ssh` command.

```yml
Host HOSTNAME
    # Mandatory
    Hostname HOSTNAME
    User USERNAME
    Port PORT
    # Optional
    IdentityFile PATH_TO_KEY
    LocalCommand COMMAND
    PermitLocalCommand yes
    RemoteCommand COMMAND
    SendEnv ENV_VAR [ENV_VAR ...]
```

So, in the above config, the `Hostname` should be the host address or IP address of the server. The `User` should be the username that you want to use to connect to the server. The `Port` should be the port that you want to use to connect to the server. The `IdentityFile` should be the path to the SSH key that you want to use to connect to the server. If you prefer not to use SSH key or to use SSH key store in default files, just ignore this.

The `LocalCommand` is a command that you want to run on your local machine after connecting to the server. The `PermitLocalCommand` is a boolean value that specifies if you want to run the `LocalCommand` or when you want your run local command with `!COMMAND` from your remote terminal. The `RemoteCommand` is a command that you want to run on the server after connecting to it. This command would run in your session, for example put `tmux attach` in it to attach to a tmux session. The last option, `SendEnv` is a list of environment variables that you want to send to the server. You can use `*` as a wildcard for the variable name. Examples: `SendEnv MY_VAR`, `SendEnv MY_*_VAR`, `SendEnv MY_VAR1 MY_VAR2`.

### Local Port Forwarding

This is a config for local port forwarding. It's very useful if you want to connect to a server that is behind a firewall. You can use it to connect to a server that is behind a firewall, or to connect to a server that is only accessible from another server. For example if you have a server that is only accessible from your local network, you can use this config to connect to it from your local machine.

```yml
Host HOSTNAME
    # Mandatory
    Hostname HOSTNAME
    User USERNAME
    Port PORT
    LocalForward BIND_IP:LOCAL_PORT SERVER:SERVER_PORT
    # Optional
    SessionType SESSION_TYPE
    PasswordAuthentication no
    PreferredAuthentications AUTHENTICATION_METHODS
    UseKeychain yes
```

So, in the above config, we have `LocalForward` option. This option is used to specify the port forwarding. The `BIND_IP` is the IP address that you want to bind the port to (leave empty if you want to be all). The `LOCAL_PORT` is the port that you want to bind. The `SERVER` is the server that you want to connect to. The `SERVER_PORT` is the port that you want to connect to in the server.

As for the optional configs, the `SessionType` is the type of the session that you want to use (use `none` to disable shell, other options are `subsystem` and `default`). The `PasswordAuthentication` is a boolean value that specifies if you want to use password authentication or not. The `PreferredAuthentications` is the authentication methods that you want to use (The default value is `gssapi-with-mic,hostbased,publickey,keyboard-interactive,password`, change it for your need). The `UseKeychain` is a boolean value that specifies if you want to use the keychain or not. This option is only available on macOS.

### Remote Port Forwarding

This is a config for remote port forwarding. It's very useful if you want to share a port on your local machine with other, so you set up a port on a server and forward it to your local machine. For example you can use it to share a website that is running on your local machine with other people.

```yml
Host HOSTNAME
    # Mandatory
    Hostname HOSTNAME
    User USERNAME
    Port PORT
    RemoteForward BIND_IP:SERVER_PORT HOST:HOST_PORT
    # Optional
    PermitRemoteOpen HOST:PORT [HOST:PORT ...]
    ExitOnForwardFailure yes
    ServerAliveInterval INTERVAL
    ServerAliveCountMax COUNT
```

So, in the above config, we have `RemoteForward` option. This option is used to specify the port forwarding. The `BIND_IP` is the IP address that you want to bind the port to (leave empty if you want to be all). The `SERVER_PORT` is the port that you want to bind. The `HOST` is the host that you want to connect to. The `HOST_PORT` is the port that you want to connect to in the host. You can also use this command to setup a SOCKS proxy, in that case you can leave the `HOST` and `HOST_PORT` empty.

If you do that but want to limit the hosts that can connect to the proxy, you can use the `PermitRemoteOpen` option. This option specifies the hosts that the proxy is allowed to connect to. `ExitOnForwardFailure` is a boolean value that specifies if you want to exit if the port forwarding fails (you can use it for all kind of port forwardings). The next two options `ServerAliveInterval` and `ServerAliveCountMax` are two integers to calculate a timeout if the server doesn't send any data. For this just multiply the `ServerAliveInterval` and `ServerAliveCountMax` and you get the proximate timeout in seconds.

### SOCKS Proxy

This is a config for SOCKS proxy. It's very useful if you want to use the server as a proxy. For example you can use it to bypass the firewall of your local network.

```yml
Host HOSTNAME
    # Mandatory
    Hostname HOSTNAME
    User USERNAME
    Port PORT
    DynamicForward BIND_IP:LOCAL_PORT
    # Optional
    ConnectTimeout TIMEOUT
```

So, in the above config, we have `DynamicForward` option. This option is used to specify the port forwarding. The `BIND_IP` is the IP address that you want to bind the port to (leave empty if you want to be all). The `LOCAL_PORT` is the port that you want to bind. The `ConnectTimeout` is the timeout for connecting to the server.

### SSH Proxy Jump (SSH through SSH)

This one is a really cool one. It allows your SSH client to connect to a server that is only accessible from another server. For example if you have a server that is only accessible from your work's local network, you can use this config to connect to it from your local machine.

```yml
Host HOSTNAME_A
    # Mandatory
    Hostname HOSTNAME_A
    User USERNAME_A
    Port PORT_A

Host HOSTNAME_B
    # Mandatory
    Hostname HOSTNAME_B
    User USERNAME_B
    Port PORT_B
    ProxyJump HOSTNAME_A

Host HOSTNAME_C
    # Mandatory
    Hostname HOSTNAME_C
    User USERNAME_C
    Port PORT_C
    ProxyJump HOSTNAME_B
```

In this case, we are trying to connect to server C which is only accessible from server B, and server B is only accessible from server A. So we have to connect to server A first, then connect to server B from server A, and then connect to server C from server B. This config allows us to do that. The `ProxyJump` option is used to specify the server that you want to connect to before connecting to the current server. You can also use `ProxyCommand` option instead of `ProxyJump`, but it's more complicated and also less secure (`ProxyJump` has encryption, but `ProxyCommand` doesn't). Note that if you want to use SSH key based authentication, you have to have all the keys in your local machine, and specify the key for each server, in the above config.

## Conclusion

So, these are the most common configs that I use. There are a lot more options that you can use, but these are the most common ones. I hope you find this useful. If you have any question, feel free to contact me via email (See the main page for my email address).

## References

- The man description of SSH config file, `man ssh_config` command.
