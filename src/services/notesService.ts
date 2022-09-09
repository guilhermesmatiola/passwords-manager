import * as secure_notesRepository from "../repositories/notesRepository.js"

export async function createNote(data: secure_notesRepository.TypeNewNote) {
    await checkNoteTitleExist(data.owner_id, data.title);

	await secure_notesRepository.insert(data);
}

async function checkNoteTitleExist(owner_id: number, title: string) {
	const note = await secure_notesRepository.getNoteByTitle(owner_id, title);

	if (note.length)
		throw {	code: "Conflict",message: "Já existe uma nota com esse nome. Exclua a outra ou altere o nome.",	};
}

export async function sendNotesFromUser(id: number) {
    const notes = await secure_notesRepository.getAllNotes(id);

	return notes;
}

export async function getNoteById(id: number, owner_id: number) {
    const note = await checkNote(id, owner_id);

	return note;
}

export async function deleteNote(id:number, owner_id:number) {
    await checkNote(id, owner_id);

	await secure_notesRepository.deleteNote(id);
}

async function checkNote(noteId: number, owner_id: number) {
	const note = await secure_notesRepository.getNoteById(noteId);

	if (!note) throw { code: "NotFound", message: "Essa nota não existe" };

	if (note.owner_id !== owner_id)
		throw {	code: "Anauthorized",message: "Esse item não pertence a você",
		};

	return note;
}