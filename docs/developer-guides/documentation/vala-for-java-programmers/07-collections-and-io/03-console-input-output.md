# 7.3. Console Input / Output

Java

```java
System.out.println("Hi!");
System.out.print("Please enter your name: ");
String name = System.console().readLine();
System.out.format("Welcome, %s!\n", name);

Scanner stdin = new Scanner(System.in);
System.out.print("Enter a string, a double, a float, and an int: ");
String s = stdin.next();
double d = stdin.nextDouble();
float f = stdin.nextFloat();
int i = stdin.nextInt();

System.out.println("You entered the following:");
System.out.println("String : " + s);
System.out.println("double : " + d);
System.out.println("float  : " + f);
System.out.println("int    : " + i);
```

Vala

```vala
stdout.printf ("Hi!\n");
stdout.printf ("Please enter your name: ");
var name = stdin.read_line ();
stdout.printf ("Welcome, %s!\n", name);

string s;
double d;
float f;
int i;
stdout.printf ("Enter a string, a double, a float, and an int: ");
stdin.scanf ("%s", out s);
stdin.scanf ("%lf", out d);
stdin.scanf ("%f", out f);
stdin.scanf ("%d", out i);

stdout.printf ("You entered the following:\n");
stdout.printf ("string : %s\n", s);
stdout.printf ("double : %lf\n", d);
stdout.printf ("float  : %f\n", f);
stdout.printf ("int    : %d\n", i);
```
