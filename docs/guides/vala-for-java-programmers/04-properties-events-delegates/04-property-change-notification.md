# 4.4. Property Change Notification

Java

```java
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;

public class DemoBean {

    private final PropertyChangeSupport pcs = new PropertyChangeSupport(this);
    private String title;

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        String old = this.title;
        this.title = title;
        this.pcs.firePropertyChange("title", old, title);
    }

    public void addPropertyChangeListener(PropertyChangeListener listener) {
        this.pcs.addPropertyChangeListener(listener);
    }

    public void removePropertyChangeListener(PropertyChangeListener listener) {
        this.pcs.removePropertyChangeListener(listener);
    }

    public static void main(String[] args) {
        DemoBean demo = new DemoBean();
        demo.addPropertyChangeListener(new PropertyChangeListener() {
            public void propertyChange(PropertyChangeEvent evt) {
                System.out.println("Property " + evt.getPropertyName() + " changed");
            }
        });
        demo.setTitle("hello");
        demo.setTitle("world");
    }
}
```

Vala: Subclasses of `Object` have a `notify` signal

```vala
public class Demo : Object {
    public string title { get; set; }
}

void main () {
    var demo = new Demo ();
    demo.notify.connect ((s, p) => stdout.printf ("Property %s changed\n", p.name));
    demo.title = "hello";
    demo.title = "world";
}
```

However, you can't get the old value.

If you're only interested in change notifications of a single property you can use this syntax:

```vala
demo.notify["title"].connect ((s, p) => stdout.printf ("title changed\n"));
```

Change notifications can be disabled with a `CCode` attribute tag immediately before the declaration of the property:

```vala
class MyObject : Object {

    // notify signal is NOT emitted upon changes in the property
    [CCode (notify = false)]
    public int without_notification { get; set; }

    // notify signal is emitted upon changes in the property
    public int with_notification { get; set; }
}
```
