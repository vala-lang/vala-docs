# 4.3. Notification

Java: listeners (implement observer pattern)

```java
public interface ClickListener {
    public void clicked(Clickable source);
}
```

```java
public interface Clickable {
    public void addClickListener(ClickListener l);
    public void removeClickListener(ClickListener l);
}
```

```java
public class MyButton implements Clickable {
    private List<ClickListener> clickListeners;

    public MyButton() {
        this.clickListeners = new ArrayList<ClickListener>();
    }

    private void fireClickListeners() {
        for (ClickListener listener : this.clickListeners) {
            listener.clicked(this);
        }
    }

    public void addClickListener(ClickListener l) {
        if (l != null) {
            this.clickListeners.add(l);
        }
    }

    public void removeClickListener(ClickListener l) {
        if (l != null) {
            this.clickListeners.remove(l);
        }
    }

    public void test() {
        fireClickListeners();    // fire listeners
    }
}
```

```java
public class Demo {

    private class MyClickListener implements ClickListener {
        public void clicked(Clickable s) {
            System.out.println("handler C");
        }
    }

    public static void main(String[] args) {
        MyButton b = new MyButton();
        b.addClickListener(new ClickListener() {
            public void clicked(Clickable s) {
                System.out.println("handler A");
            }
        });
        b.addClickListener(new ClickListener() {
            public void clicked(Clickable s) {
                System.out.println("handler B");
            }
        });
        MyClickListener handlerC = new MyClickListener();
        b.addClickListener(handlerC);
        b.test();
        b.removeClickListener(handlerC);
    }
}
```

Vala: signals (`signal` keyword, `.connect()` and `.disconnect()`)

```vala
public class MyButton : Object {

    public signal void clicked ();

    public void test () {
        clicked ();          // emit signal
    }
}

void handler_c (MyButton source) {
    stdout.printf ("handler C\n");
}

void main () {
    var b = new MyButton ();
    b.clicked.connect ((s) => stdout.printf ("handler A\n"));
    b.clicked.connect ((s) => {
        stdout.printf ("handler B\n");
    });
    b.clicked.connect (handler_c);
    b.test ();
    b.clicked.disconnect (handler_c);
}
```
