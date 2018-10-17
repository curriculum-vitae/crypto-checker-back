Message structure

```
status
- pending. There are currently running checks in progress.
- resolved. All tests have been passed. Is sent with the last check.
- rejected. Fatal error occured.

type
- info. Check succeeded.
- error. Check failed.

title

decription

details
```
