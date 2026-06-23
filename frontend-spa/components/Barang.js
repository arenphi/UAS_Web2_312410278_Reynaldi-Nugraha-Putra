const BarangComp = {
    template: `
    <div class="flex min-h-screen bg-slate-950 text-slate-100">
        <!-- Sidebar / Menu Samping -->
        <aside class="w-72 bg-slate-900 text-slate-100 p-6 space-y-6 border-r border-slate-700">
            <div>
                <h1 class="text-2xl font-bold tracking-wider">E-INVENTORY</h1>
                <p class="text-sm text-slate-400 mt-2">Panel Manajemen Stok</p>
            </div>
            <nav class="space-y-2">
                <a href="#/dashboard" class="block py-3 px-4 rounded-2xl transition hover:bg-slate-800/80">Dashboard</a>
                <a href="#/barang" class="block py-3 px-4 rounded-2xl bg-cyan-600 text-slate-950 font-semibold hover:bg-cyan-500 transition">Data Inventaris</a>
            </nav>
            <button @click="logout" class="w-full text-left py-3 px-4 rounded-2xl bg-rose-600/10 text-rose-300 hover:bg-rose-600/20 transition font-semibold mt-8">
                Keluar (Logout)
            </button>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 p-8">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h2 class="text-3xl font-bold text-slate-100">Manajemen Inventaris Barang</h2>
                    <p class="text-sm text-slate-400 mt-2">Lihat, edit, dan hapus data barang dengan mudah.</p>
                </div>
                <button class="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-medium px-5 py-3 rounded-2xl shadow-lg shadow-cyan-500/20 transition">
                    + Tambah Barang
                </button>
            </div>

            <!-- Tabel Data Master -->
            <div class="bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
                <table class="min-w-full divide-y divide-slate-700">
                    <thead class="bg-slate-950/90">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Kode</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Nama Barang</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Stok</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Supplier</th>
                            <th class="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-700 text-sm">
                        <tr v-for="item in items" :key="item.id" class="hover:bg-slate-800/80 transition">
                            <td class="px-6 py-4 whitespace-nowrap font-mono text-cyan-300 font-bold">{{ item.item_code }}</td>
                            <td class="px-6 py-4 whitespace-nowrap font-medium text-slate-100">{{ item.item_name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                                    {{ item.stock }} Unit
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-slate-400">{{ item.supplier }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                <button class="text-cyan-300 hover:text-cyan-100">Ubah</button>
                                <button class="text-rose-400 hover:text-rose-200">Hapus</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
    `,
    data() {
        return { items: [] }
    },
    mounted() {
        this.fetchItems();
    },
    methods: {
        async fetchItems() {
            try {
                // Otomatis menyertakan token berkat Axios Interceptor
                const response = await axios.get('items');
                this.items = response.data;
            } catch (error) {
                console.error("Gagal memuat inventaris:", error);
            }
        },
        logout() {
            localStorage.clear(); // Otomatis menghapus seluruh sesi token di penyimpanan lokal
            alert('Anda telah keluar dari aplikasi.');
            window.safeNavigate('/login'); // Kembalikan ke form login
        }
    }
};