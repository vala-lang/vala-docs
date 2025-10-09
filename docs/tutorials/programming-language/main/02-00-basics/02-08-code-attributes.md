# 2.8. Code Attributes

Code attributes instruct the Vala compiler details about how the code is supposed to work on the target platform. 
They are mostly used for bindings in *vapi* files.

The most prominent example is the `[CCode (...)]` attribute:

```vala
[CCode (cname = "SDL_PropertiesID", has_type_id = false)]
public struct PropertiesID : uint32 {}
```

Another common example is the `[DBus (...)]` attribute, which is used for exporting remote interfaces via 
[D-Bus](http://www.freedesktop.org/wiki/Software/dbus):

```vala
[DBus (name = "net.example")]
public interface Header.Example {
    // ...
}
```

Here are some examples of the syntax:

```vala
[AttributeName]
class Example {
    // ...
}

[AttributeName, AnotherAttributeName]
var number = 1;

[AttributeName, AnotherAttributeName (name = "value"), YetAnotherAttributeName]
var str = "string";

[AttributeName (name = "value"), AnotherAttributeName]
var character = 'c';

[AttributeName]
[AttributeName (name = "value")]
var boolean = true;

[AttributeName (name = "value", anotherName = 1, thirdName = false)]
int integer = 1;
```

You can use as many attributes and arguments in the attributes as you want.