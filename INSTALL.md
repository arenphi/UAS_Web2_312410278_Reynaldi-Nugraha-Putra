# 📖 PANDUAN INSTALASI E-INVENTORY SYSTEM

## Daftar Isi
1. [Prasyarat Sistem](#prasyarat-sistem)
2. [Instalasi Backend](#instalasi-backend-codeigniter-4)
3. [Instalasi Frontend](#instalasi-frontend-vuejs-3)
4. [Verifikasi Instalasi](#verifikasi-instalasi)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 PRASYARAT SISTEM

### **Minimum Requirements**
| Komponen | Versi | Status |
|----------|-------|--------|
| PHP | 8.2+ | ✅ WAJIB |
| MySQL/MariaDB | 10.4+ | ✅ WAJIB |
| Composer | 2.0+ | ✅ WAJIB (PHP package manager) |
| Node.js | 14+ | ⚠️ Optional (hanya jika pakai npm) |
| Git | Latest | ⚠️ Optional (untuk clone repo) |

### **Download Links**
- **PHP & Composer:** https://www.apachefriends.org (XAMPP atau WAMP)
- **MySQL/MariaDB:** https://www.mysql.com atau https://mariadb.org
- **Git:** https://git-scm.com
- **VS Code:** https://code.visualstudio.com (Recommended IDE)

---

## 🚀 INSTALASI BACKEND (CodeIgniter 4)

### **Step 1: Navigasi ke folder backend**

**Windows (Command Prompt/PowerShell):**
```powershell
cd backend-api
```

**Mac/Linux (Terminal):**
```bash
cd backend-api
```

---

### **Step 2: Install PHP Dependencies dengan Composer**

Pastikan Composer sudah terinstall. Cek versi:
```bash
composer --version
```

Install dependencies:
```bash
composer install
```

**Output yang diharapkan:**
```
Installing dependencies from lock file (or from composer.json)
...
Generating autoload files
✓ Installation berhasil
```

---

### **Step 3: Setup Environment File (.env)**

#### **3.1 Copy file .env.example ke .env**

**Windows:**
```powershell
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

#### **3.2 Edit file .env untuk konfigurasi database**

Buka `.env` dengan text editor dan cari section:
```ini
# DATABASE CONFIGURATION
database.default.hostname = localhost
database.default.database = e_inventory
database.default.username = root
database.default.password = 
database.default.DBDriver = MySQLi
database.default.port = 3306
```

**Sesuaikan dengan kredensial MySQL Anda:**
```ini
# Contoh jika menggunakan XAMPP default
database.default.hostname = localhost
database.default.database = e_inventory
database.default.username = root
database.default.password =           # Kosong jika default XAMPP
database.default.DBDriver = MySQLi
database.default.port = 3306

# Contoh jika menggunakan password
database.default.hostname = localhost
database.default.database = e_inventory
database.default.username = root
database.default.password = my_password  # Ganti dengan password Anda
database.default.DBDriver = MySQLi
database.default.port = 3306
```

---

### **Step 4: Buat Database & Import Schema**

#### **Opsi A: Menggunakan Command Line**

**Langkah 4A.1: Buat database**
```bash
mysql -u root -p -e "CREATE DATABASE e_inventory CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"
```

**Langkah 4A.2: Import schema**
```bash
mysql -u root -p e_inventory < e_inventory.sql
```

**Contoh dengan password:**
```bash
mysql -u root -p123456 e_inventory < e_inventory.sql
```

#### **Opsi B: Menggunakan phpMyAdmin (GUI)**

1. **Buka phpMyAdmin** → http://localhost/phpmyadmin
2. **Login** dengan kredensial MySQL Anda
3. **Buat database baru:**
   - Klik tab "Databases"
   - Ketik nama: `e_inventory`
   - Character set: `utf8mb4_general_ci`
   - Klik "Create"
4. **Import file SQL:**
   - Pilih database `e_inventory`
   - Klik tab "Import"
   - Browse file `backend-api/e_inventory.sql`
   - Klik "Import"

**Verifikasi database:**
```bash
mysql -u root -p -e "USE e_inventory; SHOW TABLES;"
```

Output yang diharapkan:
```
+---------------------+
| Tables_in_e_inventory |
+---------------------+
| barang              |
| histori_stok        |
| kategori            |
| supplier            |
| users               |
+---------------------+
```

---

### **Step 5: Jalankan Backend Development Server**

```bash
php spark serve
```

**Output yang diharapkan:**
```
CodeIgniter v4.x.x Command Line Tool - Server version 8.1.2

Server running on http://localhost:8080
Press Control+C to stop
```

✅ **Backend sudah running!** Biarkan terminal tetap terbuka.

---

## 💻 INSTALASI FRONTEND (VueJS 3)

### **Opsi 1: Live Server Extension (RECOMMENDED)**

#### **Step 1: Install Live Server Extension di VS Code**
1. Buka VS Code
2. Klik **Extensions** (Ctrl+Shift+X)
3. Cari: `Live Server`
4. Klik **Install** (author: Ritwick Dey)

#### **Step 2: Jalankan Frontend**
1. Buka folder project di VS Code
2. Klik file `frontend-spa/index.html`
3. Klik kanan → **"Open with Live Server"**
4. Browser otomatis terbuka di `http://127.0.0.1:5500/frontend-spa/`

✅ **Frontend sudah running!**

---

### **Opsi 2: Python HTTP Server**

Syarat: Python sudah terinstall

```bash
cd frontend-spa
python -m http.server 8000
```

Buka di browser: `http://localhost:8000`

---

### **Opsi 3: PHP Built-in Server**

Syarat: PHP sudah terinstall

```bash
cd frontend-spa
php -S localhost:8000
```

Buka di browser: `http://localhost:8000`

---

### **Opsi 4: Node.js HTTP Server**

Syarat: Node.js sudah terinstall

```bash
npm install -g http-server
cd frontend-spa
http-server -p 8000
```

Buka di browser: `http://localhost:8000`

---

## ✅ VERIFIKASI INSTALASI

### **Checklist Verifikasi**

- [ ] Backend running di `http://localhost:8080`
- [ ] Frontend accessible di `http://localhost:5500` (atau port lain)
- [ ] Database `e_inventory` sudah ter-create
- [ ] Table barang, kategori, supplier, users, histori_stok ada

### **Test Koneksi**

#### **Test 1: Cek Backend Health**
```bash
curl http://localhost:8080/
```

Jika working, akan return homepage CodeIgniter

#### **Test 2: Cek API Login**
```bash
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

Expected Response (200):
```json
{
  "status": 200,
  "error": null,
  "messages": {"success": "Login Berhasil"},
  "token": "..."
}
```

#### **Test 3: Buka di Browser**
1. Frontend: http://localhost:5500/frontend-spa/
   - Harusnya muncul landing page dengan hero section
   - Klik "Login Admin" → masuk halaman login

2. Backend: http://localhost:8080/
   - Harusnya muncul homepage CodeIgniter

---

## 🛠️ TROUBLESHOOTING

### **Error: PHP Version Requirement Not Met**
```
Your PHP version must be 8.2 or higher...
```
**Solusi:**
- Update PHP ke versi 8.2+
- Cek versi: `php -v`
- Gunakan XAMPP terbaru yang sudah include PHP 8.2

---

### **Error: Cannot find MySQL/MariaDB**
```
Unable to connect to database...
SQLSTATE[HY000]
```
**Solusi:**
1. Pastikan MySQL service sudah running
2. Cek credentials di `.env`
3. Jalankan: `mysql -u root -p` untuk test koneksi
4. Database `e_inventory` sudah dibuat?

---

### **Error: CORS Policy Error (Browser Console)**
```
Access to XMLHttpRequest from origin blocked by CORS policy
```
**Solusi:**
- ✅ Sudah dikonfigurasi di backend
- Restart backend server: `php spark serve`
- Clear browser cache: Ctrl+Shift+Delete

---

### **Error: 401 Unauthorized saat test API**
```
"Akses ditolak. Token Authorization Bearer tidak ditemukan."
```
**Solusi (Expected Behavior):**
- ✅ Ini adalah expected response
- Harus login dulu untuk dapat token
- Post ke `/api/login` dahulu sebelum akses `/api/barang`

---

### **Error: Port 8080 Already in Use**
```
Address already in use [::]:8080
```
**Solusi:**
- Gunakan port berbeda:
  ```bash
  php spark serve --port 9090
  ```
- Atau kill process yang menggunakan port 8080

---

### **Error: Composer not found**
```
'composer' is not recognized as an internal or external command
```
**Solusi:**
- Install Composer: https://getcomposer.org
- Atau gunakan XAMPP yang sudah include Composer

---

### **Error: Database file corrupted**
```
Can't create temporary file for read_set...
```
**Solusi:**
1. Delete dan recreate database:
   ```bash
   mysql -u root -p -e "DROP DATABASE e_inventory;"
   mysql -u root -p -e "CREATE DATABASE e_inventory;"
   mysql -u root -p e_inventory < e_inventory.sql
   ```
2. Atau reimport dari phpMyAdmin

---

## 🎯 QUICK START (3 LANGKAH)

Untuk yang ingin cepat:

```bash
# 1. Setup Backend (Terminal 1)
cd backend-api
composer install
# Edit .env untuk database credentials
php spark serve

# 2. Setup Frontend (Terminal 2)
cd frontend-spa
python -m http.server 8000

# 3. Buka Browser
http://localhost:8000/index.html
```

Selesai! 🚀

---

## 📚 REFERENSI LENGKAP

- **CodeIgniter 4 Docs:** https://codeigniter.com/user_guide/
- **VueJS 3 Docs:** https://vuejs.org/guide/
- **TailwindCSS Docs:** https://tailwindcss.com/docs
- **Axios Docs:** https://axios-http.com/
- **MySQL Docs:** https://dev.mysql.com/doc/

---

**Last Updated:** 2026-06-23
**Version:** 1.0.0 (Installation Guide)
