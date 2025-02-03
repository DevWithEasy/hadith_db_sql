const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const app = express();
const db = new sqlite3.Database("./mumin_app.db", (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Hadith API" });
});

app.get("/create", (req, res) => {

});



app.get("/generate/quran/ayah", (req, res) => {
  const q_json = JSON.parse(fs.readFileSync("./json/ayah.json", "utf8"));
  const q_json_punc = JSON.parse(
    fs.readFileSync("./json/ayah_punctuation.json", "utf8")
  );

  const data = [];

  q_json.forEach((ayah) => {
    const find = q_json_punc.find(
      (punc_ayah) =>
        punc_ayah.sura_id === ayah.surah_id &&
        punc_ayah.verse_id === ayah.ayah_id
    );
    const gen_ayah = {
      id: ayah.id,
      surah_id: ayah.surah_id,
      ayah_id: ayah.ayah_id,
      tafsir_fmazid: ayah.tafsir_fmazid,
      tafsir_kathir: ayah.tafsir_kathir,
      arabic: find.arabic_uthmanic,
      tr_ar: find.trans,
      tr_bn_haque: find.bn_hoque,
      tr_bn_muhi: find.bn_muhi,
      tr_en: ayah.tr_en,
    };
    data.push(gen_ayah);
  });

  // Define the output file path
  const outputFilePath = path.join(__dirname, "./json/generated_ayah.json");

  // Write data to file (synchronously)
  fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2), "utf8");

  res.json({ message: "Data saved successfully!", file: "generated_ayah.json" });
});

//====================HADITH BOOKS============================
app.get("/books", (req, res) => {
  db.all("SELECT * FROM books", (err, rows) => {
    if (err) {
      console.error("Error retrieving data:", err.message);
      res.status(500).send("Error retrieving data.");
    } else {
      res.json(rows);
    }
  });
});

//====================HADITH CHAPTER============================
app.get("/chapters/:book_id", (req, res) => {
  const { book_id } = req.params;
  db.all(
    "SELECT * FROM chapter WHERE book_id = ?",
    [book_id],
    function (err, rows) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//====================BOOKS HADITHS============================
app.get("/hadiths/:book_id/:chapter_id", (req, res) => {
  const { book_id, chapter_id } = req.params;

  db.all(
    "SELECT * FROM section WHERE book_id = ? AND chapter_id = ?",
    [book_id, chapter_id],
    async function (err, sections) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const data = await Promise.all(
        sections.map((section) => {
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
        })
      );

      res.json(data); // Send response after all queries are completed
    }
  );
});

//====================GO TO HADITH============================
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
              );
            }
          }
        );
      }
    }
  );
});

app.listen(3131, () => {
  console.log("Server is running on port 3133");
});
