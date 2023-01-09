import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAlK5G4Poci7t2K4IdIW1CWgvF2OCTcpPo",
  authDomain: "greydive-2e644.firebaseapp.com",
  projectId: "greydive-2e644",
  storageBucket: "greydive-2e644.appspot.com",
  messagingSenderId: "794055120682",
  appId: "1:794055120682:web:492996df241610b46cb053",
  databaseURL: "https://greydive-2e644-default-rtdb.firebaseio.com/"
};

export function saveInDB(data) {
	initializeApp(firebaseConfig);
	const db = getDatabase();
	console.log(data);
	set(ref(db, 'users/' + data.uuid), data);
}

export async function getFromDB() {
	initializeApp(firebaseConfig);

	const dbRef = ref(getDatabase());
	const dataDB = await get(dbRef, 'users/');
	return dataDB.exists() ? dataDB.val() : {};
}