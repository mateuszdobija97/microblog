import { posts } from './data.js';
import { articles } from './data.js';

const addBtn = document.querySelector('.posts__add-post');
const articlesHeader = document.querySelector('.articles__header');
const articlesWrapper = document.querySelector('.articles__result');
const postsWrapper = document.querySelector('.posts__result');
const authorValue = document.querySelector('.posts__input-author');
const msgValue = document.querySelector('.posts__input-message');

articlesHeader.innerText = `Articles - Count: ${articles.length}`;
let currentPosts = posts;

const buildPostElement = (id, author, txt) => {
    const postS = document.createElement('section');
            postS.classList.add('post');
            postS.classList.add('posts__post');
            postS.id = id;

    const postI = document.createElement('i');
            postI.classList.add('post__icon-author');
            postI.classList.add('fas');
            postI.classList.add('fa-user');

    const postPAuthor = document.createElement('p');
            postPAuthor.classList.add('post__author');
            postPAuthor.innerText = author;

    const postPText = document.createElement('p');
            postPText.classList.add('post__text');
            postPText.innerText = txt;
    const postBtn = document.createElement('button');
            postBtn.classList.add('post__btn-remove');
            postBtn.innerText = 'X';
            postBtn.addEventListener('click', () => removePost(id), false);
    const postILike = document.createElement('i');
        postILike.classList.add('post__icon-like');
        postILike.classList.add('far');
        postILike.classList.add('fa-thumbs-up');
        postILike.addEventListener('click', () => postILike.style.color = 'blue');
        postILike.addEventListener('dblclick', () => postILike.style.color = 'white');

    postS.appendChild(postI);
    postS.appendChild(postPAuthor);
    postS.appendChild(postPText);
    postS.appendChild(postBtn);
    postS.appendChild(postILike);
    postsWrapper.appendChild(postS);
}

const removePost = id => {
    const filteredPosts = currentPosts.filter(post => post.id !== id);
    currentPosts = filteredPosts;
    postsWrapper.innerHTML = '';
    displayPosts(currentPosts);
}

const addNewPost = () => {

    const randomId = Math.floor(Math.random() * 1000);
    const newPost = {
        id: randomId,
        author: authorValue.value,
        txt: msgValue.value
    };

    if(authorValue.value && msgValue.value) {
        alert('The post has been added!')

        posts.push(newPost)
        buildPostElement(randomId, authorValue.value, msgValue.value)
    }
    else if(!authorValue.value || !msgValue.value) {
        alert('Complete the form...')
    }

    authorValue.value = '';
    msgValue.value = '';
}

const displayPosts = data => {
    const divElement = document.createElement('div');
    divElement.innerHTML = data
        .map(singleData => {
            buildPostElement(singleData.id, singleData.author, singleData.txt)
    })
    .join('');

    postsWrapper.appendChild(divElement)
}

const displayArticles = data => {
    const divElement = document.createElement('div');
    divElement.classList.add('article__wrapper');
    divElement.innerHTML = data
        .map(singleData => {
            const article = document.createElement('article');
                article.classList.add('article__article')
            
            const h3 = document.createElement('h3');
                h3.classList.add('article__title');
                h3.innerText = singleData.title;
                article.appendChild(h3);

            const h4 = document.createElement('h4');
                h4.classList.add('article__author');
                h4.innerText = singleData.author;
                article.appendChild(h4);

            const p = document.createElement('p');
                p.classList.add('article__text');
                p.innerText = singleData.txt;
                article.appendChild(p);

            articlesWrapper.appendChild(article);
    })
    .join('');
    articlesWrapper.appendChild(divElement)
}

addBtn.addEventListener('click', addNewPost, false);
displayPosts(posts);
displayArticles(articles);