import express  from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "temporary_password",
  database: process.env.DB_NAME || "golinksdb",
  port: 3306
})

app.use(express.json())

const corsOptions = {
  origin: ["https://bestkexin.live", "http://localhost:3000"],
  methods: "GET,POST,PUT,DELETE"
};
app.use(cors(corsOptions))

app.get("/", (req,res)=>{
    res.json("Hello World from the backend!!!")
})


app.get("/books", (req,res)=>{
    const query = "SELECT * FROM books"
    db.query(query, (err,data)=>{
          if(err) return res.json(err)
          return res.json(data)
    })
  })



  app.post("/books", (req,res)=>{
    const query = "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)"
    const values = [
       req.body.title,
       req.body.description,
       req.body.price,
       req.body.cover
    ]

    db.query(query, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.status(201).json("Book has been created successfully!!!")
    })
  })

  app.delete("/books/:id", (req,res)=>{
      const bookID = req.params.id
      const query = "DELETE FROM books WHERE id = ?"

      db.query(query, [bookID], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully!!!")
      } )
  })

  app.put("/books/:id", (req,res)=>{
    const bookID = req.params.id
    const query = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.cover
    ]

    db.query(query, [...values, bookID], (err, data)=>{
      if(err) return res.json(err)
      return res.json("Book has been updated successfully!!!")
    } )
})

app.listen(8800, ()=>{
    console.log("Connect to the backend!!!!")
})

//npm start