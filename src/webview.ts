import * as vscode from 'vscode';

export function getHtmlForWebview(webview: vscode.Webview): string {
  return /* html */ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        :root {
          --container-padding: 20px;
          --input-padding-vertical: 6px;
          --input-padding-horizontal: 4px;
        }

        body {
          padding: 0 var(--container-padding);
          color: var(--vscode-foreground);
          font-size: var(--vscode-font-size);
          font-weight: var(--vscode-font-weight);
          font-family: var(--vscode-font-family);
          background-color: var(--vscode-editor-background);
        }

        .container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: var(--container-padding);
        }

        .label {
          display: block;
          margin-bottom: 5px;
          color: var(--vscode-foreground);
        }

        textarea {
          width: 100%;
          height: 10em;
          resize: vertical;
          padding: var(--input-padding-vertical) var(--input-padding-horizontal);
          border: 1px solid var(--vscode-input-border);
          background-color: var(--vscode-input-background);
          color: var(--vscode-input-foreground);
          font-family: var(--vscode-font-family);
          font-size: var(--vscode-font-size);
        }

        textarea:focus {
          outline: 1px solid var(--vscode-focusBorder);
        }

        button {
          width: 100%;
          padding: var(--input-padding-vertical) var(--input-padding-horizontal);
          border: none;
          text-align: center;
          outline: 1px solid transparent;
          color: var(--vscode-button-foreground);
          background: var(--vscode-button-background);
          font-family: var(--vscode-font-family);
          font-size: var(--vscode-font-size);
          cursor: pointer;
        }

        button:hover {
          background: var(--vscode-button-hoverBackground);
        }

        button:focus {
          outline: 1px solid var(--vscode-focusBorder);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div>
           <label class="label" for="promptInput">Prompt:</label>
        </div>
        <div>
           <textarea id="promptInput"></textarea>
        </div>
        <div>
           <button id="copyButton">Copy</button>
        </div>
      </div>

      <script>
        const vscode = acquireVsCodeApi();

        document.getElementById('copyButton').addEventListener('click', () => {
          const promptValue = document.getElementById('promptInput').value;
          vscode.postMessage({
            command: 'copyWithPrompt',
            prompt: promptValue
          });
        });
      </script>
    </body>
    </html>
  `;
}