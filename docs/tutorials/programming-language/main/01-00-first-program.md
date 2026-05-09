# 1. First Program

## 1.1. Your First Program

Sadly predictable, but still:

```vala
void main () {
    print ("Hello, World\n");
}
```

Of course, that is a Vala *Hello World* program. I expect you can recognise some parts of it well enough, but just to be thorough I shall go through it step by step.

```vala
void main () {
}
```

This is the start of a method definition. A method is a function related to a type of object that can be executed on an object of that type. The fact that this method is called `main` and has the signature it does means that Vala will recognise it as the entry point for the program. `void` is the return type of the method, which means that the method does not return any value.

```vala
void main () {
    print ("Hello, World\n");
}
```

This line calls `print ()`, a built-in that writes a string to standard output. The `"Hello..."` argument is a string literal; `\n` is the escape sequence for a new line.

In some real-word projects people prefer `stdout.printf ()` instead: it works like C’s `printf`, supports format strings and multiple arguments. You will see both styles in this tutorial; for details see [2.9. Input / Output](02-00-basics/02-09-input-output).  

## Main Method Variants

There are several ways to write a `main` method in Vala. The following are all valid.

The examples above use `print ()` to keep the first program small. When you need formatted output or want to match common library style, use `stdout.printf ()` as in [2.9. Input / Output](02-00-basics/02-09-input-output).

```vala
void main () {
}

int main () {
    return 0;
}

int main (string[] args) {
    return 0;
}

void main (string[] args) {
}

```

It is possible to declare a `main` method inside a class only if it is `public` and `static`.
`int` is the return type of the main method, which means that the method returns an integer value. The integer value returned by the main method is the exit status of the program. The exit status is a value returned by a program to the operating system. The operating system can then use this value to determine whether the program executed successfully or not. A return value of 0 indicates that the program executed successfully, while a non-zero value indicates that the program did not execute successfully.

`string[] args` is an array of strings that are passed to the program when it is executed. The first element of the array is the name of the program itself. The remaining elements are any arguments that are passed to the program when it is executed. The arguments are separated by spaces. For example, if you execute the program with the command `./hello arg1 arg2`, then the array will contain the following elements:



```vala
public class Main {
    public static void main (string[] args) {
        //...
    }
}

```

## 1.2. Compile and Run

Assuming you have Vala installed, then all it takes to compile and
execute this program is:

```shell
valac hello.vala
./hello
```

`valac` is the Vala compiler, which will compile your Vala code into a
binary. The resulting binary will have the same name as the source file
and can then be directly executed on the machine. You can probably guess
the output.

If you get some warnings from a C language compiler, please jump to
[valac](07-00-tools/07-01-valac) for the reason
and solution.

## 1.3. Running as a Script

On Unix-like operating systems, you can also run a Vala source file directly as a script. 
This is achieved by adding a 'shebang' line at the very beginning of the file. 
For example, you could save the "Hello, World" program as `hello.vala` with the following content:

```vala{1}
#!/usr/bin/env vala
void main () {
    print ("Hello, World\n");
}
```
The first line, `#!/usr/bin/env vala`, is the shebang. It tells the system to use the `vala` command to execute this file.

Before running it, you need to grant the file executable permissions:

```shell
chmod +x hello.vala
```

Now you can run it directly from your terminal:

```shell
./hello.vala
```

This will produce the same "Hello, World" output. Behind the scenes, the system invokes the Vala compiler to compile the source code into a temporary binary file, and then executes that binary.

Simpler console-oriented Hello World and related snippets: [Basic Samples](../../../sample-code/language-features-and-introductory-samples/basic-samples).
