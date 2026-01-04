// DATABASE PRODUK LENGKAP
const products = {
    "lemari-buku": {
        name: "Lemari Buku Jati",
        code: "RK-L01",
        category: "Ruang Kerja",
        img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        desc: "Lemari buku minimalis berbahan dasar kayu jati solid. Cocok untuk menyimpan koleksi buku Anda agar tetap rapi dan terhindar dari debu.",
        specs: { material: "Kayu Jati Grade A", finish: "Natural Melamine", dim: "180 x 60 x 40 cm" }
    },
    "kursi-minimalis": {
        name: "Kursi Kayu Minimalis",
        code: "RK-K02",
        category: "Ruang Tamu",
        img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        desc: "Kursi dengan desain ergonomis yang nyaman diduduki berlama-lama. Dibuat dengan sambungan kayu presisi.",
        specs: { material: "Kayu Jati Solid", finish: "Walnut Matte", dim: "45 x 50 x 85 cm" }
    },
    "meja-rias": {
        name: "Meja Rias Scandi",
        code: "RK-M03",
        category: "Kamar Tidur",
        img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        desc: "Meja rias cantik dengan cermin putar. Dilengkapi laci makeup yang luas.",
        specs: { material: "Kayu Mahoni", finish: "Duco White", dim: "100 x 45 x 140 cm" }
    },
    "meja-nakas": {
        name: "Meja Nakas Bedside",
        code: "RK-N04",
        category: "Kamar Tidur",
        img: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        desc: "Meja kecil samping tempat tidur. Fungsional untuk lampu tidur dan buku.",
        specs: { material: "Kayu Jati", finish: "Natural Oak", dim: "40 x 40 x 50 cm" }
    },
    "mimbar": {
        name: "Mimbar Masjid Jati",
        code: "RK-MB05",
        category: "Custom",
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        desc: "Mimbar kokoh dengan ukiran khas Jepara. Kayu tua tahan lama.",
        specs: { material: "Kayu Jati TPK", finish: "Salak Brown", dim: "90 x 120 x 150 cm" }
    },
    "ranjang-kayu": {
        name: "Dipan Ranjang Queen",
        code: "RK-DP06",
        category: "Kamar Tidur",
        img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        desc: "Rangka tempat tidur kuat menahan beban berat. Desain headboard elegan.",
        specs: { material: "Kayu Jati", finish: "Natural", dim: "160 x 200 cm" }
    },
    "lemari-laci": {
        name: "Lemari Laci 5 Susun",
        code: "RK-LC07",
        category: "Penyimpanan",
        img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        desc: "Lemari laci serbaguna dengan rel double track yang lancar.",
        specs: { material: "Kayu Jati Campuran", finish: "Varnish Clear", dim: "80 x 45 x 110 cm" }
    },
    "rak-gelas": {
        name: "Rak Gelas Gantung",
        code: "RK-RG08",
        category: "Dapur",
        img: "https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        desc: "Hiasan dinding artistik sekaligus tempat gelas wine atau mug.",
        specs: { material: "Kayu Pinus", finish: "Bakaran / Rustic", dim: "60 x 20 x 10 cm" }
    },
    "meja-kantor-hitam": {
        name: "Meja Kantor Hitam",
        code: "RK-001",
        category: "Ruang Kantor",
        img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        desc: "Hadirkan Kemewahan Dan Otoritas Di Ruang Kerja Anda Dengan Meja Kerja Classic Mewah Dari Rompok Kayu. Didesain Dengan Detail Ukiran Yang Presisi Dan Finishing Kayu Premium.",
        specs: { material: "Kayu Jati Solid", finish: "Black Duco", dim: "160 x 80 x 75 cm" }
    }
};

// --- FUNGSI UTAMA LOAD HALAMAN ---
function loadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = products[productId];

    if (product) {
        document.title = product.name;
        
        // Isi Data Dasar
        document.getElementById('mainImg').src = product.img;
        document.getElementById('titleMobile').innerText = product.name;
        document.getElementById('titleDesktop').innerText = product.name;
        document.getElementById('productCode').innerText = product.code;
        document.getElementById('productCategory').innerText = product.category;
        
        // Isi Deskripsi & Spesifikasi
        document.getElementById('productDesc').innerHTML = `<p>${product.desc}</p>`;
        document.getElementById('spec-material').innerText = product.specs.material;
        document.getElementById('spec-finish').innerText = product.specs.finish;
        document.getElementById('spec-dimensi').innerText = product.specs.dim;

        // --- KONFIGURASI WA & KONTAK ---
        const waNumber = "6289367563"; 
        
        // 1. Tombol Customize
        const btnCustomize = document.querySelector('.btn-brown');
        btnCustomize.onclick = () => {
            const textCustom = `Halo Rompok Kayu, saya ingin konsultasi custom untuk produk *${product.name}* (Kode: ${product.code}).`;
            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(textCustom)}`, '_blank');
        };

        // 2. Tombol Pesan Sekarang
        const btnOrder = document.querySelector('.btn-sage');
        btnOrder.onclick = () => {
            const textOrder = `Halo Rompok Kayu, saya ingin memesan produk *${product.name}* (Kode: ${product.code}). Bagaimana prosedur selanjutnya?`;
            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(textOrder)}`, '_blank');
        };

        // 3. Icon Hubungi Kami (Telepon & Email)
        const contactIcons = document.querySelectorAll('.contact-icons a');
        // Ikon Telepon (Index 0) -> Ke WhatsApp
        contactIcons[0].href = `https://wa.me/${waNumber}`;
        contactIcons[0].setAttribute('target', '_blank');
        
        // Ikon Email (Index 1) -> Ke Mailto
        contactIcons[1].href = "mailto:rompokkayu@gmail.com?subject=Tanya Produk " + product.name;

        // --- SHARE BUTTONS ---
        const currentUrl = encodeURIComponent(window.location.href);
        const shareTitle = encodeURIComponent(product.name);
        const shareIcons = document.querySelectorAll('.share-icons a');
        
        shareIcons[0].href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`; // FB
        shareIcons[1].href = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${currentUrl}`; // Twitter
        shareIcons[2].href = `https://instagram.com`; // IG
        shareIcons[3].href = `https://api.whatsapp.com/send?text=${shareTitle}%20${currentUrl}`; // WA

    } else {
        document.querySelector('.detail-wrapper').innerHTML = "<h2>Produk tidak ditemukan :(</h2><a href='index.html'>Kembali</a>";
    }
}

// --- FUNGSI GANTI TAB ---
function openTab(tabName) {
    const tabs = document.getElementsByClassName("tab-pane");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }
    const tabLinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById("content-" + tabName).style.display = "block";
    event.currentTarget.className += " active";
}

// --- FUNGSI TULIS PERTANYAAN (SIMULASI) ---
function tambahPertanyaan() {
    // 1. Minta input dari user
    let nama = prompt("Masukkan Nama Anda:", "Pengunjung");
    let pesan = prompt("Tulis pertanyaan Anda tentang produk ini:");

    // 2. Jika user mengisi pesan (tidak cancel)
    if (pesan) {
        if (!nama) nama = "Pengunjung"; // Default nama jika kosong

        // 3. Buat elemen HTML baru untuk komentar
        const commentList = document.getElementById('commentList');
        
        const newComment = document.createElement('div');
        newComment.className = 'comment-item';
        newComment.innerHTML = `
            <div class="comment-avatar"><i class="fas fa-user"></i></div>
            <div class="comment-text">
                <strong>${nama}</strong> <span class="date">Baru saja</span>
                <p>${pesan}</p>
                <div class="reply" style="background: #fff3cd; border-left-color: #ffc107;">
                    <strong>Sistem:</strong>
                    <p>Terima kasih! Pertanyaan Anda telah terkirim dan menunggu moderasi admin.</p>
                </div>
            </div>
        `;

        // 4. Masukkan ke daftar (paling atas)
        commentList.insertBefore(newComment, commentList.firstChild);

        // 5. Scroll ke komentar baru
        newComment.scrollIntoView({ behavior: 'smooth' });
    }
}

window.onload = loadProductDetail;