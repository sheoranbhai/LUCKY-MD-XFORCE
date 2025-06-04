const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUZ5a2QwYUI5cUZOb2FvQzdGT09IVXZMcGlGRjNTc0xHWDg3YkVXd1ZXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNzl4YUhMdGE0QUcyMDZvRjdpbVM2OXhWV3p3OSs2RjI5aFovQU8wdnpBVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtRjU3ZmlhSVpqeWVhbWRjcFYyWEM2ZjloSktvSWVzVHBKRVVUQ3N0dDBNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPNzM2cVdoZmdvQjVpMjhFWWszZUgxUGZ2Wk5TQXIrK2RNQVdiOWVOekFzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNEREVENVdrVEJyL0FmaVVYOUpNUkR3WnZLbGl3VUhXdWliSG9WVnZKazg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFvaGUxbGdUSlBHUmp2cC9mSGJCSW1XRVFYRjUrbytaQ2tKSjN2R2xNUlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUZxaVJaV3dwSDZJanYwTUVUM1JtQ2YxNEkvSW00SDc1N2lNUFNzdWoyZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicE9XTmVGQUoxRWI2dy9ZeDhvRzBqT3JSZlVWUEt1dVppc0tqZU9PdlR6WT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkYxRmZRRkNPOElVQTJSbC9taGg0SG5ZZ21PNEcxZ1RGODI4a0s2Z2trN3Zjb0kzS1h1Nmt2cnllRERHWWhrU1lDalpScFF4SGM2MEI0RnlPeERjb2hBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIyLCJhZHZTZWNyZXRLZXkiOiJQYkk3TGRqNzg3MkNPUG0yTzc5ZlpxejhoanBlQjdJVTB5aUVOVC9GRyswPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxOTcyODgxNDA2MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzOTE1RDNBQzMyM0ZDRUQ3ODc2NzA0NzE4MjlDMkNEQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5MDAxMDQ3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTk3Mjg4MTQwNjBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQkQ5MThCQ0RCRjNBQjlDRTQ1QTg3ODRDN0M5RkIxRUYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTAwMTA0OH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiMU1rcFJvY21SNWVQbUdUR2lJeXFvUSIsInBob25lSWQiOiI1NmY3M2JlNS02YmFiLTQyYzYtYjJhZS0yYTliM2NlYjlkMDAiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM2tZWTNBUlRrNnU5UUNHN2tKRzlhNWhEN25NPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFWdHFmK3A0Syt5cXZ0bkVsU2d6NzlCMGt0RT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJGUkVERVpSQSIsIm1lIjp7ImlkIjoiOTE5NzI4ODE0MDYwOjI5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlUgUiBNRU5UQUwgQlVUIEkgTElLRSBVIiwibGlkIjoiMjU0MjExMTc4NjcyMzc4OjI5QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTW1tNkZRUXhzYit3UVlZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidFRzK3BCdTZUeEtaZStSNWJOZCt0eWhJbEVmUlJZam41ZC8zOXYwVk9oUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVDZtM0VZUU1MYWZmeGlEMHpCYm9uME1XZ3BZZFRHbnhKdU1uYkhWQkF0Y3hLSlBZczB2NTB6Yi9aaXdPbkxMQmx6WXFLYmphRGZNalZucDQ3Yk1vRFE9PSIsImRldmljZVNpZ25hdHVyZSI6ImFpQzNmaCtoNFdnZUM0Q3dyNXFJWFVpMHZGaXFCOHQwdDg5UTFPNjhKYjFwb0xudTZwS3ZDNTU1bnJmeEVmQWQ2SHZYMmVJdDdzaDY0K09ONHJaeWlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE5NzI4ODE0MDYwOjI5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJVN1BxUWJ1azhTbVh2a2VXelhmcmNvU0pSSDBVV0k1K1hmOS9iOUZUb1UifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0OTAwMTA0NSwibGFzdFByb3BIYXNoIjoiNFpSUDZTIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCNDAifQ==',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "Sanju",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "919728814060",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "non",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By Sanju',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'no',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "",
    WEBSITE :process.env.GURL || "",
    CAPTION : process.env.CAPTION || "LUCKY-MD-XFORCE",
    BOT : process.env.BOT_NAME || 'LUCKY-MD-XFORCE',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    FREDI_DELETE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
