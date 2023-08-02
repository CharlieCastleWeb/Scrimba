const posts = [
  {
    id: "0",
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "assets/images/avatar-vangogh.jpg",
    post: "assets/images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    likes: 21,
  },
  {
    id: "1",
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "assets/images/avatar-courbet.jpg",
    post: "assets/images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    likes: 4,
  },
  {
    id: "2",
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "assets/images/avatar-ducreux.jpg",
    post: "assets/images/post-ducreux.jpg",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: 152,
  },
];

const contentSection = document.querySelector(".content");
const heartIcons = document.querySelector(".heart-icon");

const renderPosts = () => {
  posts.forEach(
    ({ id, avatar, name, location, post, likes, username, comment }) => {
        const likedPost = localStorage.getItem(`${id}_liked`);
        contentSection.innerHTML += `
        <div class="post" id="${id}">
            <div class="post-header">
              <img src=${avatar} alt="User avatar" class="avatar"/>
              <div>
                <p class="post-user">${name}</p>
                <p>${location}</p>
              </div>
            </div>
            <img
              src=${post}
              alt="User post"
              class="post-image"
            />
            <div class="social-interactions">
              <img 
                src="./assets/images/icon-heart.png" 
                alt="Heart icon"
                class=${likedPost ? "liked": ""}
                id="heart-icon-${id}" 
                onclick="updateLikes(event, ${id})"
                />
              <img src="./assets/images/icon-comment.png" alt="Heart icon" />
              <img src="./assets/images/icon-dm.png" alt="Heart icon" />
            </div>
            <p class="likes-count">${likes} likes</p>
            <div class="comment">
              <span class="comment-user">${username}</span
              ><span>${comment}</span>
            </div>
          </div>
          <!-- End of post -->
        `;
    }
  );
};

const updateLikes = (event, id) => {
  if (!localStorage.getItem(`${id}_liked`)) {
    posts[id].likes++;
    localStorage.setItem(`${id}_liked`, true);
    event.target.classList.add("liked");
} else {
    localStorage.removeItem(`${id}_liked`);
    posts[id].likes--;
    event.target.classList.remove("liked");
  }
  event.target.parentElement.parentElement.querySelector(
    ".likes-count"
  ).textContent = `${posts[id].likes} likes`;
};

renderPosts();
