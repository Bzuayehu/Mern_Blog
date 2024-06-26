const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const PORT = process.env.PORT || 8000;

const articlesInfo = {
  "learn-react": {
    comments: [],
  },
  "learn-node": {
    comments: [],
  },
  "how-to-learn-node": {
    comments: [],
  },
};
//initialize JSON
app.use(express.json({ extended: false }));

const withDb = async (operations,res)=>{
  try {
    const client = await MongoClient.connect("mongodb+srv://Bizu:B69m12@mern-blog.al5u3ha.mongodb.net/?retryWrites=true&w=majority&appName=Mern-blog/mernblog",{});
    console.log(
      `MongoDb connected succeessfully`
    );
    
    const dbs = client.db();
    await operations(dbs)
    client.close();
  } catch (error) {
    res.status(500).json({ message: "error connecting to database", error });
  }
}
app.get("/",(req,res)=> 
  {res.send("working successfully")}
       );
app.get("/api/articles/:name", async (req, res) => {
  withDb(async (dbs)=>{
    const articleName = req.params.name; 
    const articlesInfo = await dbs
      .collection("articles")
      .findOne({name:articleName});
    res.status(200).json(articlesInfo);
  },res)
   
});

app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  withDb(async(dbs)=>{
    const articleInfo =  await dbs.collection("articles").findOne({name:articleName});
    await dbs.collection("articles").updateOne(
      {name:articleName},
      {
        $set:{
        comments:articleInfo.comments.concat({username,text})
      },
    }
    );
    const updateArticleInfo = await dbs.collection("articles").findOne({name:articleName})
    res.status(200).json(updateArticleInfo);
  },res);
  
});

app.listen(PORT, () => console.log(`server started at port  ${PORT}`));
