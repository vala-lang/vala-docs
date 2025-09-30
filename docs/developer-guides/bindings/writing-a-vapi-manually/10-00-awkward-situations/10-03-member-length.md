# 10.3. Member Length

When dealing with raw-ish memory access, there is a common pattern to
have:

```c
void foo(void *data, size_t size, size_t nmemb);
```

in these cases, it is generally best to simply fix the type of data to
`uint8` and use the right size as a default parameter:

```vala
public void foo([CCode (array_length_pos = 2.1)] uint8[] data, size_t size = 1);
```
