const fs = require ('fs')
const yargs = require ('yargs')

function loadDatas(path) {
    let data = fs.readFileSync(path);
    return JSON.parse(data.toString());
}

yargs
.command({
    command: 'add',
    describe: 'add new content',
    builder: {
        title: {
            describe: 'title of the content',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'body of the content',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log("Add Note")
        const titleNote = argv.title;
        fs.appendFile('./datas/note.json', titleNote + "\n", (err) => {
            if (err) throw err;
            console.log(`Ajout de la note : ${argv.title} ${argv.body}`)
        });
    }})
.command({
    command: 'list',
    describe: 'List all title',
    handler: () => {
        console.log(`Liste des Notes`);
        let notes = loadDatas('./datas/note.json');
        notes.map(note => console.log(`${note.title}`))
        }
    })
.argv