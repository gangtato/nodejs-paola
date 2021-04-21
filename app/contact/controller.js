const Contact = require("./model");
const config = require('../config');
const fs = require('fs');
const path = require('path');

async function store(req, res, next){ 


    try{

        let payload = req.body;

        if(req.file){
            
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath,
                `public/upload/${filename}`);

            // (1) baca file yang masih di lokasi sementara 
            const src = fs.createReadStream(tmp_path);
            // (2) pindahkan file ke lokasi permanen
            const dest = fs.createWriteStream(target_path); 
            // (3) mulai pindahkan file dari `src` ke `dest`
            src.pipe(dest);

            src.on("end", async()=>{
                try{
                    // (1) buat Product baru menggunakan data dari `payload`
                    let contact = new Contact({...payload, picture: filename});
                    // (2) simpan Product yang baru dibuat ke MongoDB
                    await contact.save();
                    // (3) berikan response kepada client dengan mengembalikan product yang baru dibuat 
                    return res.json(contact); 
                }catch(err){
                    fs.unlinkSync(target_path);
                    // (2) cek apakah error disebabkan validasi MongoDB
                    if(err && err.name === 'ValidationError'){
                        return res.json({
                            error: 1, 
                            message: err.message, 
                            fields: err.errors
                        })
                    }
                    next(err);
                }
                
            });

            src.on('error', async() => {
                next(err);
            });

        }else{
            let payload = req.body;
            // (1) buat Product baru menggunakan data dari `payload`
            let contact = new Contact(payload);
            // (2) simpan Product yang baru dibuat ke MongoDB
            await contact.save();
            // (3) berikan response kepada client dengan mengembalikan product yang baru dibuat 
            return res.json(contact);
        }
        
    }catch(err){

        if(err && err.name === 'ValidationError'){
            return res.json({
                    error: 1, 
                    message: err.message, 
                    fields: err.errors
                });
            }
            
            next(err);
    }
}

async function index(req, res, next){
    try{
        let { limit = 10, skip = 0 } = req.query;

        let contacts = 
        await Contact.find()
              .limit(parseInt(limit))
              .skip(parseInt(skip));

        return res.json(contacts);
    }catch(err){
        next(err);
    }
}

async function update(req, res, next){ 


    try{

        let payload = req.body;

        if(req.file){
            
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath,
                `public/upload/${filename}`);

            // (1) baca file yang masih di lokasi sementara 
            const src = fs.createReadStream(tmp_path);
            // (2) pindahkan file ke lokasi permanen
            const dest = fs.createWriteStream(target_path); 
            // (3) mulai pindahkan file dari `src` ke `dest`
            src.pipe(dest);

            src.on("end", async()=>{
                try{
                    // (1) buat Contact baru menggunakan data dari `payload`
                    let contact = await Contact.findOne({_id: req.params.id});
                    let currentImage = `${config.rootPath}/public/upload/${contact.picture}`;
                    // (2) cek apakah `file` benar-benar ada di file system
                    if(fs.existsSync(currentImage)){
                        // (3) hapus jika ada.
                        fs.unlinkSync(currentImage);
                    }

                    contact = await Contact.findOneAndUpdate({_id: req.params.id}, {...payload, picture: filename}, {new: true, runValidators: true});
                    return res.json(contact); 
                }catch(err){
                    fs.unlinkSync(target_path);
                    // (2) cek apakah error disebabkan validasi MongoDB
                    if(err && err.name === 'ValidationError'){
                        return res.json({
                            error: 1, 
                            message: err.message, 
                            fields: err.errors
                        })
                    }
                    next(err);
                }
                
            });

            src.on('error', async() => {
                next(err);
            });

        }else{
            let payload = req.body;
            // (1) buat Contact baru menggunakan data dari `payload`
            let contact = await Contact
            .findOneAndUpdate({_id: req.params.id}, payload, {new: true,
           runValidators: true});
            // (2) simpan Contact yang baru dibuat ke MongoDB
            await contact.save();
            // (3) berikan response kepada client dengan mengembalikan contact yang baru dibuat 
            return res.json(contact);
        }
        
    }catch(err){

        if(err && err.name === 'ValidationError'){
            return res.json({
                    error: 1, 
                    message: err.message, 
                    fields: err.errors
                });
            }
            
            next(err);
    }
}

module.exports = {
    index,
    store,
    update
}