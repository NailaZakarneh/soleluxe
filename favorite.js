

// جلب الحالات المحفوظة من localStorage أو إنشاء كائن جديد
let favorites = JSON.parse(localStorage.getItem('favorites')) || {};

// دالة لتحديث حالة أزرار الهارت عند تحميل الصفحة
function updateHeartButtons() {
  document.querySelectorAll('.heart-btn').forEach(btn => {
    const id = btn.dataset.id;
    if (favorites[id]) {
      btn.classList.add('btn-danger');  
      btn.classList.remove('btn-outline-danger'); // إزالة اللون الأبيض
      btn.querySelector('i').classList.remove('bi-heart');
      btn.querySelector('i').classList.add('bi-heart-fill');
    } else {
      btn.classList.remove('btn-danger');
      btn.classList.add('btn-outline-danger');
      btn.querySelector('i').classList.add('bi-heart');
      btn.querySelector('i').classList.remove('bi-heart-fill');
    }
  });
}

// حدث الضغط على زر الهارت
function setupHeartButtons() {
  document.querySelectorAll('.heart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (favorites[id]) {
        // إذا مفعّل، نلغي التفعيل
        delete favorites[id];
      } else {
        // إذا غير مفعّل، نفعل
        favorites[id] = true;
      }
      // حفظ الحالة في localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
      updateHeartButtons();
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  setupHeartButtons();
  updateHeartButtons();
});

function toggleFavorite(el) {
  const id = el.dataset.id;
  const name = el.dataset.name;
  const price = parseFloat(el.dataset.price);
  const image = el.dataset.image;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const index = favorites.findIndex(item => item.id === id);

  if (index === -1) {
    // أضف للمفضلة
    favorites.push({ id, name, price, image });
    el.classList.add("favorited");
  } else {
    // أزالة من المفضلة
    favorites.splice(index, 1);
    el.classList.remove("favorited");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// تفعيل القلوب المحفوظة عند التحميل
document.addEventListener("DOMContentLoaded", () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  document.querySelectorAll(".heart-icon").forEach(icon => {
    const id = icon.dataset.id;
    if (favorites.find(item => item.id === id)) {
      icon.classList.add("favorited");
    }
  });
});


