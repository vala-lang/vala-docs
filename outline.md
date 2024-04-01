# Outline

Important note: 
- Feel free to take inspiration from existing vala programs for the example code project tasks.
- Make sure that a clear, active voice is used thought the tutorial.

## Table of contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Hello World Program](#hello-world-program)
    - [Basic Debugging](#basic-debugging)
- [Data Types and Control Structures](#data-types-and-control-structures)
    - [Intro to numbers](#intro-to-numbers)
    - [Booleans and if-statements](#booleans-and-if-statements)
    - [Enums and Switch Statements](#enums-and-switch-statements)
    - [Namespaces (Reveal that the data types used so far are from GLib)](#namespaces)
    - [Loops](#loops)
- [Arrays](#arrays)
- [Parrot Program](#parrot-program)
- Methods (Introduce asynchronous methods here and variable-length argument lists here too.)
- Collections
- Error Handling
- Object-Oriented Programming (Introduce methods with syntax support here too)
- Libraries and Build Systems (Valadoc, Valadoc's documentation syntax, Valadoc.org, documentation generation and Meson are introduced here too)
- Debugging and Testing (Expand on the Debugging section in the old wiki tutorial for now)
- Multithreading
- D-Bus
- Memory Management
- Profiles
- Coding Styles (You could also mention vala-lint here too.)
- Community
- Epilogue (Congratulate student and point the to further resources. Where could they go next?)

## Introduction

### Why Vala?

* (Explain the language's strengths and incentives for people to learn the language. Start off with brief quotes of Jurg explaining what Vala is in his original first release email then, talk about what the language is like and for today in more detail).

## Getting Started

### Installation

#### Windows Instructions

(These can be copied from the the documentation guide)

#### macOS Instructions

(These can be copied from the the documentation guide)

#### Linux Instructions

(These can be copied from the the documentation guide)

#### Verifying the Installation

- Vala compiler install troubleshooting 
    - Calling compiler with version flag should show a version number
- Explain that the code and features in this tutorial are what was present in Vala 0.56. Code from earlier versions may work but aren't guaranteed to.

### Hello World Program

- Tell student to copy this a “Hello, World” print statement, inside a static void main block, to their code editor
- Make them compile the code
- Verify with them, the output “Hello, World”
- Break down the program, giving them a chance to learn the language’s syntax
- Bonus step: Tell the student to run the compile again but with the "compile to C code" flag. Mention that this is C code that Vala generates before it gets compiled to a program binary.

### Basic Debugging (Continues from Hello World Program)

- Now make the student do a syntax error on purpose e.g print ("Hello" World).
- Teach them briefly about errors by explaining the compiler error that showed up
- Explain how to fix the error
- Make them fix the error
- Now ask them to update the string so that it greets them e.g "Hello Colin"
- Introduce comments (Just the single line ones for now)
- Make student add comment above print statement that describes what it does.
- Congratulate students
- Chapter Recap.

## Data Types and Control Structures

### Variables

- Introduce concept of a variable
    - Data Type
    - Identifier
    - Value
- Explain reasons for using variables

### Intro to numbers

- Make student set an integer (Note: you also explain a bit of string formatting here as you need to to use variable arguments and the new line character escape)
- Print the integer
- Make students copy and paste math expressions and then print them (introduce them to arithmetic operators)
- Make students print their own math expression

### Booleans and if-statements

- Start with a light bulb analogy
- Now go on to how we can represent one-off states in computers using Booleans (true, false)
- Print a few Boolean variables
- Introduce conditional operators (&&, ||, !)
- Student executes example code that print showcases how the operators behave
- Introduce if-statement (for performing an action based on a boolean value)
- Introduce if-else statements
- Introduce if-else-if statements
- Introduce if-else-if-else statements (this isn't a typo)

### Enums and Switch Statements

- Start with an example full of an excessive number of ``else-if`` statements.
- Introduce switch statements with one of the key benefits of being much more flexible than ``if-statements``. (Perform an action based on the value of string for this example)
- Introduce enums
- Showcase how switch statements and enums work well together
- Show off case-collapse feature (How a set of values can run the same logic). 

### Loops

- Introduce loops
    - While loop
    - Do while loop
    - For loop

## Arrays

Use the GNOME Wiki for info on arrays.

- Introduce arrays
- Go over array syntax
- Array Slices
- Array methods
- Array bounds (talk about fixed size arrays being allocation on stack and the fact that Vala does not do bounds checking for array access at runtime. Show a potential array error that could happen).

## Parrot Program

- Introduce input/output streams
- Student creates program that reads entered phrase then outputs it.
- Phrase be printed on each loop. (Example will use the phrase: "Learn Vala, do future")
- Make students that prints the entered phrase multiple times
- Introduce input and output streams (regarding console input and output)
- Make students enter a phrase in the program then store it in a variable (make them print it to see)
- Very briefly introduce arrays for now. (Arrays need to be added to the previous chapter of the tutorial).
- Make the student copy a line that contains a string array of Parrot names
- Make student modify the loop to print the following using printf formatting "{parrot\_name} says: Learn Vala, Do Future" by looping through array indexes
- Lastly, make them refactor it by using a foreach loop (the last loop they weren't taught). Explain that because we are always going to go through the whole list and we aren't doing anything unique based on the current position of each name on the list, foreach makes more sense here.
- Briefly explain the concept of refactoring and the fact that because they changed the loop they've used, now there are many variables they don't need anymore
- Make students remove those unused variables.
- Make students verify that the program still works
- Congrats!


## Methods

- Remind reader that they've been using methods for a while now - creating the main method and calling the print method (which will be revealed as GLib.print in the Object-oriented programming chapter)
- Explain what a method is
- Walk through the creation of a method and calling the method from
- Add a note that technically these are functions because they aren't part of an instance of a class but in Vala we call functions "methods" anyway.
- Go into detail about the main entry method and the different ways it can be called and used.