import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";
import download from "download"
//import bodyParser from 'body-parser'


const router = express.Router()

router.post("/employee_login", (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "employee", email: email, id: result[0].id },
                    "jwt_secret_key",
                    { expiresIn: "100d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id });
            }
        })
        
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
});

router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
});


router.post('/add_gmtype', (req, res) => {
    //const sql = "INSERT INTO gmtype (`name`) VALUES (?)"
    const sql = `INSERT INTO gmtype (gmtype,des) VALUES (?)`
    const values = [
      req.body.gmtype,
      req.body.des,
    ]
    con.query(sql, [values], (err, result) => {
    if(err) return res.json({Status: false, Error: err})
    return res.json({Status: true})
  })
})

router.get('/gmtlist', (req, res) => {
    const sql = "SELECT * FROM gmtype";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_cust', (req, res) => {
    const sql = "INSERT INTO customer (`name`) VALUES (?)"
    con.query(sql, [req.body.cust], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

router.get('/cust', (req, res)=>{
    const sql = "SELECT * FROM customer";
    con.query(sql, (err, result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})


// image upload 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "image") {
            cb(null, 'Public/Images')
        }

        else if (file.fieldname === "techpack") {
            cb(null, 'Public/Teckpacks')
        }
      //cb(null, 'Public/Images');
    },
    filename: function (req, file, cb) {
        if (file.fieldname === "image") {
            cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
        }
      else if (file.fieldname === "techpack") {
        cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
      }

      //cb(null, file.fieldname + '-' + Date.now());
    }
  });
const upload = multer({
    storage: storage
})
// end imag eupload 

const multipleload = upload.fields ([{name: 'image'},{ name: "techpack"}])

router.post('/add_style',multipleload, (req, res) => {

    //const file1 = req.files['image'][0].filename;
    //const file2 = req.files['techpack'][0].filename;


    const sql = `INSERT INTO styedetail 
    (styelno,name,cust_id, groupstyle_id, image,techpack, postdate) 
    VALUES (?)`;
        const values = [
            req.body.styleno,
            req.body.name,
            req.body.cust_id,
            req.body.groupstyle_id, 
            req.files['image'][0].filename,
            req.files['techpack'][0].filename,
            req.body.postdate
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: console.log(err)})
            return res.json({Status: true})
        })
})



router.get('/tpack/:id', (req, res) => {
    const id = req.params.id;
    //return console.log(id)
    const sql = 'SELECT * FROM styedetail WHERE id = ?';
        con.query(sql, [id], (err, result) => {
            if(err) return res.json({Status: false, Error: "Query Error"})
                const fileName = result[0].techpack
                const directoryPath = "./Public/Teckpacks/";
                //return console.log(directoryPath + fileName, fileName)
                return res.download(directoryPath + fileName, fileName, (err) => {
                    if (err) {
                      res.status(500).send({
                        message: "Could not download the file. " + err,
                      });
                    }
                })

             })
})

router.get('/styles', (req, res) => {
    const sql = "SELECT * FROM styedetail";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})


export {router as EmployeeRouter}