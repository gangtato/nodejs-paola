const Contact = require("./model");

async function store(req, res, next){ 


    try{
        let payload = req.body;
        // (1) buat Product baru menggunakan data dari `payload`
        let contact = new Contact(payload);
        // (2) simpan Product yang baru dibuat ke MongoDB
        await contact.save();
        // (3) berikan response kepada client dengan mengembalikan product yang baru dibuat 
        return res.json(contact);
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    store
}