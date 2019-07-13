# run-subdir

Node package for running command line asynchronously in all subdirectories.

## Installation

Using NPM:

``` shell
npm install -g run-subdir
```

## Usage

After installation and `cd` into your parent directory, prefix your command line by `rsd` or `run-subdir` to run the command in all child subdirectories.

Assume you have these files and directories:
```
~/test/
    dir1/
        .git/
    dir2/
        .git/
    dir3/
        .git/
    file.txt
```

When you run:

``` shell
cd ~/test/
rsd git status
```

or:

``` shell
cd ~/test/
run-subdir git status
```

It will run the given command `git status` in all subdirectories of `~/test/`, in each one of: `dir1`, `dir2`, `dir3`.

Which will output:

![screenshot](https://i.imgur.com/qXyQr2f.png?1)

# License

MIT

# Credits

This project is forked from [@tatsuyaoiw](https://github.com/tatsuyaoiw)'s project [git-pull-all](https://github.com/tatsuyaoiw/git-pull-all).

