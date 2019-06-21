export default class GotService {

    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api';
        this.transformModify = (input, output) => {
            for (let key in input) {
                if (input[key] === '' || input[key][0] === '') {
                    output[key] = 'Have no data'
                } else {
                    output[key] = input[key]
                }
            }
            let {url} = output;
            output['id'] = url.slice(url.lastIndexOf('/') + 1);
        };
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(res.status)
        }
        return await res.json();
    }
    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=4&pageSize=10`);
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    getAllHouses = async () => {
        const res = await this.getResource(`/houses?page=3&pageSize=10`);
        return res.map(this._transformHouse);
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }
    getAllBooks = async () => {
        const res = await this.getResource(`/books?page=1&pageSize=10`);
        return res.map(this._transformBook);
    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    // трансформации данных
    _transformCharacter = (char) => {
        let modChar = {};
        this.transformModify(char, modChar);
        const {name, gender, born, died, culture, id} = modChar;
        return ({name, gender, born, died, culture, id: `char${id}`});
    }
    _transformHouse = (house) => {
        let modHouse = {};
        this.transformModify(house, modHouse);
        const {name, region, words, titles, overlord, ancestralWeapons, id} = modHouse;
        return ({name, region, words, titles, overlord, ancestralWeapons, id: `house${id}`})
    }
    _transformBook = (book) => {
        let modBook = {};
        this.transformModify(book, modBook);
        const {name, numberOfPages, released, id} = modBook;
        return ({name, numberOfPages, released, id: `book${id}`});
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