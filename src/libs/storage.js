import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {

    static instance = new Storage();

    storeItem = async (key, value) => {
        try {
            
            await AsyncStorage.setItem(key, value);

            return true;

        } catch (e) {
            console.log('Store error', e);

            return false;
        }
    }

    getFavItem = async (key) => {

        try {

            console.log('storage key', key);
            return await AsyncStorage.getItem(key);
            
        } catch (e) {
            console.log('Get error', e);

            throw Error(e);
        }

    }
    
    getAllItems = async (keys) => {

        try {

            return await AsyncStorage.multiGet(keys);
            
        } catch (e) {
            console.log('Multiget error', e);

            throw Error(e);
        }

    }

    getKeys = async () => {

        try {

            return await AsyncStorage.getAllKeys();
            
        } catch (e) {
            console.log('Keys error', e);

            throw Error(e);
        }
    }

    removeItem = async (key) => {

        try {
            
            await AsyncStorage.removeItem(key);

        } catch (e) {
            console.log('remove error', e);

            return false;
        }

    }

}

export default Storage;