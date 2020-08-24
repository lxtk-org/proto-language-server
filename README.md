# Proto Language Server

A bare-bones implementation of a language server in Node.js. Ready to fork
for your own experiments.

## Functionality

This language server can work with arbitrary text files and implements the
following capabilities of the [Language Server Protocol][1] (LSP) out-of-the-box:

- [Completion][2]. Provides completion items `Language`, `Server`, `Protocol`
irrespective of the current document position.

- [Diagnostics][3]. Checks that the acronym `LSP` is spelled in the correct case
and reports violations as warnings.

## Installing

    $ git clone https://github.com/lxtk-org/proto-language-server
    $ cd proto-language-server/
    $ npm install
    $ npm run build
    $ npm link

## Launching

    $ npx proto-language-server --stdio

## Launching in Debug Mode

    $ npx --node-arg=--nolazy --node-arg=--inspect=6009 proto-language-server --stdio

[1]: https://microsoft.github.io/language-server-protocol/specification
[2]: https://microsoft.github.io/language-server-protocol/specification#textDocument_completion
[3]: https://microsoft.github.io/language-server-protocol/specification#textDocument_publishDiagnostics
