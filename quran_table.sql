-- quran tables
CREATE TABLE "audio_files" (
	"reciter_id"	INTEGER,
	"surah_id"	INTEGER,
	"audio_link"	TEXT
);

CREATE TABLE "reciters" (
	"id"	INTEGER,
	"name"	TEXT
);

CREATE TABLE "verse_timings" (
	"reciter_id"	INTEGER,
	"surah_id"	INTEGER,
	"ayah"	INTEGER,
	"time"	INTEGER,
	"words"	TEXT
);

CREATE TABLE "surah" (
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

CREATE TABLE IF NOT EXISTS ayah (
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
CREATE TABLE "category" (
	"id"	INTEGER,
	"name"	TEXT,
	"image"	TEXT,
	PRIMARY KEY("id")
);

CREATE TABLE "duadetails" (
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