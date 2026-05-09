# 8.1. From Swing to GTK+

## Simple GUI App

Java

```java
import javax.swing.*;

public class HelloWorldFrame extends JFrame {

    public HelloWorldFrame() {
        JLabel label = new JLabel("Hello World");
        add(label);
        setSize(100, 100);
    }

    public static void main(String args[]) {
        JFrame frame = new HelloWorldFrame();
        frame.setVisible(true);
    }
}
```

Vala

```vala
using Gtk;

public class HelloWorldWindow : Window {

    public HelloWorldWindow () {
        var label = new Label ("Hello World");
        add (label);
        set_default_size (100, 100);
    }
}

void main (string[] args) {
    Gtk.init (ref args);

    var win = new HelloWorldWindow ();
    win.show_all ();

    Gtk.main ();
}
```

Must be compiled with `--pkg gtk+-3.0`.

## Transition Table

Rough equivalents between common Swing types and GTK+ 3 widgets. See [Valadoc](https://valadoc.org/gtk+-3.0/index.htm) for full APIs.

| Swing | GTK+ |
| --- | --- |
| `JButton` | [`Button`](https://valadoc.org/gtk+-3.0/Gtk.Button.html) |
| `JCheckBox` | [`CheckButton`](https://valadoc.org/gtk+-3.0/Gtk.CheckButton.html) |
| `JColorChooser` | [`ColorSelection`](https://valadoc.org/gtk+-3.0/Gtk.ColorSelection.html) |
| `JComboBox` | [`ComboBox`](https://valadoc.org/gtk+-3.0/Gtk.ComboBox.html) |
| `JComponent` | [`Widget`](https://valadoc.org/gtk+-3.0/Gtk.Widget.html) |
| `JDialog` | [`Dialog`](https://valadoc.org/gtk+-3.0/Gtk.Dialog.html) |
| `JEditorPane` | [`TextView`](https://valadoc.org/gtk+-3.0/Gtk.TextView.html) |
| `JFileChooser` | [`FileChooserDialog`](https://valadoc.org/gtk+-3.0/Gtk.FileChooserDialog.html) |
| `JFrame` | [`Window`](https://valadoc.org/gtk+-3.0/Gtk.Window.html) |
| `JLabel` | [`Label`](https://valadoc.org/gtk+-3.0/Gtk.Label.html) |
| `JList` | [`TreeView`](https://valadoc.org/gtk+-3.0/Gtk.TreeView.html) with [`ListStore`](https://valadoc.org/gtk+-3.0/Gtk.ListStore.html) |
| `JMenu` | [`Menu`](https://valadoc.org/gtk+-3.0/Gtk.Menu.html) |
| `JMenuBar` | [`MenuBar`](https://valadoc.org/gtk+-3.0/Gtk.MenuBar.html) |
| `JOptionPane` | [`MessageDialog`](https://valadoc.org/gtk+-3.0/Gtk.MessageDialog.html) |
| `JPanel` | [`Container`](https://valadoc.org/gtk+-3.0/Gtk.Container.html) (depending on layout: [`Box`](https://valadoc.org/gtk+-3.0/Gtk.Box.html), [`Table`](https://valadoc.org/gtk+-3.0/Gtk.Table.html), [`Fixed`](https://valadoc.org/gtk+-3.0/Gtk.Fixed.html), …) |
| `JPasswordField` | [`Entry`](https://valadoc.org/gtk+-3.0/Gtk.Entry.html) with `visibility = false` |
| `JProgressBar` | [`ProgressBar`](https://valadoc.org/gtk+-3.0/Gtk.ProgressBar.html) |
| `JRadioButton` | [`RadioButton`](https://valadoc.org/gtk+-3.0/Gtk.RadioButton.html) |
| `JScrollPane` | [`ScrolledWindow`](https://valadoc.org/gtk+-3.0/Gtk.ScrolledWindow.html) |
| `JSeparator` | [`Separator`](https://valadoc.org/gtk+-3.0/Gtk.Separator.html) |
| `JSlider` | [`Scale`](https://valadoc.org/gtk+-3.0/Gtk.Scale.html) |
| `JSpinner` | [`SpinButton`](https://valadoc.org/gtk+-3.0/Gtk.SpinButton.html) |
| `JSplitPane` | [`Paned`](https://valadoc.org/gtk+-3.0/Gtk.Paned.html) |
| `JTabbedPane` | [`Notebook`](https://valadoc.org/gtk+-3.0/Gtk.Notebook.html) |
| `JTable` | [`TreeView`](https://valadoc.org/gtk+-3.0/Gtk.TreeView.html) with [`ListStore`](https://valadoc.org/gtk+-3.0/Gtk.ListStore.html) |
| `JTextArea` | [`TextView`](https://valadoc.org/gtk+-3.0/Gtk.TextView.html) |
| `JTextField` | [`Entry`](https://valadoc.org/gtk+-3.0/Gtk.Entry.html) |
| `JTextPane` | [`TextView`](https://valadoc.org/gtk+-3.0/Gtk.TextView.html) |
| `JToolBar` | [`Toolbar`](https://valadoc.org/gtk+-3.0/Gtk.Toolbar.html) |
| `JToolTip` | [`Tooltip`](https://valadoc.org/gtk+-3.0/Gtk.Tooltip.html) |
| `JTree` | [`TreeView`](https://valadoc.org/gtk+-3.0/Gtk.TreeView.html) with [`TreeStore`](https://valadoc.org/gtk+-3.0/Gtk.TreeStore.html) |
| `JViewport` | [`Viewport`](https://valadoc.org/gtk+-3.0/Gtk.Viewport.html) |
