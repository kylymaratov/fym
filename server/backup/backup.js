const cron = require('node-cron');
const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const FormData = require('form-data');

const dbUser = process.argv[2] || '';
const dbName = process.argv[3] || '';

const backupDir = path.join(__dirname, 'backups');
const telegramToken = '7462820913:AAHDYiJz9YeboGKZlhGn2uHf92yfw0hEfTA';
const chatId = '-4555571604';
const excludedTable = 'songs_caches';

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function backupDatabase() {
  const fileName = `daily_backup_${new Date().toISOString().split('T')[0]}.sql`;
  const filePath = path.join(backupDir, fileName);

  const command = `pg_dump -U ${dbUser} ${dbName} --exclude-table=${excludedTable} > ${filePath}`;

  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error while create backup: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`pg_dump stderr: ${stderr}`);
      return;
    }

    console.log(`Backup created: ${filePath}`);
    await sendBackupToTelegram(filePath);
  });
}

async function sendBackupToTelegram(filePath) {
  try {
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('document', fs.createReadStream(filePath));
    form.append('caption', `#backup ${dbName} - ${dbUser}`);

    const url = `https://api.telegram.org/bot${telegramToken}/sendDocument`;

    const response = await axios.post(url, form, {
      headers: form.getHeaders(),
    });

    if (response.data.ok) {
      console.log('Backup uploaded to telegram');
    }
  } catch (error) {
    console.error('Failed send backup to telegram', error.message);
  } finally {
    fs.rmSync(filePath);
  }
}

backupDatabase();
