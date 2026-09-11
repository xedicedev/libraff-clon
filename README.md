## Layihə Haqqında
**Decision Board**, komandalar və ya fərdi istifadəçilər üçün qərar qəbul etmə prosesini sadələşdirən minimalist bir platformadır. İstifadəçilər yeni suallar/mövzular əlavə edə, mövcud variantlara səs verə, nəticələri faiz nisbəti ilə görsel olaraq izləyə və lazımi qərarları idarə edə bilərlər. Tətbiq tam responsive (hər növ ekrana uyğunlaşan) dizayna malikdir.
# Decision Board (Qərarlar Reyestri)
Prosesləri və qərarları idarə etmək, müxtəlif variantlar üzrə səsvermə keçirmək və nəticələri real vaxt rejimində izləmək üçün hazırlanmış interaktiv veb tətbiq.
## İstifadə Olunan Texnologiyalar
* **React** (v18+) — İstifadəçi interfeysinin (UI) reaktiv qurulması üçün.
* **JavaScript (ES6+)** — Əsas məntiq və state idarəetməsi üçün.
* **Bootstrap 5 / CSS3** — Responsive layout, grid sistemi və vizual üslub üçün.
* **Lucide React** — Minimalist və müasir ikonlar üçün (`Plus`, `Trash2`, `X`).
* **Web Storage API (localStorage)** — Məlumatların brauzer yaddaşında qalıcı saxlanılması üçün.
## Əsas Funksiyalar
1. **Qərarların Siyahılanması və İdarəsi:**
   * Sol paneldə bütün qərarların növbəli sırayla (01, 02, 03...) nümayiş olunması.
   * Qərarların ümumi səs sayının göstərilməsi.
   * Arzuolunmayan qərarların silinməsi imkanı.
2. **Dinamik Sual və Variant Əlavə Etmə:**
   * Modal (açılan pəncərə) vasitəsilə yeni sual və minimum 2 variant əlavə etmək imkanı.
   * Variantların sayını istəyə uyğun olaraq artırmaq və ya silmək.
3. **İnteraktiv Səsvermə və Vizual Faizlər:**
   * Variantlara klikləməklə səsvermə.
   * Səslərin ümumi saya nisbətdə faizlə hesablanması və arxa fonda dolan animasiyalı progress-bar vasitəsilə vizuallaşdırılması.
4. **Məlumatların Qalıcılığı (Persistence):**
   * Brauzer yeniləndikdə və ya bağlandıqda verilərin itməməsi üçün localStorage inteqrasiyası.
## Qərar Verdiyiniz Texniki Yanaşmalar
### 1. Təkrar Səslərin İdarə Olunması (Vote Idempotency)
İstifadəçinin eyni variantı dəfələrlə klikləyərək səs sayını yanlış artırmasının qarşısını almaq üçün **State Level Tracking** tətbiq edilmişdir:
* **Eyni Seçimə Təkrar Klik:** Hər bir qərar üçün state-də `selectedOptionId` saxlanılır. İstifadəçi artıq seçdiyi varianta yenidən kliklədikdə funksiya `early return` edir və state dəyişmir.
* **Seçimin Dəyişdirilməsi:** İstifadəçi başqa varianta kliklədikdə, əvvəlki variantın səs sayı 1 vahid azaldılır, yeni seçimin səs sayı 1 vahid artırılır. Bu sayədə ümumi səs balansı dəqiq qalır.
### 2. Layout və Scroll Problemlərinin Həlli
Sol menyuda uzun başlıqların daxil edilməsi zamanı yaranan üfüqi daşmanın (horizontal overflow) qarşısını almaq üçün Flexbox konteynerlərinə `minWidth: 0` və Bootstrap-in `text-break` klasları tətbiq olunmuşdur.
### 3. Effektiv State və LocalStorage İnteqrasiyası
Məlumatların `localStorage`-dən oxunması React state-inin ilkin dəyərində lazy initialization `useState(() => ...)` ilə aparılır ki, bu da hər render zamanı lazımsız disk oxunmalarının (I/O) qarşısını alır.
## Layihənin Necə İşə Salınması
Layihəni öz kompüterinizdə lokal olaraq başlatmaq üçün aşağıdakı addımları izləyin:
### Tələblər:
* Kompüterinizdə **Node.js** (v16 və ya daha yuxarı) quraşdırılmalıdır.
### Addımlar:
1. **Repozitoriyanı klonlayın və ya qovluğa keçin:**
   ```bash
   git clone [https://github.com/istifadeci-adiniz/layihe-adi.git](https://github.com/istifadeci-adiniz/layihe-adi.git)
   cd layihe-adi