/**
 * 本擴充功能自身介面（狀態列、選單、通知、輸出訊息）的字串。
 *
 * 本 fork 是簡體中文專項版：只有一套文案、一種語言，沒有繁體與語言切換。
 */

/** 本擴充功能唯一的目標語言 */
const LOCALE = 'zh-CN';
/** 顯示名稱 */
const LANGUAGE_LABEL = '简体中文';

/**
 * 翻譯是否已套用的偵測標記：只要 index.js 內含以下任一字串，即視為已套用簡體翻譯。
 * 這幾條都是翻譯包裡必定會出現的文案，取自穩定的高頻條目。
 */
const MARKERS = ['编辑前询问', '提供反馈', '规划模式'];
const ALL_MARKERS = MARKERS;

const STRINGS = {
    // 狀態列
    sbNotFound: '$(globe) 中文化 $(warning)',
    sbTranslated: '$(globe) 简体中文 $(check)',
    sbUntranslated: '$(globe) 中文化 $(circle-outline)',
    sbStale: '$(globe) 待重载界面 $(alert)',
    // 狀態列提示（Markdown）
    ttTitle: '### 🌏 Claude Code 简体中文化\n\n',
    ttStateTranslated: '- 当前状态：**已应用简体中文** ✅\n',
    ttStateOriginal: '- 当前状态：**官方原版** ⚪\n',
    ttStateStale: '- 当前状态：**已应用，但界面尚未重载** ⚠️\n',
    ttLanguage: lang => `- 当前语言：\`${lang}\`\n`,
    ttVersion: v => `- Claude Code 版本：\`${v || '未知'}\`\n`,
    ttCount: n => `- 内置翻译：\`${n}\` 条\n\n`,
    ttClickHint: '$(list-unordered) 点击打开快速命令菜单',
    // 快速選單
    menuTitle: '🌏 Claude Code 简体中文化',
    menuStateTranslated: '$(check) 当前状态：已应用简体中文 ✅',
    menuStateOriginal: '$(circle-outline) 当前状态：官方原版 ⚪',
    menuStateNotFound: '$(warning) 找不到 Claude Code',
    menuPlaceholderSuffix: '　—　请选择要执行的操作',
    menuApplyLabel: '$(globe) 应用简体中文化',
    menuApplyDesc: '🌏 将 Claude Code 界面翻译成简体中文',
    menuReloadLabel: '$(sync) 重新应用翻译',
    menuReloadDesc: '♻️ 先还原成原版再重新应用（更新后或翻译异常时使用）',
    menuReloadUiLabel: '$(refresh) 重载 Claude 界面',
    menuReloadUiDesc: '🈶 重新应用并就地重载界面——Claude 界面已经加载时，改动要重载才看得到',
    menuRestoreLabel: '$(discard) 还原官方原版',
    menuRestoreDesc: '⏪ 恢复成未翻译的英文原版',
    menuScanLabel: '$(telescope) 扫描未翻译字符串',
    menuScanDesc: '🔍 找出当前版本尚未翻译的界面字符串',
    menuViewListLabel: '$(output) 查看未翻译列表',
    menuViewListDesc: '📋 显示上次扫描的未翻译列表（不重新扫描）',
    menuGotoLabel: '$(go-to-file) 跳转到未翻译字符串…',
    menuGotoDesc: '🧭 在 index.js 中定位并打开某个未翻译字符串',
    menuPaletteLabel: '$(search) 打开命令面板…',
    menuPaletteDesc: '🔎 等同 Ctrl+Shift+P，快速执行所有命令',
    menuConfigLabel: '$(gear) 打开设置',
    menuConfigDesc: '⚙️ 调整自动应用、通知、自定义翻译规则等',
    menuStatusLabel: '$(info) 查看状态／说明',
    menuStatusDesc: 'ℹ️ 显示版本、翻译条数与文件位置',
    menuReloadWindowLabel: '$(refresh) 重新加载窗口',
    menuReloadWindowDesc: '🔄 让翻译立即生效',
    // 套用結果
    applySuccess: '✅ 简体中文化应用成功！重载 Claude 界面（或重新加载窗口）后生效。',
    btnReloadNow: '立即重新加载',
    btnLater: '稍后',
    btnReloadUi: '重载 Claude 界面',
    uiPanelNeedsWindow: '⚠️ 有对话开在编辑器标签页，就地重载会让它们变成空白（Claude 的标签页重载后不会重新初始化）。改用「重新加载窗口」可以保留对话。',
    uiReloaded: '✅ 已重新应用翻译并重载 Claude 界面。',
    uiApplyPending: '🌏 中文化已应用，但 Claude 界面比应用早一步加载，因此画面还是英文。重载界面即可生效（不必重新加载整个窗口）。',
    errWebviewReload: '⚠️ 这个 VS Code 版本无法就地重载界面，要改成重新加载窗口吗？',
    errNoExt: '❌ 找不到 Claude Code 扩展，请确认已安装。',
    errNoFile: '❌ 找不到 Claude Code 的 webview/index.js 文件。',
    errApplyFail: p => `❌ 中文化应用失败：${p}`,
    // 還原
    errNoExtShort: '❌ 找不到 Claude Code 扩展。',
    errNoWebview: '❌ 找不到 Claude Code 的 webview 文件。',
    errNoBackup: '❌ 找不到备份文件，无法还原。',
    restoreSuccess: '⏪ 已还原成官方原版，且不会再自动应用中文化。需要重新加载窗口才会生效。',
    errRestoreFail: p => `❌ 还原失败：${p}`,
    // 狀態資訊
    siTitle: 'ℹ️ Claude Code 简体中文化\n\n',
    siStateTranslated: '已应用简体中文 ✅',
    siStateOriginal: '官方原版 ⚪',
    siStateNotFound: '找不到 Claude Code ⚠️',
    siStateLabel: s => `状态：${s}`,
    siLangLabel: l => `当前语言：${l}`,
    siVersionLabel: v => `Claude Code 版本：${v || '未知'}`,
    siExtVersionLabel: v => `汉化扩展版本：${v}`,
    siCountLabel: n => `内置翻译条数：${n}`,
    siAutoOff: '自动应用：已由用户关闭（处于还原状态）',
    siAutoOn: '自动应用：开启',
    siTargetLabel: p => `目标文件：${p}`,
    siBackupLabel: b => `备份文件：${b ? '存在' : '不存在'}`,
    siBtnApply: '应用翻译',
    siBtnScan: '扫描未翻译',
    siBtnRestore: '还原原版',
    // 掃描
    scanHeaderTitle: '🔍 Claude Code 中文化 — 未翻译字符串扫描',
    scanHeaderMeta: (v, t) => `版本：${v || '未知'}　语言：${t}　扫描时间：${new Date().toLocaleString()}`,
    scanHeaderCount: n => `共找到 ${n} 条可能未翻译的界面字符串：\n`,
    scanHeaderTip: '\n（提示：可把需要保留的英文加进翻译包的 scanIgnore；要补译则直接在 translations/zh-CN.json 里加规则后重新打包。）',
    scanIgnoredNote: n => `（另有 ${n} 条列为刻意不翻：键码表、SQL 关键字、工具标识符、品牌与命令等，清单见翻译包的 scanIgnore。）`,
    scanFoundWarn: n => `🔍 检测到 ${n} 条可能未翻译的界面字符串。`,
    scanFoundWarnBoth: (n, d) => `🔍 检测到 ${n} 条可能未翻译的界面字符串，另有 ${d} 条规则已失效。`,
    scanNewTitle: n => `\n🆕 其中 ${n} 条是这次才出现的（上次扫描时没有）：\n`,
    scanAllTitle: n => `\n📋 以下为完整列表（共 ${n} 条，含历来累积未翻译者）：\n`,
    scanFoundWarnNew: (n, k) => `🔍 检测到 ${n} 条可能未翻译的界面字符串，其中 ${k} 条是这次新出现的。`,
    scanDeadTitle: n => `\n⚠️ 另有 ${n} 条翻译规则在此版本已匹配不到（上次扫描时还有效）：\n`,
    scanDeadTip: '\n（提示：Claude 多半是改写了这几段英文，请找出新写法后补进 translations/zh-CN.json；旧规则可保留给尚未更新的用户。）',
    scanDeadWarn: n => `⚠️ 有 ${n} 条翻译规则在新版本已匹配不到，原文可能被改写。`,
    btnViewList: '查看列表',
    btnGoto: '🧭 跳转到字符串…',
    gotoTitle: '🧭 跳转到未翻译字符串在 index.js 的位置',
    gotoPlaceholder: '选择字符串以在 index.js 中定位（会打开并选中该处）',
    gotoOccur: n => `出现 ${n} 处`,
    gotoNotFound: '在文件中找不到该字符串（可能已翻译或版本已变更）。',
    gotoNoResults: '当前没有扫描结果，请先执行「扫描未翻译字符串」。',
    siPackLabel: v => `翻译包版本：${v}`,
    scanClean: '✅ 未检测到明显漏翻的界面字符串，翻译覆盖良好！',
    errScanNoExt: '❌ 找不到 Claude Code 扩展。',
    errScanNoWebview: '❌ 找不到 webview 文件。',
    errScanFail: p => `❌ 扫描失败：${p}`,
    outputChannel: 'Claude Code 中文化',
};

/** 取得本擴充功能的 UI 字串包 */
function getStrings() {
    return STRINGS;
}

module.exports = { LOCALE, LANGUAGE_LABEL, MARKERS, ALL_MARKERS, STRINGS, getStrings };
