// sort-words.js
const fs = require('fs');
const path = require('path');

// 配置区
const WORD_FILE = 'data/words_Upgrade2Bach.json';
const BACKUP_DIR = 'data/backups';

// 高性能排序函数
function advancedSort(words) {
  const typePriority = { noun: 1, verb: 2 }; // 扩展点：添加其他类型
  
  return words.sort((a, b) => {
    // 第一排序条件：类型优先级
    const typeCompare = typePriority[a.type] - typePriority[b.type];
    
    // 第二排序条件：字母顺序（不区分大小写）
    const alphaCompare = a.original.localeCompare(
      b.original, 
      'en', 
      { sensitivity: 'base', ignorePunctuation: true }
    );

    return typeCompare || alphaCompare;
  });
}

// 安全文件操作
function processFile() {
  try {
    // 创建备份目录
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR);
    }

    // 读取数据
    const data = JSON.parse(fs.readFileSync(WORD_FILE, 'utf8'));
    if (!Array.isArray(data)) throw new Error('无效的JSON结构');

    // 执行智能排序
    const sortedData = advancedSort(data);

    // 生成带时间戳的备份文件
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `backup_${timestamp}.json`);
    fs.copyFileSync(WORD_FILE, backupFile);

    // 写入排序结果（保持美观格式）
    fs.writeFileSync(WORD_FILE, JSON.stringify(sortedData, null, 2));

    console.log('✅ 排序成功');
    console.log(`📦 原始文件备份至：${backupFile}`);
  } catch (error) {
    console.error('❌ 处理失败：', error.message);
    process.exit(1);
  }
}

// 执行主流程
processFile();