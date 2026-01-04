/* ========================================= */
/* 1. LOGIKA HERO SLIDER (Otomatis & Manual) */
/* ========================================= */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if(slides.length === 0) return; 
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function moveSlide(direction) {
    if(slides.length === 0) return;
    currentSlide += direction;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    showSlide(currentSlide);
}

let slideInterval = setInterval(() => {
    moveSlide(1);
}, 5000);

const buttons = document.querySelectorAll('.prev, .next');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => moveSlide(1), 5000);
    });
});


/* ========================================= */
/* 2. LOGIKA SEARCH & DROPDOWN */
/* ========================================= */
function showDropdown() {
    const dropdown = document.getElementById("searchDropdown");
    if(dropdown) dropdown.classList.add("show");
}

window.onclick = function(event) {
    if (!event.target.matches('#searchInput')) {
        var dropdowns = document.getElementsByClassName("search-dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function filterDropdown() {
    var input, filter, div, a, i;
    input = document.getElementById("searchInput");
    if(!input) return;
    filter = input.value.toUpperCase();
    div = document.getElementById("searchDropdown");
    if(!div) return;
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function goToSearchPage() {
    var input = document.getElementById("searchInput").value;
    if(input) {
        window.location.href = "pencarian.html?q=" + encodeURIComponent(input);
    } else {
        window.location.href = "pencarian.html";
    }
}

const searchInput = document.getElementById("searchInput");
if(searchInput){
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            goToSearchPage();
        }
    });
}


/* ========================================= */
/* 3. LOGIKA SCROLL HORIZONTAL (Produk) */
/* ========================================= */
const scrollContainer = document.getElementById('productScroll');
const btnLeft = document.getElementById('scrollLeft');
const btnRight = document.getElementById('scrollRight');

if(scrollContainer && btnRight && btnLeft) {
    btnRight.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });
    btnLeft.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });
}

const blogContainer = document.getElementById('blogScroll');
const blogBtnLeft = document.getElementById('blogLeft');
const blogBtnRight = document.getElementById('blogRight');

if(blogContainer && blogBtnLeft && blogBtnRight) {
    blogBtnRight.addEventListener('click', () => {
        blogContainer.scrollBy({ left: 320, behavior: 'smooth' });
    });
    blogBtnLeft.addEventListener('click', () => {
        blogContainer.scrollBy({ left: -320, behavior: 'smooth' });
    });
}


/* ========================================= */
/* 4. LOGIKA FILTER OTOMATIS (Pencarian Page) */
/* ========================================= */
const filterCheckboxes = document.querySelectorAll('.filter-chk');
const filterItems = document.querySelectorAll('.filter-item');

if (filterCheckboxes.length > 0) {
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                filterCheckboxes.forEach(otherBox => {
                    if (otherBox !== this) {
                        otherBox.checked = false;
                    }
                });
            }
            let selectedCategory = 'all';
            if (this.checked) {
                selectedCategory = this.value;
            }
            filterItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}


/* ========================================= */
/* 5. LOGIKA FAVORIT (WISHLIST) & CHECKOUT   */
/* ========================================= */
let favoriteItems = [];

// A. BUKA/TUTUP FAVORIT (DENGAN CEK LOGIN)
function toggleFavorite() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // Cek Login Dulu
    if (!isLoggedIn) {
        alert("Silakan Login dulu untuk melihat Favorit!");
        window.location.href = "login.html";
        return;
    }

    const overlay = document.getElementById('favoriteOverlay');
    if(overlay) overlay.classList.toggle('active');
}

// B. TAMBAH KE FAVORIT
function addToFav(btn, name, desc, imgSrc) {
    // Efek visual tombol
    btn.innerHTML = '<i class="fas fa-heart" style="color: #D32F2F;"></i>';
    
    // Cek duplikasi
    const existingItem = favoriteItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.qty++;
    } else {
        // Simulasi Harga (Karena di HTML tidak ada data harga)
        // Misal: Harga default 500rb, atau kita bisa set random biar variatif
        let estimatePrice = 500000; 
        if(name.includes("Lemari")) estimatePrice = 1200000;
        if(name.includes("Kursi")) estimatePrice = 350000;
        if(name.includes("Ranjang")) estimatePrice = 2500000;

        favoriteItems.push({ 
            name: name, 
            desc: desc, 
            img: imgSrc, 
            qty: 1,
            price: estimatePrice 
        });
    }
    
    updateFavUI();
    
    // Update Badge Notifikasi
    const badge = document.getElementById('fav-count');
    if(badge) {
        badge.innerText = favoriteItems.length;
        badge.classList.add('show');
    }
}

// C. UPDATE TAMPILAN LIST FAVORIT
function updateFavUI() {
    const listContainer = document.getElementById('favoriteList');
    if(!listContainer) return;

    listContainer.innerHTML = '';
    
    if (favoriteItems.length === 0) {
        listContainer.innerHTML = '<div class="empty-state"><p>Belum ada produk favorit.</p></div>';
        return;
    }

    favoriteItems.forEach((item, index) => {
        const itemHTML = `
            <div class="fav-item">
                <img src="${item.img}" alt="${item.name}" class="fav-img">
                <div class="fav-details">
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                    <p style="color:#A67C52; font-weight:bold; font-size:0.9rem;">Rp ${item.price.toLocaleString('id-ID')}</p>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="changeQty(${index}, -1)"><i class="fas fa-minus"></i></button>
                        <span class="qty-val">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${index}, 1)"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>`;
        listContainer.innerHTML += itemHTML;
    });
}

function changeQty(index, change) {
    favoriteItems[index].qty += change;
    if (favoriteItems[index].qty <= 0) {
        favoriteItems.splice(index, 1);
    }
    updateFavUI();
    // Update Badge
    const badge = document.getElementById('fav-count');
    if(badge) badge.innerText = favoriteItems.length;
}

// D. CHECKOUT DARI FAVORIT (FITUR BARU)
function checkoutFavorites() {
    if (favoriteItems.length === 0) {
        alert("Favorit masih kosong nih, pilih produk dulu ya!");
        return;
    }

    // SKENARIO 1: Cuma 1 Barang
    if (favoriteItems.length === 1) {
        const item = favoriteItems[0];
        buyNow(item.name, item.img, item.price * item.qty, `Jumlah: ${item.qty}`);
        return;
    }

    // SKENARIO 2: Banyak Barang (Bulk Order)
    if (favoriteItems.length > 1) {
        const confirmBulk = confirm(`Anda memiliki ${favoriteItems.length} produk di Favorit. Apakah Anda ingin memesan semuanya sekaligus?`);
        
        if (confirmBulk) {
            // Hitung Total Harga Semua Barang
            let totalPrice = 0;
            let itemNames = [];
            
            favoriteItems.forEach(item => {
                totalPrice += (item.price * item.qty);
                itemNames.push(`${item.name} (${item.qty})`);
            });

            // Gabungkan Nama Produk untuk Variant
            const variantStr = itemNames.join(", "); // Contoh: "Lemari (1), Kursi (2)"
            
            // Gunakan Gambar Produk Pertama sebagai thumbnail paket
            const mainImg = favoriteItems[0].img;

            // Kirim ke Fungsi Pembayaran sebagai "Paket Favorit"
            buyNow(`Paket Pesanan (${favoriteItems.length} Item)`, mainImg, totalPrice, variantStr);
        }
    }
}

/* ========================================= */
/* 6. SISTEM LOGIN: STATUS & TAMPILAN HEADER (FIXED) */
/* ========================================= */

// Jalankan saat halaman siap
document.addEventListener("DOMContentLoaded", function() {
    checkLoginStatus();
    setupCustomPageLogic(); // Panggil logika custom page jika ada
    setupDetailPage();      // Panggil logika detail page jika ada
    setupBlogDetail();      // Panggil logika blog detail
    setupPaymentPage();     // Panggil logika pembayaran
});

function checkLoginStatus() {
    // 1. Ambil data dari LocalStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userPhotoUrl = localStorage.getItem('userPhoto'); 
    
    // 2. Proteksi Halaman
    const path = window.location.pathname;
    if (path.includes("profile.html")) {
        if (!isLoggedIn) {
            alert("Silakan Login Terlebih Dahulu!");
            window.location.href = "login.html";
            return;
        }
    }
    if ((path.includes("login.html") || path.includes("register.html")) && isLoggedIn) {
        window.location.href = "index.html"; 
        return;
    }

    // 3. UPDATE HEADER MENGGUNAKAN ID "userBtn"
    const userLink = document.getElementById('userBtn');
    
    if(userLink) {
        if (isLoggedIn) {
            // --- KONDISI SUDAH LOGIN ---
            userLink.href = "profile.html"; 
            userLink.removeAttribute("onclick"); 
            userLink.classList.remove('icon-desktop');
            userLink.style.display = "flex";
            userLink.style.alignItems = "center";
            userLink.style.justifyContent = "center";
            userLink.style.marginLeft = "15px";
            userLink.style.width = "40px";
            userLink.style.height = "40px";
            userLink.style.borderRadius = "50%";
            userLink.style.overflow = "hidden";
            userLink.style.border = "none";

            const finalPhoto = userPhotoUrl ? userPhotoUrl : 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80';
            userLink.innerHTML = `<img src="${finalPhoto}" alt="Profil" style="width:100%; height:100%; object-fit:cover;">`;

        } else {
            // --- KONDISI TAMU ---
            userLink.href = "login.html"; 
            userLink.classList.add('icon-desktop');
            userLink.style = ""; 
            userLink.style.marginLeft = "";
            userLink.style.border = "none";
            userLink.innerHTML = '<i class="far fa-user"></i>'; 
        }
    }
}

// 7. FUNGSI LOGOUT GLOBAL
window.confirmLogout = function(e) {
    if(e) e.preventDefault(); 
    const yakin = confirm("Apakah Anda yakin ingin keluar dari akun?");
    if (yakin) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPhoto');
        alert("Anda berhasil keluar.");
        window.location.href = "index.html";
    }
}


/* ========================================= */
/* 8. LOGIKA HALAMAN CUSTOM (WARNA & UPLOAD) */
/* ========================================= */
function setupCustomPageLogic() {
    const colorTrigger = document.getElementById('colorTrigger');
    const realColorInput = document.getElementById('realColorInput');

    if (colorTrigger && realColorInput) {
        colorTrigger.addEventListener('click', () => {
            realColorInput.click();
        });
        realColorInput.addEventListener('input', (e) => {
            colorTrigger.style.backgroundColor = e.target.value;
            colorTrigger.style.border = "none"; 
        });
    }

    const btnChoose = document.getElementById('btnChoose');
    const realFileInput = document.getElementById('realFileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const dropArea = document.getElementById('dropArea');

    if (btnChoose && realFileInput) {
        btnChoose.addEventListener('click', (e) => {
            e.stopPropagation(); 
            realFileInput.click();
        });
        realFileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) showFileName(this.files[0].name);
        });
    }

    if (dropArea) {
        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropArea.style.backgroundColor = "#f0f0f0";
            dropArea.style.borderColor = "#A67C52";
        });
        dropArea.addEventListener('dragleave', () => {
            dropArea.style.backgroundColor = "white";
            dropArea.style.borderColor = "#ccc";
        });
        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            dropArea.style.backgroundColor = "white";
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                realFileInput.files = files;
                showFileName(files[0].name);
            }
        });
    }

    function showFileName(name) {
        if(fileNameDisplay) {
            fileNameDisplay.innerText = "File Terpilih: " + name;
            fileNameDisplay.style.display = "block";
            fileNameDisplay.style.color = "#A67C52";
        }
        const uploadText = document.getElementById('uploadText');
        if(uploadText) uploadText.innerHTML = "File Siap Diupload! <br> <i class='fas fa-check-circle' style='color:green; font-size:1.5rem;'></i>";
    }
}

// C. KIRIM PESANAN CUSTOM (VERSI BARU: Langsung ke Pembayaran)
// INI YANG AKANG MINTA TAMBAHKAN
window.submitCustomOrder = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(!isLoggedIn) {
        alert("Eits, Login dulu sebelum memesan custom ya!");
        window.location.href = "login.html";
        return;
    }

    const inputP = document.querySelector('input[placeholder="Panjang"]') ? document.querySelector('input[placeholder="Panjang"]').value : "-";
    const colorVal = document.getElementById('realColorInput') ? document.getElementById('realColorInput').value : "Default";
    
    // Kirim data ke fungsi BuyNow (Harga Custom misal Rp 800.000)
    // Link gambar di bawah bisa diganti dengan gambar placeholder custom
    buyNow("Custom Furniture", "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 800000, `Ukuran ${inputP}cm, Warna ${colorVal}`);
}


/* ========================================= */
/* 9. LOGIKA HALAMAN DETAIL PRODUK (DINAMIS) */
/* ========================================= */

// A. DATABASE PRODUK (Gambar SUDAH disamakan dengan file Akang)
const productsDB = [
    {
        id: 'lemari-buku',
        name: 'Lemari Buku',
        code: 'RK-LB01',
        category: 'Ruang Tamu',
        image: 'rak buku product.png', 
        description: '<p>Lemari buku kayu jati dengan desain minimalis modern. Memiliki 5 tingkat rak yang kokoh untuk menyimpan koleksi buku atau pajangan Anda.</p>',
        material: 'Kayu Jati Solid',
        finish: 'Natural Matte',
        dimensi: '60 x 40 x 180 cm'
    },
    {
        id: 'kursi-minimalis',
        name: 'Kursi Minimalis',
        code: 'RK-KM02',
        category: 'Ruang Makan',
        image: 'kursi minimalis produk.png',
        description: '<p>Kursi kayu dengan desain unik dan ergonomis. Cocok untuk kursi makan atau kursi kerja santai di rumah.</p>',
        material: 'Kayu Mahoni',
        finish: 'Varnish Gloss',
        dimensi: '45 x 45 x 90 cm'
    },
    {
        id: 'meja-rias',
        name: 'Meja Rias',
        code: 'RK-MR03',
        category: 'Kamar Tidur',
        image: 'meja rias product.png',
        description: '<p>Set meja rias lengkap dengan cermin dan kursi kecil (stool). Desain skandinavia yang simpel dan elegan.</p>',
        material: 'Kayu Jati & Cermin',
        finish: 'Natural Wood',
        dimensi: '100 x 50 x 140 cm'
    },
    {
        id: 'meja-nakas',
        name: 'Meja Nakas',
        code: 'RK-MN04',
        category: 'Kamar Tidur',
        image: 'meja nikas.png',
        description: '<p>Meja samping tempat tidur (bedside table) dengan satu laci penyimpanan. Mungil namun fungsional.</p>',
        material: 'Kayu Pinus',
        finish: 'Duco White/Natural',
        dimensi: '40 x 40 x 50 cm'
    },
    {
        id: 'mimbar',
        name: 'Mimbar Kayu',
        code: 'RK-MK05',
        category: 'Khusus',
        image: 'mimbar product.png',
        description: '<p>Mimbar podium untuk keperluan pidato atau ceramah. Dibuat dengan konstruksi yang kokoh dan desain formal.</p>',
        material: 'Jati Grade A',
        finish: 'Melamine',
        dimensi: '60 x 50 x 120 cm'
    },
    {
        id: 'ranjang-kayu',
        name: 'Ranjang Kayu',
        code: 'RK-RK06',
        category: 'Kamar Tidur',
        image: 'bed product.png',
        description: '<p>Rangka tempat tidur (dipan) minimalis. Kuat menopang kasur springbed ukuran Queen/King.</p>',
        material: 'Jati Belanda',
        finish: 'Clear Coat',
        dimensi: '160 x 200 cm (Queen)'
    },
    {
        id: 'lemari-laci',
        name: 'Lemari Laci',
        code: 'RK-LL07',
        category: 'Penyimpanan',
        image: 'lemari laci product.png',
        description: '<p>Lemari kabinet dengan banyak laci (drawer). Solusi penyimpanan baju, dokumen, atau barang kecil lainnya.</p>',
        material: 'Kayu Solid',
        finish: 'Natural',
        dimensi: '80 x 45 x 100 cm'
    },
    {
        id: 'rak-gelas',
        name: 'Rak Gelas',
        code: 'RK-RG08',
        category: 'Dapur',
        image: 'rak gelas.png',
        description: '<p>Rak gantung atau berdiri untuk menyimpan gelas dan mug. Menambah estetika dapur atau ruang makan Anda.</p>',
        material: 'Kayu Jati',
        finish: 'Waterproof Coat',
        dimensi: '30 x 30 x 150 cm'
    }
];

// B. FUNGSI SETUP HALAMAN DETAIL
function setupDetailPage() {
    const mainImg = document.getElementById('mainImg');
    if (!mainImg) return; 

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = productsDB.find(p => p.id === productId);

    if (product) {
        document.getElementById('mainImg').src = product.image;
        document.getElementById('mainImg').alt = product.name;
        
        if(document.getElementById('titleMobile')) document.getElementById('titleMobile').innerText = product.name;
        if(document.getElementById('titleDesktop')) document.getElementById('titleDesktop').innerText = product.name;
        
        if(document.getElementById('productCode')) document.getElementById('productCode').innerText = product.code;
        if(document.getElementById('productCategory')) document.getElementById('productCategory').innerText = product.category;
        
        if(document.getElementById('productDesc')) document.getElementById('productDesc').innerHTML = product.description;
        if(document.getElementById('spec-material')) document.getElementById('spec-material').innerText = product.material;
        if(document.getElementById('spec-finish')) document.getElementById('spec-finish').innerText = product.finish;
        if(document.getElementById('spec-dimensi')) document.getElementById('spec-dimensi').innerText = product.dimensi;

    } else {
        if(document.getElementById('titleDesktop')) document.getElementById('titleDesktop').innerText = "Produk Tidak Ditemukan";
    }
}

// C. FUNGSI GANTI TAB
window.openTab = function(tabName) {
    const contents = document.querySelectorAll('.tab-pane');
    contents.forEach(content => content.style.display = 'none');

    const tabs = document.querySelectorAll('.tab-link');
    tabs.forEach(tab => tab.classList.remove('active'));

    document.getElementById('content-' + tabName).style.display = 'block';
    
    const clickedBtn = Array.from(tabs).find(btn => btn.textContent.toLowerCase().includes(tabName) || btn.textContent.toLowerCase().includes(tabName.substring(0,3)));
    if(clickedBtn) clickedBtn.classList.add('active');
}

window.tambahPertanyaan = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(!isLoggedIn) {
        alert("Silakan Login dulu untuk bertanya.");
        window.location.href = "login.html";
        return;
    }
    const tanya = prompt("Tulis pertanyaan Anda:");
    if(tanya) {
        const list = document.getElementById('commentList');
        const newItem = `
            <div class="comment-item">
                <div class="comment-avatar"><i class="fas fa-user"></i></div>
                <div class="comment-text">
                    <strong>Anda</strong> <span class="date">Baru saja</span>
                    <p>${tanya}</p>
                </div>
            </div>`;
        list.innerHTML += newItem;
    }
}


/* ========================================= */
/* 10. LOGIKA HALAMAN DETAIL BLOG (BARU)     */
/* ========================================= */

// A. DATABASE BLOG
const blogsDB = [
    {
        id: 'tips-merawat',
        title: 'Tips merawat furniture kayu agar tahan lama dan tetap mengkilap',
        date: '12 Jan 2026',
        tag: 'Tips & Trik',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        content: `
            <p>Furniture kayu memang memberikan kesan hangat dan elegan pada rumah. Namun, perawatannya membutuhkan perhatian khusus agar tidak mudah lapuk atau kusam.</p>
            <h3>1. Hindari Sinar Matahari Langsung</h3>
            <p>Paparan sinar matahari terus-menerus dapat membuat warna kayu memudar dan lapisan finishing menjadi retak. Gunakan tirai jika furniture berada dekat jendela.</p>
            <h3>2. Bersihkan Debu Secara Rutin</h3>
            <p>Gunakan kain microfiber yang lembut untuk mengelap debu. Hindari kain kasar yang bisa menggores permukaan kayu.</p>
            <h3>3. Gunakan Polish Khusus Kayu</h3>
            <p>Sebulan sekali, oleskan cairan pemoles (furniture polish) untuk menjaga kelembaban kayu dan membuatnya tetap mengkilap.</p>
        `
    },
    {
        id: 'ruang-kerja',
        title: 'Menata ruang kerja minimalis untuk produktivitas maksimal',
        date: '10 Jan 2026',
        tag: 'Inspirasi',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        content: `
            <p>Ruang kerja yang berantakan seringkali membunuh produktivitas. Konsep minimalis bukan hanya soal estetika, tapi juga fungsi.</p>
            <h3>Pencahayaan Adalah Kunci</h3>
            <p>Pastikan meja kerja Anda mendapatkan cahaya alami yang cukup. Jika tidak memungkinkan, gunakan lampu meja dengan temperatur warna yang nyaman di mata.</p>
            <h3>Manajemen Kabel</h3>
            <p>Gunakan cable organizer agar kabel laptop dan charger tidak berseliweran di atas meja. Meja yang bersih membuat pikiran lebih jernih.</p>
        `
    },
    {
        id: 'tren-interior',
        title: 'Tren interior 2026: Kembali ke konsep alam dengan material kayu',
        date: '05 Jan 2026',
        tag: 'Desain',
        image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        content: `
            <p>Tahun 2026 diprediksi akan menjadi tahun kembalinya material alami. Orang-orang mulai meninggalkan plastik dan logam dingin, beralih ke kehangatan kayu.</p>
            <p>Desain Japandi (Japanese-Scandinavian) masih menjadi primadona, menggabungkan fungsionalitas Skandinavia dengan estetika pedesaan Jepang yang menenangkan.</p>
        `
    },
    {
        id: 'beda-kayu',
        title: 'Mengenal perbedaan kayu jati, mahoni, dan sungkai',
        date: '02 Jan 2026',
        tag: 'Material',
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        content: `
            <p>Bingung memilih jenis kayu untuk furniture custom Anda? Berikut panduan singkatnya:</p>
            <ul>
                <li><strong>Jati:</strong> Sangat kuat, tahan rayap, serat indah, harga premium. Cocok untuk outdoor.</li>
                <li><strong>Mahoni:</strong> Serat halus, warna kemerahan, mudah dibentuk. Cocok untuk furniture ukiran klasik.</li>
                <li><strong>Sungkai:</strong> Warna terang (kuning gading), serat lurus eksotis. Favorit untuk desain minimalis modern.</li>
            </ul>
        `
    }
];

// B. FUNGSI SETUP HALAMAN DETAIL BLOG
function setupBlogDetail() {
    const blogTitle = document.getElementById('blogTitle');
    if (!blogTitle) return; 

    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');
    const blog = blogsDB.find(b => b.id === blogId);

    if (blog) {
        document.getElementById('blogImg').src = blog.image;
        document.getElementById('blogTitle').innerText = blog.title;
        document.getElementById('blogDate').innerText = blog.date;
        document.getElementById('blogTag').innerText = blog.tag;
        document.getElementById('blogContent').innerHTML = blog.content; 
    } else {
        document.getElementById('blogTitle').innerText = "Artikel Tidak Ditemukan";
    }
}


/* ========================================= */
/* 11. SISTEM PEMBAYARAN (INTEGRASI)         */
/* ========================================= */

// A. FUNGSI "PESAN SEKARANG" (Di Halaman Detail/Custom)
// Fungsi ini menyimpan data produk ke memori browser lalu pindah halaman
function buyNow(productName, productImg, productPrice, variant = "-") {
    // 1. Cek Login
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(!isLoggedIn) {
        alert("Silakan Login Terlebih Dahulu untuk memesan!");
        window.location.href = "login.html";
        return;
    }

    // 2. Siapkan Data Pesanan
    const price = productPrice || 500000; 

    const orderData = {
        name: productName,
        image: productImg,
        variant: variant,
        price: price
    };

    // 3. Simpan ke LocalStorage
    localStorage.setItem('checkoutData', JSON.stringify(orderData));

    // 4. Pindah ke Halaman Pembayaran
    window.location.href = "pembayaran.html";
}

// B. SETUP HALAMAN PEMBAYARAN (Di pembayaran.html)
function setupPaymentPage() {
    const payName = document.getElementById('payName');
    if(!payName) return; 

    const dataJSON = localStorage.getItem('checkoutData');
    if(!dataJSON) {
        alert("Tidak ada pesanan. Kembali ke beranda.");
        window.location.href = "index.html";
        return;
    }

    const orderData = JSON.parse(dataJSON);

    document.getElementById('payName').innerText = orderData.name;
    document.getElementById('payImg').src = orderData.image;
    document.getElementById('payVariant').innerText = "Variant: " + orderData.variant;

    const subtotal = orderData.price;
    const discount = 100000;
    const total = subtotal - discount;

    const fmt = (num) => "Rp " + num.toLocaleString('id-ID');

    document.getElementById('paySubtotal').innerText = fmt(subtotal);
    document.getElementById('payTotalFinal').innerText = fmt(total);
    document.getElementById('payTotalButton').innerText = fmt(total);
}

// C. PILIH BANK (Visual Only)
window.selectBank = function(el) {
    document.querySelectorAll('.bank-card').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
}

// D. PROSES BAYAR (UPDATE: Arahkan ke Halaman VA)
window.processPayment = function() {
    const btn = document.querySelector('.btn-pay-now');
    btn.innerText = "Memproses...";
    btn.style.opacity = "0.7";
    
    // Simulasi loading 1 detik, lalu pindah halaman
    setTimeout(() => {
        // Jangan hapus data dulu, karena nanti mau dipake di halaman akhir kalau perlu
        // Langsung pindah ke halaman Virtual Account
        window.location.href = "virtual-account.html"; 
    }, 1000);
}
// UPDATE: Hapus Produk
window.hapusProduk = function() {
    if(confirm("Hapus produk ini dari pesanan?")) {
        localStorage.removeItem('checkoutData');
        window.location.href = "index.html";
    }
}
/* ========================================= */
/* 12. LOGIKA RIWAYAT PESANAN (PROFIL)       */
/* ========================================= */

function setupProfilePage() {
    const historyContainer = document.getElementById('orderHistoryList');
    if(!historyContainer) return; // Kalau bukan halaman profile, stop.

    // 1. Ambil data dari LocalStorage
    const historyList = JSON.parse(localStorage.getItem('orderHistory')) || [];

    // 2. Cek jika kosong
    if(historyList.length === 0) {
        historyContainer.innerHTML = `
            <div style="text-align:center; padding: 40px; color: #999; background: #f9f9f9; border-radius: 10px;">
                <i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 10px;"></i>
                <p>Belum ada pesanan nih.</p>
                <a href="index.html#shop" style="color: #A67C52; font-weight:bold; text-decoration:none;">Belanja Sekarang</a>
            </div>
        `;
        return;
    }

    // 3. Render Daftar Pesanan (Looping)
    let htmlContent = '';
    
    historyList.forEach(order => {
        htmlContent += `
        <div class="order-card" style="background: white; border: 1px solid #eee; border-radius: 10px; padding: 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); border-left: 5px solid #A67C52;">
            
            <div style="display: flex; gap: 20px; align-items: center;">
                <img src="${order.image}" alt="Produk" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;">
                
                <div>
                    <h4 style="font-size: 1.1rem; color: #333; margin-bottom: 5px;">
                        ${order.name} <span style="font-weight:400; color:#888; font-size:0.9rem;">(${order.variant})</span>
                    </h4>
                    <p style="color: #666; font-size: 0.9rem;">${order.date}</p>
                </div>
            </div>

            <div style="background-color: #FFF8E1; color: #FBC02D; padding: 8px 20px; border-radius: 5px; font-weight: 700; font-size: 0.9rem;">
                ${order.status}
            </div>

        </div>
        `;
    });

    historyContainer.innerHTML = htmlContent;
}

// UPDATE EVENT LISTENER (Tambahkan setupProfilePage)
document.addEventListener("DOMContentLoaded", function() {
    checkLoginStatus();
    setupCustomPageLogic();
    setupDetailPage();
    setupBlogDetail();
    setupPaymentPage();
    setupProfilePage(); // <-- PANGGIL INI
});
document.addEventListener('DOMContentLoaded', () => {
    
    // Opsi untuk Observer (threshold 0.2 berarti animasi mulai saat 20% elemen terlihat)
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Hentikan observasi setelah animasi berjalan sekali
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Pilih semua elemen yang ingin dianimasikan
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Tambahan: Smooth scroll untuk link navigasi (opsional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
