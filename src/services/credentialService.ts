import * as credentialRepository from "../repositories/credentialRepository.js";
import Cryptr from "cryptr";

export async function sendCredentialsFromUser(id: number) {
	
	const cryptr = new Cryptr(process.env.SECRET);
	const credentials = await credentialRepository.getAllCredentials(id);

	const sendInformations = credentials.map((elem, index) => {
        
            return {
				id: elem.id,
                name: elem.name,
                url: elem.url,
                username: elem.username,
                password: cryptr.decrypt(elem.password),
            };
    });
	
    return { credentials: sendInformations };


}

export async function findCredentialById(id: number, owner_id: number) {
	const cryptr = new Cryptr(process.env.SECRET);

	const credential = await checkCredential(id, owner_id);

	return { ...credential, password: cryptr.decrypt(credential.password) };
}

export async function createCredential(	data: credentialRepository.TypeNewCredential) {
	const cryptr = new Cryptr(process.env.SECRET);

	await checkCredentialTitle(data.owner_id, data.name);

	await credentialRepository.insert({	...data,password: cryptr.encrypt(data.password),});
}

async function checkCredentialTitle(owner_id: number, name: string) {
	const credential = await credentialRepository.getCredentialByTitle(	owner_id,name);

	if (credential.length)
		throw {	code: "Conflict",message: "Já existe uma credencial com esse nome. Exclua a outra ou altere o nome.",};
}

export async function deleteCredential(id: number, owner_id: number) {
	await checkCredential(id, owner_id);

	await credentialRepository.deleteCredential(id);
}

async function checkCredential(credentialId: number, owner_id: number) {
	const credential = await credentialRepository.getCredentialById(credentialId);

	if (!credential)
		throw { code: "NotFound", message: "Esta credencial não existe" };

	if (credential.owner_id !== owner_id)
		throw {	code: "Anauthorized", message: "Você não tem permissão para ver credenciais de outros usuários.",};

	return credential;
}


