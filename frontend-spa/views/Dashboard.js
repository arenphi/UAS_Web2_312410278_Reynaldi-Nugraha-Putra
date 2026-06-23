export default {
    template: `
    <div class="min-h-screen flex bg-slate-950 text-slate-100">
        <aside class="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">
            <div class="px-6 py-6 border-b border-slate-800">
                <div class="flex items-center gap-3">
                    <span class="text-3xl">📦</span>
                    <div>
                        <h1 class="text-xl font-semibold text-white">E-Inventory</h1>
                        <p class="text-xs text-slate-400">Admin Panel</p>
                    </div>
                </div>
            </div>

            <nav class="flex-1 px-4 py-6 space-y-2">
                <router-link to="/dashboard/barang" class="block rounded-2xl px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition" active-class="bg-cyan-600 text-white">
                    🗃️ Data Barang
                </router-link>
            </nav>

            <div class="px-6 py-4 border-t border-slate-800">
                <button @click="handleLogout" class="w-full rounded-2xl border border-red-600 bg-red-600/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-600 hover:text-white">
                    🚪 Keluar
                </button>
            </div>
        </aside>

        <div class="flex-1 overflow-hidden">
            <header class="border-b border-slate-800 bg-slate-950/90 px-8 py-5 flex items-center justify-between">
                <div>
                    <p class="text-sm text-slate-400">Selamat datang kembali,</p>
                    <h2 class="mt-1 text-2xl font-semibold text-white">Admin E-Inventory</h2>
                </div>
                <span class="rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 border border-emerald-500/20">Terhubung</span>
            </header>
            <main class="h-[calc(100vh-96px)] overflow-y-auto p-8">
                <router-view></router-view>
            </main>
        </div>
    </div>
    `,
    setup() {
        const router = VueRouter.useRouter();
        const { onMounted } = Vue;

        onMounted(() => {
            const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
            if (!isAuthenticated) {
                console.log('Dashboard: user not authenticated — redirecting to /login');
                alert('Akses Ilegal Ditolak! Sila Login Dahulu.');
                window.safeNavigate('/login');
            } else {
                console.log('Dashboard: user authenticated');
            }
        });

        const handleLogout = () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            window.safeNavigate('/login');
        };

        return { handleLogout };
    }
};
