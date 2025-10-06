# Installation Guide

Vala is available on multiple operating systems. Follow the installation
instructions below for your operating system.

## Linux

Vala is available on a large variety of Linux distributions. You can
also install other development files for libraries to use with vala.

### Fedora

Development files usually come in `*-devel` packages, for example
`libgee-devel`.

```shell
sudo dnf install vala
```

### Debian

You need to install `*-dev` packages, to get development files on
Debian.

```shell
sudo apt install valac
```

### Arch Linux

```shell
sudo pacman -S vala
```

### ALT Linux

Development library packages are named as _lib*-devel_.
Example: _libgee-devel_.

```shell
apt-get install vala
```

## *BSD

First you install the port:

```shell
cd /usr/ports/lang/vala/ && make install clean
```

And then you can add the package:

```shell
pkg install vala
```

## Windows

### MSYS2

MSYS2 provides a Linux-like environment for Windows. First install
[MSYS2](https://www.msys2.org), then install vala with the following
commands:

```shell
pacman -S mingw-w64-x86_64-gcc
pacman -S mingw-w64-x86_64-pkg-config
pacman -S mingw-w64-x86_64-vala
```

You also need to install all the libraries that you want to use
individually.

### Windows Subsystem for Windows (WSL)

Install a Linux distribution in WSL and then continue with the
[installation instructions for Linux](installation-guide#linux).

## Mac OS X

To install Vala on Mac OS X, you can use [brew](https://brew.sh), a package
manager for OS X:

```shell
brew install vala
```

## Verifying the Installation

If you installed everything correctly, if enter this line in your
terminal:

```shell
valac --version
```

A line like this should be printed in the terminal:

```shell
Vala x.xx.x
```

If you don't see any version number and instead see something like
along the lines of `The command 'valac' is not recognised` or any other
error, this means that Vala has not been installed correctly.

Please ensure that you've followed the installation instructions above
and try again.

If you are struggling to either:

-   Install Vala
-   Install the version of Vala that you require

[Try asking the community for help](https://vala.dev/#community).
