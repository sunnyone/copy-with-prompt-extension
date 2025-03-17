import * as vscode from 'vscode';
import { getHtmlForWebview } from './webview';

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

    webviewView.webview.html = getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case 'copyWithPrompt':
          await this.handleCopyWithPrompt(message.prompt);
          break;
      }
    });
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
