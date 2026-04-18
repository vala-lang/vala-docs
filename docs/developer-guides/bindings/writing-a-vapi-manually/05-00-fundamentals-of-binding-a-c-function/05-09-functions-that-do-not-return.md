# 5.9. Functions That Do Not Return

If a function never returns, the attribute `NoReturn` allows the
compiler's analyzer to know that no code executed after that statement
will ever be executed. This is rare but useful for statements which
call `abort` or `exit` underneath.
