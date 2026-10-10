const path = require('path');
const { LOCALE } = require('./i18n');
const { readPack, describePack } = require('./pack');

/**
 * 翻譯引擎：載入隨擴充功能打包的規則檔（translations/zh-CN.json），
 * 套用三階段替換（前置 → 內建 → 後置）。
 *
 * 本 fork 是簡體中文專項版：只有一份規則檔、沒有線上更新快取，
 * 因此載入的是磁碟上那一份，不再與遠端版本比新舊。
 */
class Translator {
    constructor(config) {
        this.config = config;
        this.rulesCache = null;
    }

    /** 載入內建規則 */
    loadRules() {
        if (this.rulesCache) return this.rulesCache;

        const file = path.join(__dirname, '..', 'translations', 'zh-CN.json');
        const bundled = readPack(file, LOCALE);
        if (!bundled) console.warn('找不到（或無法解析）內建翻譯規則檔：', file);

        this.rulesCache = bundled || { version: '', locale: LOCALE, translations: [] };
        console.log(
            `已載入簡體中文翻譯規則（內建 ${describePack(bundled)}），共`,
            this.rulesCache.translations.length, '條'
        );
        return this.rulesCache;
    }

    /** 內建規則（含 locale / version / updatedAt / scanIgnore） */
    getCurrentRules() {
        return this.loadRules();
    }

    /** 翻譯包的可讀版本（版本 + 日期） */
    getPackVersion() {
        return describePack(this.getCurrentRules());
    }

    /**
     * 翻譯包的簽章：版本 + 更新日期 + 條數。
     * 只要翻譯包有任何更新（版本號、日期、條數改變），簽章即不同，
     * 供啟動時判斷「翻譯包是否已更新、需重新套用」。
     */
    getSignature() {
        const r = this.getCurrentRules();
        return `${r.version || ''}#${r.updatedAt || ''}~${(r.translations || []).length}`;
    }

    /**
     * 「刻意不翻」清單。
     *
     * 掃描器分不出「還沒翻」與「決定不翻」——鍵碼表、SQL 關鍵字、工具識別字這些
     * 判讀過後確定不該翻的字串，每次掃描都會照列，把真正需要處理的訊號洗掉。
     */
    getScanIgnore() {
        const list = this.getCurrentRules().scanIgnore;
        return new Set(Array.isArray(list) ? list : []);
    }

    /** 內建規則條數（供狀態顯示） */
    getBuiltInCount() {
        return this.getCurrentRules().translations.length;
    }

    /** 套用三階段翻譯 */
    async translate(content) {
        const originalLength = content.length;

        // 階段 1：前置規則（使用者自訂，最優先）
        const preRules = this.config.get('preTranslationRules') || [];
        if (preRules.length > 0) {
            content = this.applyRules(content, preRules);
        }

        // 階段 2：內建規則
        const builtInRules = this.getCurrentRules();
        if (builtInRules.translations && builtInRules.translations.length > 0) {
            content = this.applyRules(content, builtInRules.translations);
        }

        // 階段 3：後置規則（使用者自訂，最後覆蓋）
        const postRules = this.config.get('postTranslationRules') || [];
        if (postRules.length > 0) {
            content = this.applyRules(content, postRules);
        }

        console.log('翻譯完成，檔案大小變化：', originalLength, '->', content.length);
        return content;
    }

    /** 套用一組翻譯規則 */
    applyRules(content, rules) {
        for (const rule of rules) {
            if (!rule || !rule.original || !rule.chinese) continue;
            try {
                if (rule.regex) {
                    const flags = rule.flags || 'g';
                    const regex = new RegExp(rule.original, flags);
                    content = content.replace(regex, rule.chinese);
                } else if (rule.replaceAll === false) {
                    content = content.replace(rule.original, rule.chinese);
                } else {
                    content = content.replaceAll(rule.original, rule.chinese);
                }
            } catch (error) {
                console.warn('套用規則出錯：', rule, error);
            }
        }
        return content;
    }
}

module.exports = Translator;
