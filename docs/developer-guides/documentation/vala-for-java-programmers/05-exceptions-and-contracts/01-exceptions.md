# 5.1. Exceptions

Java: class-based exceptions

```java
public class TemperatureException extends Exception {
}
```

```java
public class TooColdException extends TemperatureException {
}
```

```java
public class TooHotException extends TemperatureException {
}
```

```java
public class ExceptionDemo {
    private void method() throws TemperatureException {
        throw new TooColdException("It's too cold!");
    }

    public static void main(String[] args) {
        try {
            method();
        } catch (TemperatureException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

Vala: exceptions are called errors, not class-based, no wrapping

```vala
// error domain with multiple error codes instead of exception classes
errordomain TemperatureError {
    TOO_HOT,
    TOO_COLD
}

void method () throws TemperatureError {
    // error domain, error code, error message
    throw new TemperatureError.TOO_COLD ("It's too cold!");
}

// must be caught or propagated, compiler warning if ignored
try {
    method ();
} catch (TemperatureError e) {
    stderr.printf ("Error: %s\n", e.message);
}
```

Although the compiler emits warnings for ignored errors it does not abort the compilation process. This allows prototyping without proper error handling and will hopefully prevent forgotten empty catch blocks.

You can check the error code with `is`:

```vala
    if (e is TemperatureError.TOO_COLD) {
        // ...
    }
```
