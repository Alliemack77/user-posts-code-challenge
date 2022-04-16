document.addEventListener('readystatechange', (event) => {
    if(event.target.readyState === 'complete') {
        initApp();
    }
})

const initApp = async () => {
    const users = await getAllUsers(); 
    if(users.length) {
        processUsers(users);
    }

    getUserPosts(users) 
}
 
const getAllUsers = async () => {

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await response.json();
        return data;

    } catch (err) {
        console.error(err)
    }
}

const processUsers = (users) => {
    users.forEach(user => {
        const authorItem = createAuthor(user);
        authors.append(authorItem);
    })  
}

const getUserPosts =  (users) => {
    
    users.forEach(async (user) => {
        const author = document.querySelector(`#author-${user.id}`);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
            const data = await response.json();
            const posts = createPosts(data);
            author.append(posts)
        } catch (error) {
            console.error(error)
        }
    })
}

const createPosts = (data) => {
    const posts = document.createElement('div');
    posts.setAttribute('id', 'author-posts')
    posts.classList.add('author-posts');
    posts.classList.add('none');

    data.forEach(item => {
        const post = document.createElement('div');
        post.classList.add('post');

        const title = document.createElement('h3');
        title.classList.add('post-title');
        title.textContent = item.title;
        post.append(title);

        const body = document.createElement('p');
        body.classList.add('post-body');
        body.textContent = item.body;
        post.append(body);
        posts.append(post);

    })
    return posts;
}

const createAuthor = (user) => {
    const author = document.createElement('div');
    author.setAttribute('id', `author-${user.id}` )
    author.classList.add('author');
    // author.setAttribute('id','author');

    const authorDescription = document.createElement('div');
    authorDescription.classList.add('author-description');
    author.append(authorDescription);

    const name = document.createElement('h2');
    name.classList.add('author-name'); 
    name.textContent = user.name;
    authorDescription.append(name);

    const btns = createButtons(user);
    authorDescription.append(btns);

    return author;
}

const createButtons = (user) => {
    

    const btns = document.createElement('div');
    btns.classList.add('btns');
    btns.addEventListener('click', () => showPosts(user)); // instead just have click event toggle posts div visability by adding/removing class

    // "All posts" btn
    const closeBtn = document.createElement('div');
    closeBtn.setAttribute('id', 'close');
    closeBtn.classList.add('none');
    closeBtn.classList.add('btn');
    closeBtn.classList.add('close');
    const closeBtnText = document.createElement('p');
    closeBtnText.textContent= 'All posts';
    closeBtn.append(closeBtnText);
    const closeToggle = document.createElement('i');
    closeToggle.classList.add("fa-solid");
    closeToggle.classList.add("fa-angle-down");
    closeBtn.append(closeToggle);
    btns.append(closeBtn);

    // "See all posts" btn
    const openBtn = document.createElement('div');
    openBtn.setAttribute('id', 'open');
    openBtn.classList.add('btn');
    openBtn.classList.add('open');
    const openBtnText = document.createElement('p');
    openBtnText.textContent = 'See all posts';
    openBtn.append(openBtnText);
    const openToggle = document.createElement('i');
    openToggle.classList.add('fa-solid');
    openToggle.classList.add('fa-angle-right');
    openBtn.append(openToggle);
    btns.append(openBtn);

    return btns;
}

const showPosts = (user) => {
    const authorPostsDiv = document.querySelector(`#author-${user.id} > #author-posts`);
    authorPostsDiv.classList.toggle('none');

    const closeBtn = document.querySelector(`#author-${user.id} #close`);
    closeBtn.classList.toggle('none');

    const openBtn = document.querySelector(`#author-${user.id} #open`);
    openBtn.classList.toggle('none');
}


