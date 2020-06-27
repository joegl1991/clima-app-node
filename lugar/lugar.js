const axios = require('axios').default;

const getLugarLatLng = async(direccion) => {

    const encodedUrl = encodeURI(direccion);

    /* const instance = axios.create({
        baseURL: 'https://geocode.xyz',
        params: {
            auth: '240273459497530543350x6444',
            locate: encodedUrl,
            json: '1'
        }
    });
    
    instance.get()
        .then(resp => console.log(resp))
        .catch(err => console.log('ERROR', err)); */

    const params = {
        auth: '240273459497530543350x6444',
        locate: direccion,
        json: '1'
    }

    const resp = await axios.get('https://geocode.xyz', { params });

    if (resp.data.error) {
        throw new Error(`No hay resultados para ${direccion} - ${resp.data.error.description}`);
    }

    const data = resp.data;
    const dir = `${data.standard.city} - ${data.standard.countryname}`;
    const lat = data.latt;
    const lng = data.longt;

    return {
        dir,
        lat,
        lng
    }

}

module.exports = {
    getLugarLatLng
}