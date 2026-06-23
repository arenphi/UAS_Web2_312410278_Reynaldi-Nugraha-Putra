const DashboardComp = {
    template: `
    <div class="min-h-screen bg-slate-950 text-slate-100">
        <div class="max-w-7xl mx-auto p-8">
            <div class="bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl shadow-slate-950/30 p-8">
                <div class="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                    <div>
                        <h1 class="text-4xl font-bold text-slate-100">Dashboard Admin</h1>
                        <p class="mt-3 text-slate-400 max-w-2xl">Pantau stok, lihat ringkasan inventaris, dan akses panel barang dengan cepat dalam tampilan gelap yang elegan.</p>
                    </div>
                    <div class="flex gap-3">
                        <button @click="gotoBarang" class="bg-cyan-600 hover:bg-cyan-500 text-slate-950 px-5 py-3 rounded-2xl font-semibold transition shadow-lg shadow-cyan-500/20">Buka Data Barang</button>
                        <button @click="logout" class="bg-slate-800 hover:bg-slate-700 text-slate-100 px-5 py-3 rounded-2xl border border-slate-700 transition">Logout</button>
                    </div>
                </div>

                <div class="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    <div class="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 shadow-inner shadow-slate-950/40">
                        <p class="text-sm uppercase tracking-[0.3em] text-slate-500">Total Barang</p>
                        <p class="mt-4 text-4xl font-bold text-cyan-300">{{ stats.totalBarang }}</p>
                    </div>
                    <div class="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 shadow-inner shadow-slate-950/40">
                        <p class="text-sm uppercase tracking-[0.3em] text-slate-500">Kategori</p>
                        <p class="mt-4 text-4xl font-bold text-emerald-300">{{ stats.totalKategori }}</p>
                    </div>
                    <div class="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 shadow-inner shadow-slate-950/40">
                        <p class="text-sm uppercase tracking-[0.3em] text-slate-500">Supplier</p>
                        <p class="mt-4 text-4xl font-bold text-violet-300">{{ stats.totalSupplier }}</p>
                    </div>
                    <div class="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 shadow-inner shadow-slate-950/40">
                        <p class="text-sm uppercase tracking-[0.3em] text-slate-500">Admin Aktif</p>
                        <p class="mt-4 text-4xl font-bold text-orange-300">{{ stats.totalUsers }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            stats: {
                totalBarang: 0,
                totalKategori: 3,
                totalSupplier: 3,
                totalUsers: 1
            }
        };
    },
    mounted() {
        this.loadStats();
    },
    methods: {
        gotoBarang() {
            window.safeNavigate('/barang');
        },
        logout() {
            localStorage.clear();
            alert('Anda telah keluar dari aplikasi.');
            window.safeNavigate('/login');
        },
        async loadStats() {
            try {
                const response = await axios.get('barang');
                if (Array.isArray(response.data)) {
                    this.stats.totalBarang = response.data.length;
                }
            } catch (error) {
                console.warn('Tidak dapat memuat statistik inventaris:', error);
            }
        }
    }
};
