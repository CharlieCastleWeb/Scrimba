
const quote = document.querySelector("h1");
const author = document.querySelector("h2");

const displayNewQuote = () => {
    const newQuote = quotes[Math.floor(Math.random()*5)];
    quote.innerHTML = newQuote.quote;
    author.innerHTML = newQuote.author;
}

const displayNewBackground = () => {
    const newNum = (Math.floor(Math.random()*5))+1;
    document.body.style.backgroundImage = `url(./images/${newNum}.jpg)`;
}

displayNewQuote();
displayNewBackground();