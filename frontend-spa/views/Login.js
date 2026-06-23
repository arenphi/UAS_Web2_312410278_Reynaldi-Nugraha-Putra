export default {
    template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div class="w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-cyan-500/10">
            <div class="text-center mb-8">
                <span class="text-5xl">📦</span>
                <h2 class="mt-4 text-3xl font-semibold text-white">Login Admin E-Inventory</h2>
                <p class="mt-2 text-sm text-slate-400">Masuk dengan kredensial admin untuk mengelola inventaris</p>
            </div>
            <form @submit.prevent="handleLogin" class="space-y-5">
                <div>
                    <label class="block text-sm font-medium text-slate-300">Username</label>
                    <input v-model="username" type="text" required class="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40">
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-300">Password</label>
                    <input v-model="password" type="password" required class="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 shadow-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40">
                </div>
                <button type="submit" class="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">Masuk ke Dashboard</button>
            </form>
        </div>
    </div>
    `,
    setup() {
        const username = Vue.ref('');
        const password = Vue.ref('');
        const router = VueRouter.useRouter();

        const handleLogin = () => {
            axios.post('http://localhost:8080/api/login', {
                username: username.value,
                password: password.value
            })
            .then(response => {
                const resData = response.data;
                const token = resData.token || (resData.data && resData.data.token);
                const isSuccess = response.status === 200 || resData.status === 200;

                if (isSuccess && token) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', token);
                    console.log('Login (view): token saved, redirecting to /dashboard/barang');
                    router.push('/dashboard/barang');
                } else {
                    alert('Username atau Password salah!');
                }
            })
            .catch(error => {
                console.error('Login error', error);
                const msg = error.response && error.response.data && error.response.data.messages ? error.response.data.messages.error : 'Username atau Password admin salah!';
                alert('Login Gagal: ' + msg);
            });
        };

        return { username, password, handleLogin };
    }
};