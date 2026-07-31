# 4.2. Delegates and Closures

Java: implement delegate pattern, use lambdas (Java 8+)

```java
public interface MyDelegateType {
    public void invoke(int a, double b);
}

public class Demo {
    private static void foo(MyDelegateType deleg) {
        deleg.invoke(32, 0.25);
    }

    public static void main(String[] args) {
        MyDelegateType deleg = (int a, double b) -> System.out.println("a = " + a + "; b = " + b);

        deleg.invoke(42, 0.75);
        foo(deleg);
    }
}
```

Vala: language support for delegates and closures

```vala
delegate void MyDelegateType (int a, double b);

void foo (MyDelegateType deleg) {
    deleg (32, 0.25);     // invoke delegate
}

void main () {
    MyDelegateType deleg = (a, b) => {
        stdout.printf ("a = %d; b = %g\n", a, b);
    };
    deleg (42, 0.75);     // invoke delegate
    foo (deleg);          // pass delegate to a method
}
```

Closures are anonymous methods that capture the variables of the outer scope. They can be assigned to delegate variables or be passed as delegate parameters to methods.

In Java closures can be simulated with anonymous inner classes or with Java 8+ lambdas can be used. However, anonymous inner classes can only capture `final` variables of the outer scope, whereas Vala closures can capture any variable.

You can assign methods directly to delegate variables:

```vala
delegate int MyDelegateType (int a, double b);

int add (int a, int b) {
    return a + b;
}

int sub (int a, int b) {
    return a - b;
}

void main () {
    MyDelegateType deleg = add;
    int sum = deleg (2, 3);
    deleg = sub;
    int diff = deleg (8, 4);
}
```

This means methods can be stored in variables and be passed around like objects.
