Installation
============

Vala is available on multiple operating systems. Follow the isntallation instructions below for your operating system.

.. _linux:

Linux
-----

Vala is available on a large variety of Linux distributions.
Mostly you want to install other development files for libraries, that you want to use with vala.

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
then vala:

.. code-block:: console

   $ pacman -S mingw-w64-x86_64-gcc
   $ pacman -S mingw-w64-x86_64-pkg-config
   $ pacman -S mingw-w64-x86_64-vala

You also need to install all libraries you want to use individually.

Windows Subsystem for Windows (WSL)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install a Linux distribution in WSL and then go on with the :ref:`installation instructions for Linux <linux>`.

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

.. warning::

   The minimum required Vala version for this tutorial is 0.56.0. You must have this version (or a higher version number) of Vala installed after following the instructions below

   If not, we can't guarantee that anything we've explained in this tutorial will work on your system.

If you are struggling to either:

- Install Vala
- Meet the minimum required Vala version requirement 

`Try asking the community for help <https://vala.dev/#community>`_.
