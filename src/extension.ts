import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const provider = new CopyWithPromptViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "copyWithPrompt.copyWithPromptView", 
      provider
    )
  );
}

export function deactivate() {
  // 特に何もしない場合は空でOK
}

class CopyWithPromptViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly extensionUri: vscode.Uri) {
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    webviewView.webview.options = {
      enableScripts: true, // スクリプトを有効にする
    };

    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case 'copyWithPrompt':
          await this.handleCopyWithPrompt(message.prompt);
          break;
      }
    });
  }

  private getHtmlForWebview(webview: vscode.Webview): string {
    return /* html */ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
        <div style="display: flex; flex-direction: column; gap: 10px">
          <div>
             <label for="promptInput">Prompt:</label>
          </div>
          <div>
             <textarea id="promptInput" style="width: 100%; height: 10em"></textarea>
          </div>
          <div>
             <button id="copyButton" style="width: 100%; padding: 5px">Copy</button>
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

  private async handleCopyWithPrompt(prompt: string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No editor is not open.");
      return;
    }

    const documentText = editor.document.getText();

    const copiedText = `${prompt}\n\n\`\`\`\n${documentText}\n\`\`\``;

    await vscode.env.clipboard.writeText(copiedText);

    vscode.window.showInformationMessage("Copied!");
  }
}
