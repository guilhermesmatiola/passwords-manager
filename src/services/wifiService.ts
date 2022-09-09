import * as wifiRepository from "../repositories/wifiRepository.js";
import Cryptr from "cryptr";

export async function sendWifisFromUser(id: number) {
	
	const cryptr = new Cryptr(process.env.SECRET);
	const wifi = await wifiRepository.getAllWifis(id);

	const sendInformations = wifi.map((elem, index) => {
        
            return {
				id: elem.id,
                name: elem.name,
                network: elem.network,
                password: cryptr.decrypt(elem.password),
            };
    });
	
    return { wifi: sendInformations };


}

export async function findWifiById(id: number, owner_id: number) {
	const cryptr = new Cryptr(process.env.SECRET);

	const wifi = await checkWifi(id, owner_id);

	return { ...wifi, password: cryptr.decrypt(wifi.password) };
}

export async function createWifi(	data: wifiRepository.TypeNewWifi) {
	const cryptr = new Cryptr(process.env.SECRET);

	await checkWifiTitle(data.owner_id, data.name);

	await wifiRepository.insert({	...data,password: cryptr.encrypt(data.password),});
}

async function checkWifiTitle(owner_id: number, name: string) {
	const wifi = await wifiRepository.getWifiByTitle(	owner_id,name);

	if (wifi.length)
		throw {	code: "Conflict",message: "Já existe uma Wi-fi com esse nome. Exclua a outra ou altere o nome.",};
}

export async function deleteWifi(id: number, owner_id: number) {
	await checkWifi(id, owner_id);

	await wifiRepository.deleteWifi(id);
}

async function checkWifi(wifiId: number, owner_id: number) {
	const wifi = await wifiRepository.getWifiById(wifiId);

	if (!wifi)
		throw { code: "NotFound", message: "Esta credencial não existe" };

	if (wifi.owner_id !== owner_id)
		throw {	code: "Anauthorized", message: "Você não tem permissão para ver Wi-fis de outros usuários.",};

	return wifi;
}