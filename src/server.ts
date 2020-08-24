#!/usr/bin/env node
/******************************************************************************
 * Copyright (c) 2020 1C-Soft LLC and others.
 * Licensed under the MIT License.
 * SPDX-License-Identifier: MIT
 ******************************************************************************/

import { createConnection, TextDocuments } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import * as lsp from 'vscode-languageserver-protocol';

// Create a connection based on the command line arguments for the server
let connection = createConnection();

// Create a text document manager
let documents = new TextDocuments(TextDocument);

connection.onInitialize(_params => {
    return {
        capabilities: {
            textDocumentSync: lsp.TextDocumentSyncKind.Incremental,
            completionProvider: {
            }
        }
    };
});

documents.onDidChangeContent(e => {
    validate(e.document);
});

async function validate(document: TextDocument) {
    // Create diagnostics for incorrect spellings of 'LSP'
    let diagnostics: lsp.Diagnostic[] = [];
    let text = document.getText();
    let pattern = /\b[l,L][s,S][p,P]\b/g;
    let match;
    while (match = pattern.exec(text)) {
        if (match[0] !== 'LSP') {
            diagnostics.push({
                severity: lsp.DiagnosticSeverity.Warning,
                range: {
                    start: document.positionAt(match.index),
                    end: document.positionAt(match.index + 3)
                },
                message: `'${match[0]}' should be spelled 'LSP'`
            });
        }
    }
    connection.sendDiagnostics({ uri: document.uri, diagnostics });
}

documents.onDidClose(e => {
    connection.sendDiagnostics({ uri: e.document.uri, diagnostics: [] });
});

connection.onCompletion(_params => [
    {
        label: 'Language',
        kind: lsp.CompletionItemKind.Text,
        sortText: '1'
    },
    {
        label: 'Server',
        kind: lsp.CompletionItemKind.Text,
        sortText: '2'
    },
    {
        label: 'Protocol',
        kind: lsp.CompletionItemKind.Text,
        sortText: '3'
    }
]);

// Make the text document manager listen on the connection
// for open, change, and close text document events
documents.listen(connection);

// Start listening on the input stream for messages to process
connection.listen();
