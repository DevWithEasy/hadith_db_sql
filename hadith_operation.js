app.get('/data',(req,res)=>{
    db.all("SELECT * FROM hadith",(err, rows) => {
        if (err) {
            console.error("Error retrieving data:", err.message);
            res.status(500).send("Error retrieving data.");
        } else {
            res.json(rows);
        }
    });
})
app.get('/books',(req,res)=>{
    db.all("SELECT * FROM books",(err, rows) => {
        if (err) {
            console.error("Error retrieving data:", err.message);
            res.status(500).send("Error retrieving data.");
        } else {
            res.json(rows);
        }
    });
})

app.get("/chapters/:book_id", (req, res) => {
    const { book_id } = req.params;
    db.all("SELECT * FROM chapter WHERE book_id = ?", [book_id], function (err,rows) {
        if (err) {
            res.status(500).json({ error: err.message });
        }  else {
            console.log(rows)
            res.json(rows);
        }
    });
});

app.get("/hadiths/:book_id/:chapter_id", (req, res) => {
    const { book_id, chapter_id } = req.params;

    db.all(
        "SELECT * FROM section WHERE book_id = ? AND chapter_id = ?", 
        [book_id, chapter_id], 
        async function (err, sections) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const data = await Promise.all(sections.map(section => {
                return new Promise((resolve, reject) => {
                    db.all(
                        "SELECT * FROM hadith WHERE book_id = ? AND chapter_id = ? AND section_id = ?", 
                        [book_id, chapter_id, section.id], 
                        (err, hadiths) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve({ section, hadiths });
                            }
                        }
                    );
                });
            }));

            res.json(data); // Send response after all queries are completed
        }
    );
});


app.get("/goto/:book_id/:hadith_id", (req, res) => {
    const { book_id, hadith_id } = req.params;
    db.get(
        "SELECT * FROM hadith WHERE book_id = ? AND hadith_id =?",
        [book_id, hadith_id],
        (err, hadith) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                db.get(
                    "SELECT * FROM chapter WHERE book_id = ? AND chapter_id =?",
                    [book_id, hadith.chapter_id],
                    (err, chapter) => {
                        if (err) {
                            res.status(500).json({ error: err.message });
                        } else {
                            db.get(
                                "SELECT * FROM section WHERE book_id = ? AND chapter_id = ? AND section_id =?", 
                                [book_id, hadith.chapter_id, hadith.section_id], 
                                (err, section) => {
                                    if (err) {
                                        res.status(500).json({ error: err.message });
                                    } else {
                                        res.json({
                                            hadith,
                                            section,
                                            chapter,
                                         });
                                    }
                                }
                            )
                        }
                    }
                )
                
            }
        }
    )
})


app.listen(3133,()=>{
    console.log('Server is running on port 3133')
})