# Rules & Quality Guidelines

## 1. Clean Code & Type Safety
- **Strict TypeScript**: Dilarang menggunakan `any`, `@ts-ignore`, atau casting yang tidak aman (`as unknown as T`) tanpa validasi runtime.
- **Explicit Types**: Tentukan tipe data untuk props komponen, parameter fungsi, dan luaran Server Action.
- **Error Handling**: Tangani error secara eksplisit. Laporkan pesan error yang user-friendly di UI tanpa membocorkan stack trace internal server.

## 2. Dependency & Code Hygiene
- Gunakan dependensi yang telah disepakati (`clsx`, `tailwind-merge`, `lucide-react`, `date-fns`, `zod`, `prisma`).
- Hindari membuat file atau abstraksi utilitas satu kali pakai jika logika tersebut cukup diselesaikan dengan fungsi sederhana.
- Selalu pisahkan antara kode UI (komponen) dan logika bisnis (queries, actions, calculations).

## 3. Workflow Siklus Pengembangan
1. **Understand**: Periksa file dan tipe data terkait sebelum melakukan perubahan.
2. **Plan**: Rencanakan berkas yang terpengaruh untuk perubahan substansial.
3. **Implement**: Tulis perubahan paling ringkas, utuh, dan kohesif.
4. **Verify**: Jalankan typecheck (`npm run build` atau `npx tsc --noEmit`) dan linting.
5. **Report**: Laporkan ringkasan perubahan dalam Bahasa Indonesia yang lugas.
