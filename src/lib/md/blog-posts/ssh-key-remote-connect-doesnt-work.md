# SSH Key Connection to Server Doesn't Work

So you've generated your SSH key and added it to your server, but you still can't connect. What gives?

## Table of Content

- [What does SSH even mean?](#what-does-ssh-even-mean)
- [Why is SSH so secure?](#what-is-ssh-key-based-authentication)
- [What is SSH key based authentication?](#what-is-ssh-key-based-authentication)
- [How to generate an SSH key?](#how-to-generate-an-ssh-key)
- [How to add your SSH key to your server?](#how-to-add-your-ssh-key-to-your-server)
- [How to connect to the server using your SSH key?](#how-to-connect-to-the-server-using-your-ssh-key)
- [The Permission Problem](#the-permission-problem)
- [Still can't connect?](#still-cant-connect)
- [Other thoughts](#other-thoughts)
- [References](#references)

## What does SSH even mean?

SSH stands for Secure Shell. It's a protocol that allows you to connect to a remote server and execute commands on it. It's a very powerful tool that you'll use a lot as a developer. It's also a very secure protocol, which is why it's the standard for connecting to servers. But it is not even the most common usage of it. More than 90 percent of all you web usage is with HTTPS protocol, which is a secure version of HTTP, and it uses SSH under the hood.

## Why is SSH so secure?

SSH uses a public/private key pair to authenticate you. The public key is the key that anyone can see, and the private key is the key that only you can see. If you encrypt something with one of these keys, you can only decrypt it with the other. So if you encrypt something with your private key, only your public key can decrypt it, and if you encrypt something with your public key, only your private key can decrypt it. This is the basis of how SSH works. You can find out why you need the other key for decryption by searching for it, and maybe I would write another post about it later.

When you first connect to a server, it asks you if you trust a fingerprint. This is the hash of the server's public key. When you press "y" to trust, it would be stored in you device and used to encrypt/decrypt the connection. This is how SSH is secure. If someone tries to intercept your connection, they won't be able to decrypt it without your private key.

## What is SSH key based authentication?

Up until now, when you connected to a server, it would ask for a password from you, and the SSH is only used for encryption of messages. But there is a method for authentication which is way more secure than password, and that is "SSH key based authentication".

The way it work is that when you trying to establish an SSH connection, you send a message to the server, using your SSH private key. The server then checks the message with public keys that it has stored, and if it finds a match that can decrypt the message, it means that it knows you and your SSH connection is established. This is way more secure than password, because it's impossible to guess your private key, and it's very hard to crack it. (Nearly impossible)

## How to generate an SSH key?

There are many ways to generate an SSH key, but the most common way is to use the `ssh-keygen` command. (I only show one way here, for Unix systems, for other systems, you can check a guide in [Github](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent))

```bash
ssh-keygen -t ed25519 -C "YOUR_EMAIL"
```

you can replace `ed25519` with `rsa` if you want, but `ed25519` is more secure and faster. While generating the key, it will ask you for a passphrase, you can leave it empty if you want, but it's better to have one. This key will a master key and anyone who can access you local file can use it, so have a passphrase is a recommended. Also you can specify a path for the key, but it's better to leave it empty and use the default path.

For an `ed25519` key, two files would be generated in `$HOME/.ssh` one would be named `id_ed25519` and the other one is `id_ed25519.pub`. The first one is your private key and the second one is your public key.

**IMPORTANT NOTE**: Never give your private key to anyone, or upload it. It is very dangerous. As a case in point, few month prior, the private key for GitHub anciently got leaked for 1 second, (GitHub has an SSH option for push, pulling to your repositories. private key for this ssh got leaked) and GitHub immediately changed the key pair and every developer was asked if they trust the new key when the wanted to connect to the repo using SSH protocol.

## How to add your SSH key to your server?

There is few days for this, but the most common way is to use `ssh-copy-id` command. This command would copy your public key to the server and add it to the `authorized_keys` file. This file is a list of public keys that the server trusts. If you have access to this file, you can add your public key to it manually, but it's better to use `ssh-copy-id` command.

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub USER@HOST
```

After running this command, you would be asked for the password of the user you are trying to connect to. After entering the password, your public key would be added to the `authorized_keys` file and you can connect to the server using your private key.

If you can not do this, then copy the content of your public key file `id_ed25519.pub` and add it to the `~/.ssh/authorized_keys` file manually. If you do this, make sure that the file and folder have the right permission. Check [The Permission Problem](#the-permission-problem) section for more information.

## How to connect to the server using your SSH key?

After adding your public key to the server, you can connect to it using your private key. By default the SSH client in you OS would look for the private keys and check them with the server, and if couldn't connect using one of them, it would fall back to password authentication. So you don't need to do anything special to connect to the server using your private key. But if you want to specify the key that you want to use, for example in case you did't store it in the default location, you can use the `-i` option.

```bash
ssh -i ~/.ssh/id_ed25519 USER@HOST
```

## The Permission Problem

So this is where the problems begin. When I did the above, I still couldn't connect to the server using my private key. After some research, I found out that the problem was with the permission of the `~/.ssh` folder and the `authorized_keys` file. The best solution I found was to run the command below in your server:

```bash
chmod go-w /home/user
chmod 700 /home/user/.ssh
chmod 600 /home/user/.ssh/authorized_keys
```

or

```bash
chmod go-w /root
chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys
```

This would change the permission of the `~/.ssh` folder and the `authorized_keys` file to the right permission. You can use this command for both root and non-root user, but you have to do it for every user in your server.

## Still can't connect?

So, after setting the permissions I still couldn't connect 🤷‍♂️. I tried activating the debug3 logs. In your server edit the ssh config file `/etc/ssh/sshd_config`, and add/uncomment the following lines.

```yml
SyslogFacility AUTH
LogLevel DEBUG3
```

Then restart the service daemon using `sudo systemctl restart sshd`. Now you can check the logs using `tail -l /var/log/auth.log`.

After going throw this, and also the config files, I found few config line which uncommenting them helped.

```yml
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key
HostKey /etc/ssh/ssh_host_ed25519_key
AuthorizedKeysFile      .ssh/authorized_keys
```

These are the configs which enables the SSH key based authentication.

## Other thoughts

Meanwhile I was researching for this problem, I found out that the configuration file which VS Code's Remote-SSH is using can be used to configure shortcuts, and this kind of replaces the need of 3 rd party SSH clients like Termius. So I am going to research about it a bit more and write another blog about it.

## References

- [SSH Authentication Refused: Bad Ownership or Modes for Directory](https://chemicloud.com/kb/article/ssh-authentication-refused-bad-ownership-or-modes-for-directory/)
- [Enable ed25519 SSH Keys Auth on Ubuntu 18.04](https://rubysash.com/operating-system/linux/enable-ed25519-ssh-keys-auth-on-ubuntu-18-04/)
