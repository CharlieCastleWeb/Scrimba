import recentPosts from "./data.js";

const postsDisplay = document.querySelector("#posts");
const viewMoreBtn = document.querySelector("#view-more-btn");

let recentPostsNum = 0;

viewMoreBtn.addEventListener("click", () => {
    if (recentPostsNum < recentPosts.length) {
        displayPosts(recentPostsNum);
    }
    
    if (recentPostsNum === recentPosts.length) {
        viewMoreBtn.parentElement.removeChild(viewMoreBtn);
    }
});

const displayPosts = (num) => {
    for (let i = num; i < num + 3; i++) {
        postsDisplay.innerHTML += displayPost(recentPosts[i]);
    }
    recentPostsNum += 3;
}

const displayPost = ({
    url,
    imgUrl,
    imgAlt,
    postDate,
    postTitle,
    postContent,
}) => {
    const template = `
        <div class="post">
            <a href="${url}">
                <img
                    src="${imgUrl}"
                    alt="${imgAlt}"
                >
                <p class="post-date">${postDate}</p>
                <h3>${postTitle}</h3>
                <p class="post-content">${postContent}</p>
            </a>
        </div>
        `;
    return template;
};

displayPosts(recentPostsNum);

