import * as cardsRepository from "../repositories/cardsRepository.js";
import Cryptr from "cryptr";

export async function sendCardsFromUser(id: number) {
	
	const cryptr = new Cryptr(process.env.SECRET);
	const cards = await cardsRepository.getAllCards(id);

	const sendInformations = cards.map((elem, index) => {
        
            return {
				id: elem.id,
                name: elem.name,
                number: elem.number,
                cvc: cryptr.decrypt(elem.cvc),
                expiration_date: elem.expiration_date,
                password: cryptr.decrypt(elem.password),
                is_virtual: elem.is_virtual,
                type: elem.type
            };
    });
	
    return { cards: sendInformations };


}

export async function findCardById(id: number, owner_id: number) {
	const cryptr = new Cryptr(process.env.SECRET);

	const card = await checkCard(id, owner_id);

	return { ...card, cvc: cryptr.decrypt(card.cvc), password: cryptr.decrypt(card.password) };
}

export async function createCard(	data: cardsRepository.TypeNewCard) {
	const cryptr = new Cryptr(process.env.SECRET);

	await checkCardTitle(data.owner_id, data.name);

	await cardsRepository.insert({	...data, cvc: cryptr.encrypt(data.cvc),password: cryptr.encrypt(data.password)});
}

async function checkCardTitle(owner_id: number, name: string) {
	const card = await cardsRepository.getCardsByTitle(	owner_id,name);

	if (card.length)
		throw {	code: "Conflict",message: "Já existe um cartao com esse nome. Exclua a outra ou altere o nome deste.",};
}

export async function deleteCard(id: number, owner_id: number) {
	await checkCard(id, owner_id);

	await cardsRepository.deleteCard(id);
}

async function checkCard(credentialId: number, owner_id: number) {
	const credential = await cardsRepository.getCardById(credentialId);

	if (!credential)
		throw { code: "NotFound", message: "Este cartão não existe" };

	if (credential.owner_id !== owner_id)
		throw {	code: "Anauthorized", message: "Você não tem permissão para ver cartões de outros usuários.",};

	return credential;
}