const vscode = require('vscode');

/**
 * 設定管理器：負責讀取與管理擴充功能設定。
 *
 * 本 fork 是簡體中文專項版，只有一種目標語言，因此沒有 language 設定、
 * 也沒有語言偵測——需要語言的兩處（載入哪份規則檔、顯示哪份文案）都直接用常數。
 */
class ConfigManager {
    constructor() {
        this.configPrefix = 'claudeCodeZh';
    }

    /** 取得單一設定項 */
    get(key) {
        const config = vscode.workspace.getConfiguration(this.configPrefix);
        return config.get(key);
    }

    /** 設定單一設定項 */
    async set(key, value, global = true) {
        const config = vscode.workspace.getConfiguration(this.configPrefix);
        await config.update(
            key,
            value,
            global ? vscode.ConfigurationTarget.Global : vscode.ConfigurationTarget.Workspace
        );
    }

    /** 取得全部設定 */
    getAll() {
        const config = vscode.workspace.getConfiguration(this.configPrefix);
        return {
            autoApplyOnStartup: config.get('autoApplyOnStartup'),
            autoApplyOnUpdate: config.get('autoApplyOnUpdate'),
            preTranslationRules: config.get('preTranslationRules'),
            postTranslationRules: config.get('postTranslationRules'),
            createBackup: config.get('createBackup'),
            showNotifications: config.get('showNotifications'),
            showStatusBar: config.get('showStatusBar'),
            claudeCodeExtensionId: config.get('claudeCodeExtensionId'),
            scanOnUpdate: config.get('scanOnUpdate')
        };
    }

    /** 監聽設定變更 */
    onDidChange(callback) {
        return vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration(this.configPrefix)) {
                callback(this.getAll(), event);
            }
        });
    }
}

module.exports = ConfigManager;
