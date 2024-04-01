# Vala Documentation

This is the source code repository for the Vala Documentation website.

You can view the website online here: https://colinkiama.github.io/vala-docs/

## Requirements

- python3
- pip (for Python 3)

You'll also need to install Sphinx and other dependencies listed in the `requirements.txt` file:

```sh
pip install --user --upgrade -r requirements.txt
```

## Getting started

1. Build the website with:

```sh
./build-docs
```

Note: You may need to make the `./build-docs` script executable first:

```sh
chmod +x ./build-docs
```

or if you are using GNOME builder, you can click on the "Build" button.

2. In the `build` directory, open a html file in your favourite web browser. `index.html` contains the home page.

3. Whenever you want to rebuild the site with changes you make in `source`, repeat step 1.

## References

- [Sphinx Documentation](https://www.sphinx-doc.org/en/master/contents.html)
- [Furo Theme](https://github.com/pradyunsg/furo)
- [reStructuredText (The format that this tutorial is written in.)](https://www.writethedocs.org/guide/writing/reStructuredText/)
- [Google Technical Writing Resources](https://developers.google.com/tech-writing)
