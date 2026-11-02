Sofi Hadi 
2440511004
5c
Cara Menjalankan Proyek (Instructions)
Ekstrak atau buka direktori proyek di terminal/Command Prompt
lalu jalankan perintah npx expo start
lalu scan menggunakan kamera
NoNama HookInput (Parameter)Output (Return)Dependency ArrayAlasan Pemilihan1useStateNilai awal state (cth: '', null, [])Pair [state, setState]Tidak adaDigunakan untuk mengelola data lokal komponen yang dinamis, seperti input teks pencarian (searchQuery), status filter mood yang dipilih (selectedMood), dan input form catatan baru.2useContextObjek Context (DiaryContext)Nilai value global (entries, likedIds, addEntry, toggleLike)Diatur oleh ProviderDipilih agar data catatan dan status Like dapat diakses serta disinkronkan secara langsung di berbagai halaman (Home, Favorites, Detail) tanpa harus mengirim props secara berantai (props drilling).3useMemoFungsi komputasi (callback), Array DependensiNilai hasil komputasi (array data terfilter)[entries, query, selectedMood]Digunakan untuk mengoptimalkan performa dengan cara menyimpan hasil (cache) penyaringan data diary. Mencegah komputasi ulang yang berat setiap kali komponen mengalami re-render.4useDiarySearch (Custom)(entries, query, selectedMood)Array entri yang sudah difilter[entries, query, selectedMood]Dibuat secara khusus untuk mengisolasi logika pencarian teks dan filter mood agar struktur kode pada halaman utama (Home) tetap bersih (clean code).5useLikedEntries (Custom)(entries, likedIds)Array entri yang disukai saja[entries, likedIds]
