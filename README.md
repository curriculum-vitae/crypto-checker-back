Message structure

```
status
String
- pending. There are currently running checks in progress.
- resolved. All tests have been passed. Is sent with the last check.
- rejected. Fatal error occured.

type
String
- info. Check succeeded.
- error. Check failed.

title
String

decription
String

details
String
HTML data to display to the user.
```
