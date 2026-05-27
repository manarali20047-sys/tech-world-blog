let allPosts = [];
let likes = JSON.parse(localStorage.getItem("likes")) || {};

// =========================
// تحميل البيانات
// =========================
fetch("posts.json")
  .then(res => res.json())
  .then(data => {
    allPosts = data;

    displayPosts(allPosts);
    showFeatured(allPosts);
  });

// =========================
// عرض البوستات
// =========================
function displayPosts(posts){
    let container = document.querySelector(".posts");
    container.innerHTML = "";

    posts.forEach((post, index) => {

        container.innerHTML += `
        <div class="post-card" data-category="${post.category}">

            <img src="${post.image}">
            <h3>${post.title}</h3>

            <p>${post.description}</p>

            <div class="actions">

                <button onclick="likePost(${index})">
                    ❤️ <span id="like-${index}">${likes[index] || 0}</span>
                </button>

                <a href="post.html?id=${index}">
                    <button>Read More</button>
                </a>

            </div>

        </div>
        `;
    });

    // تحديث اللايكات
    setTimeout(() => {
        Object.keys(likes).forEach(id => {
            let el = document.getElementById("like-" + id);
            if(el){
                el.innerText = likes[id];
            }
        });
    }, 100);
}

// =========================
// فلترة البوستات
// =========================
function filterPosts(category){
    if(category === "all"){
        displayPosts(allPosts);
    } else {
        let filtered = allPosts.filter(p => p.category === category);
        displayPosts(filtered);
    }
}

// =========================
// البحث
// =========================
document.querySelector(".search").addEventListener("input", function(e){
    let value = e.target.value.toLowerCase();

    let filtered = allPosts.filter(post =>
        post.title.toLowerCase().includes(value) ||
        post.description.toLowerCase().includes(value)
    );

    displayPosts(filtered);
});

// =========================
// اللايك
// =========================
function likePost(id){

    if(!likes[id]){
        likes[id] = 0;
    }

    likes[id]++;

    localStorage.setItem("likes", JSON.stringify(likes));

    document.getElementById("like-" + id).innerText = likes[id];
}

// =========================
// Featured Article
// =========================
function showFeatured(posts){

    let featured = posts[0];

    let container = document.getElementById("featured");

    if(!container) return;

    container.innerHTML = `
        <img src="${featured.image}">
        <h3>${featured.title}</h3>
        <p>${featured.description}</p>
    `;

    container.onclick = () => {
        window.location.href = "post.html?id=0";
    };
}

// =========================
// Dark / Light Mode
// =========================
document.addEventListener("DOMContentLoaded", function(){

    let button = document.getElementById("toggleMode");

    if(button){
        button.addEventListener("click", function(){

            document.body.classList.toggle("light");

            if(document.body.classList.contains("light")){
                button.innerText = "☀️";
            } else {
                button.innerText = "🌙";
            }
        });
    }

});