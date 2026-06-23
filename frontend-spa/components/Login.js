const LoginComp = {
    template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div class="max-w-md w-full bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 p-8 space-y-6">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-slate-100">E-Inventory Admin</h2>
                <p class="text-sm text-slate-400 mt-1">Silakan masuk untuk mengelola barang</p>
            </div>
            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-slate-300 mb-1">Username</label>
                    <input v-model="username" type="text" required class="w-full px-4 py-3 bg-slate-950 border border-slate-700 text-slate-100 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-300 mb-1">Password</label>
                    <input v-model="password" type="password" required class="w-full px-4 py-3 bg-slate-950 border border-slate-700 text-slate-100 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                </div>
                <button type="submit" class="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-medium py-3 rounded-2xl transition-shadow shadow-cyan-500/20">
                    Masuk Sekarang
                </button>
            </form>
        </div>
    </div>
    `,
    data() {
        return { username: '', password: '' }
    },
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post('login', {
                    username: this.username,
                    password: this.password
                });
                
                if(response.data.status === 200) {
                    // Simpan identitas & token otentikasi di localStorage
                    localStorage.setItem('isLoggedIn', 'true');
                    // Dukung format token baik di top-level atau di data.access_token
                    const token = response.data.token || (response.data.data && response.data.data.access_token) || '';
                    localStorage.setItem('token', token);
                    if(response.data.data && response.data.data.username) localStorage.setItem('username', response.data.data.username);
                    
                    alert('Selamat Datang Kembali!');
                    console.log('LoginComp: safeNavigate to /dashboard');
                    window.safeNavigate('/dashboard');
                }
            } catch (error) {
                alert('Otentikasi Gagal! Periksa kembali username dan password.');
            }
        }
    }
};