Installation Guide
==================

Vala is available on multiple operating systems. Follow the installation instructions below for your operating system.

Linux
-----

Vala is available on a large variety of Linux distributions.
You can also install other development files for libraries to use with vala.

Fedora
~~~~~~

Development files usually come in ``*-devel`` packages, for example ``libgee-devel``.

.. code-block:: console

   $ sudo dnf install vala

Debian
~~~~~~

You need to install ``*-dev`` packages, to get development files on Debian.

.. code-block:: console

   $ sudo apt install valac

Arch Linux
~~~~~~~~~~

.. code-block:: console

   $ sudo pacman -S vala

ALT Linux
~~~~~~~~~

Development library packages are named as `lib*-devel`. Example: `libgee-devel`.

.. code-block:: console

   # apt-get install vala

\*BSD
-----

First you install the port:

.. code-block:: console

   $ cd /usr/ports/lang/vala/ && make install clean

And then you can add the package:

.. code-block:: console

   $ pkg install vala

Windows
-------

MSYS2
~~~~~

MSYS2 provides a Linux-like environment for Windows. First install `MSYS2 <https://www.msys2.org>`__,
then install vala with the following commands:

.. code-block:: console

   $ pacman -S mingw-w64-x86_64-gcc
   $ pacman -S mingw-w64-x86_64-pkg-config
   $ pacman -S mingw-w64-x86_64-vala

You also need to install all the libraries that you want to use individually.

Windows Subsystem for Windows (WSL)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install a Linux distribution in WSL and then continue with the :ref:`installation instructions for Linux <Linux>`.

Mac OS X
--------

To install Vala on you can use `brew <https://brew.sh>`__, a package manager for OS X:

.. code-block:: console

   $ brew install vala

Verifying the Installation
--------------------------

If you installed everyting correctly, if enter this line in your terminal:

.. code-block:: console

   $ valac --version

A line like this should be printed in the terminal:

.. code-block:: output

   Vala x.xx.x

If you don't see any version number and instead see something like along the lines of ``The command 'valac' is not recognised`` or any other error, this means that Vala has not been installed correctly.

Please ensure that you've followed the installation instructions above and try again.

If you are struggling to either:

- Install Vala
- Install the version of Vala that you require

`Try asking the community for help <https://vala.dev/#community>`_.
