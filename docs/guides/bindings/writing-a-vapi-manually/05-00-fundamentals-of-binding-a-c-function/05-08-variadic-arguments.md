# 5.8. Variadic Arguments (a.k.a. "...")

C variadic argument system is treacherous and includes lots of potential
ways to break. Vala, unfortunately, inherits them. Vala adds a few
safeties, but also introduced some new problems.

One safety put in place is that if the method's `CCode` attribute
includes `sentinel = "X"`, then X will always be appended as the last
parameter. Since lists are often terminated by a special value, usually
null, this can prevent variadic argument overruns.

Additionally, Vala can do type checking on `printf`-like and
`scanf`-like function by adding the `PrintfFunction` or `ScanfFunction`
attributes. However, if the format strings have been modified to include
special values, these formatting tokens will not work as intended.

Return values that append to the end of a function, such as array length
returns, and delegate contexts, will often interact badly with variadic
arguments, since the Vala compiler will erroneously place the parameter
after the "..." in the definition. When dealing with variadic
functions, it is best to specify all positions explicitly.
