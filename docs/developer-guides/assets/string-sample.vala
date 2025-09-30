void println (string str) {
    stdout.printf ("%s\n", str);
}

void main () {

    /* Strings are of data type 'string' and can be concatenated with the plus
     * operator resulting in a new string:
     */
    string a = "Concatenated ";
    string b = "string";
    string c = a + b;
    println (c);

    /* If you want to have a mutable string you should use StringBuilder.
     * With its help you are able to build strings ad libitum by prepending,
     * appending, inserting or removing parts. It's faster than multiple
     * concatenations. In order to obtain the final product you access the
     * field '.str'.
     */
    var builder = new StringBuilder ();
    builder.append ("built ");
    builder.prepend ("String ");
    builder.append ("StringBuilder");
    builder.append_unichar ('.');
    builder.insert (13, "by ");
    println (builder.str); // => "String built by StringBuilder."

    /* You can create a new string according to a format string by calling the
     * method 'printf' on it. Format strings follow the usual rules, known from
     * C and similar programming languages.
     */
    string formatted = "PI %s equals %g.".printf ("approximately", Math.PI);
    println (formatted);

    /* Strings prefixed with '@' are string templates. They can evaluate
     * embedded variables and expressions prefixed with '$'.
     * Since Vala 0.7.8.
     */
    string name = "Dave";
    println (@"Good morning, $name!");
    println (@"4 + 3 = $(4 + 3)");

    /* The equality operator compares the content of two strings, contrary to
     * Java's behaviour which in this case would check for referential equality.
     */
    a = "foo";
    b = "foo";
    if (a == b) {
        println ("String == operator compares content, not reference.");
    } else {
        assert_not_reached ();
    }

    /* You can compare strings in lexicographical order with the < and > operators: */
    if ("blue" < "red" && "orange" > "green") {
        println ("blue is less than red and orange is greater than green");
    }

    // Switch statement
    string pl = "vala";
    switch (pl) {
    case "java":
        assert_not_reached ();
    case "vala":
        println ("Switch statement works fine with strings.");
        break;
    case "ruby":
        assert_not_reached ();
    }

    /* You can apply various operations on strings. Here's a small selection: */
    println ("from lower case to upper case".up ());
    println ("reversed string".reverse ());
    println ("...substring...".substring (3, 9));

    /* The 'in' keyword is syntactic sugar for checking if one string contains
     * another string. The following expression is identical to
     * "swordfish".contains ("word")
     */
    if ("word" in "swordfish") {
        println ("word is a part of swordfish");
    }

    // Regular expressions
    try {
        var regex = new Regex ("(jaguar|tiger|leopard)");
        string animals = "wolf, tiger, eagle, jaguar, leopard, bear";
        println (regex.replace (animals, -1, 0, "kitty"));
    } catch (RegexError e) {
        warning ("%s", e.message);
    }
}
