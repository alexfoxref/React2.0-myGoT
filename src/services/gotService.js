export default class GotService {

    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(410)
        }
        return await res.json();
    }
    async getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    async getAllHouses() {
        const res = await this.getResource(`/houses?page=2&pageSize=10`);
        return res.map(this._transformHouse);
    }
    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }
    async getAllBooks() {
        const res = await this.getResource(`/books?page=2&pageSize=10`);
        return res.map(this._transformBook);
    }
    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    // трансформации данных
    transformModify(input, output) {
        for (let key in input) {
            if (input[key] === '') {
                output[key] = 'Have no data'
            } else {
                output[key] = input[key]
            }
        }
    }

    _transformCharacter(char) {
        let modChar = {};
        this.transformModify(char, modChar);
        const {name, gender, born, died, culture} = modChar;
        return ({name, gender, born, died, culture});
    }
    _transformHouse(house) {
        let modHouse = {};
        this.transformModify(house, modHouse);
        const {name, region, words, titles, overlord, ancestralWeapons} = modHouse;
        return ({name, region, words, titles, overlord, ancestralWeapons})
    }
    _transformBook(book) {
        let modBook = {};
        this.transformModify(book, modBook);
        const {name, numberOfPages, released} = modBook;
        return ({name, numberOfPages, released});
    }
}

// const got = new GotService();

// got.getAllCharacters()
//     .then(res => console.log(res));

// got.getCharacter(134)
//     .then(res => console.log(res));

// got.getAllHouses()
//     .then(res => console.log(res));

// got.getHouse(13)
//     .then(res => console.log(res));

// got.getAllBooks()
//     .then(res => console.log(res));

// got.getBook(5)
//     .then(res => console.log(res));