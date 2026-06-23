export default {
    template: `
    <div class="min-h-screen bg-slate-950 px-6 py-8">
        <div class="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/40">
            <div class="flex flex-col gap-4 border-b border-slate-800 bg-slate-950/90 px-8 py-7 md:flex-row md:items-center md:justify-between">
                <div>
                    <p class="text-sm uppercase tracking-[0.2em] text-cyan-300/70">Inventaris</p>
                    <h1 class="mt-3 text-3xl font-semibold text-white">Daftar Barang</h1>
                    <p class="mt-2 text-sm text-slate-400">Kelola stok, kategori, supplier, dan harga barang.</p>
                </div>
                <button @click="ambilData" class="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">🔄 Muat Ulang Data</button>
            </div>

            <div v-if="loading" class="p-10 text-center text-slate-400">
                <span class="animate-pulse">Memuat data inventaris dari server...</span>
            </div>

            <div v-else class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-800">
                    <thead class="bg-slate-950/80 text-slate-300">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Kode</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Nama Barang</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Kategori</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Supplier</th>
                            <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">Harga</th>
                            <th class="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">Stok</th>
                        </tr>
                    </thead>
                    <tbody class="bg-slate-900 divide-y divide-slate-800 text-sm">
                        <tr v-for="item in barang" :key="item.id" class="hover:bg-slate-800/70 transition">
                            <td class="px-6 py-4 font-mono text-xs text-cyan-300">{{ item.kode_barang }}</td>
                            <td class="px-6 py-4 font-medium text-white">{{ item.nama_barang }}</td>
                            <td class="px-6 py-4">
                                <span class="inline-flex rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-300 border border-slate-700">{{ item.nama_kategori }}</span>
                            </td>
                            <td class="px-6 py-4 text-slate-400 text-xs">{{ item.nama_supplier }}</td>
                            <td class="px-6 py-4 text-right font-semibold text-slate-100">Rp {{ Number(item.harga).toLocaleString('id-ID') }}</td>
                            <td class="px-6 py-4 text-center">
                                <span class="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-200 border border-emerald-500/20">{{ item.stok }} pcs</span>
                            </td>
                        </tr>
                        <tr v-if="barang.length === 0">
                            <td colspan="6" class="px-6 py-12 text-center text-slate-500">Tidak ada data barang atau server tidak merespons.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `,
    setup() {
        const barang = Vue.ref([]);
        const loading = Vue.ref(true);

        const ambilData = () => {
            loading.value = true;
            axios.get('http://localhost:8080/api/barang')
                .then(response => {
                    barang.value = response.data;
                    loading.value = false;
                })
                .catch(error => {
                    console.error('Gagal memuat API:', error);
                    loading.value = false;
                });
        };

        Vue.onMounted(() => {
            ambilData();
        });

        return { barang, loading, ambilData };
    }
};