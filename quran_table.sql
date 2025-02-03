-- quran tables
CREATE TABLE "quran_audio" (
	"reciter_id"	INTEGER,
	"surah_id"	INTEGER,
	"audio_link"	TEXT
);

CREATE TABLE "quran_reciters" (
	"id"	INTEGER,
	"name"	TEXT
);

CREATE TABLE "quran_verse_timings" (
	"reciter_id"	INTEGER,
	"surah_id"	INTEGER,
	"ayah"	INTEGER,
	"time"	INTEGER,
	"words"	TEXT
);

CREATE TABLE "quran_surah" (
	"serial"	INTEGER NOT NULL,
	"total_ayah"	INTEGER,
	"name"	TEXT,
	"name_en"	TEXT,
	"meaning"	TEXT,
	"type"	TEXT,
	"name_bn"	TEXT,
	"meaning_bn"	TEXT,
	PRIMARY KEY("serial")
);

CREATE TABLE IF NOT EXISTS quran_ayah (
      id INTEGER ,
      surah_id INTEGER,
      ayah_id INTEGER,
      tafsir_fmazid TEXT,
      tafsir_kathir TEXT,
      arabic TEXT,
      tr_ar TEXT,
      tr_bn_haque TEXT,
      tr_bn_muhi TEXT,
      tr_en TEXT
);

-- dua tables
CREATE TABLE "dua_category" (
	"id"	INTEGER,
	"name"	TEXT,
	"image"	TEXT,
	PRIMARY KEY("id")
);

CREATE TABLE "dua_details" (
	"book_id"	INTEGER,
	"dua_global_id"	INTEGER,
	"ID"	TEXT,
	"dua_segment_id"	INTEGER,
	"top"	TEXT,
	"arabic_diacless"	TEXT,
	"arabic"	TEXT,
	"transliteration"	TEXT,
	"translations"	TEXT,
	"bottom"	TEXT,
	"reference"	TEXT
);

CREATE TABLE "duanames" (
	"dua_global_id"	INTEGER,
	"book_id"	INTEGER,
	"chap_id"	INTEGER,
	"dua_id"	TEXT,
	"chapname"	TEXT,
	"duaname"	TEXT,
	"tags"	TEXT,
	"ID"	TEXT,
	"category"	TEXT
);

-- asmaul husna

CREATE TABLE asmaul_husna (
    id INTEGER PRIMARY KEY,
    arbi TEXT,
    bangla TEXT,
    meaning TEXT,
    faz TEXT
);

-- istegfar

CREATE TABLE IF NOT EXISTS istigfar (
    id INTEGER PRIMARY KEY,
    name TEXT,
    info TEXT,
    arabic TEXT,
    translation TEXT,
    bangla TEXT,
    benifits TEXT,
    reference TEXT
);


-- kalima
CREATE TABLE IF NOT EXISTS kalima (
    id INTEGER PRIMARY KEY,
    title TEXT,
    explain TEXT,
    arabic TEXT,
    punctuation TEXT,
    translation TEXT
);
-- mahram
CREATE TABLE IF NOT EXISTS mahram (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    isMarham INTEGER NOT NULL CHECK(isMarham IN (0, 1)),
    gender TEXT NOT NULL CHECK(gender IN ('male', 'female'))
);


-- rukiah
CREATE TABLE ruqiah_category (
	"cat_id"	INTEGER,
	"category_name"	TEXT,
	"cat_icon"	TEXT
);

CREATE TABLE ruqiah_details (
	"id"	INTEGER,
	"cat_id"	INTEGER,
	"subcat_id"	INTEGER,
	"topic_id"	TEXT,
	"topic_name"	TEXT,
	"ruqya_details"	TEXT,
	"Source"	TEXT
);

CREATE TABLE ruqiah_sub_category (
	"cat_id"	INTEGER,
	"subcat_id"	INTEGER,
	"subcat_name"	TEXT
);

CREATE TABLE ruqiah_video (
	"cat_id"	INTEGER,
	"subcat_id"	INTEGER,
	"link_id"	INTEGER,
	"name"	TEXT,
	"author"	TEXT,
	"link"	TEXT
);