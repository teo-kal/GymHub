#KORISNIK
CREATE TABLE KORISNIK
(
	ID int unsigned AUTO_INCREMENT,
    Tip char(1) NOT NULL, 
	KorisnickoIme varchar(30) UNIQUE NOT NULL,
	Lozinka varchar(30) NOT NULL,	#30 za slucaj da se odlucimo da storujemo hesirane sifre
    Email varchar(50) UNIQUE NOT NULL,
    Slika varchar(100) NULL,	#Putanja do slike

	CONSTRAINT PK_KORISNIK PRIMARY KEY(ID)
);

ALTER TABLE KORISNIK
ADD CONSTRAINT CHK_KORISNIK_TIP
CHECK (Tip IN ('A', 'T', 'C'));
#################################################################################################

#ADMINISTRATOR
CREATE TABLE ADMINISTRATOR		#Izgleda da je ADMIN kljucna rec u MYSQL
(
	ID int unsigned,
    Dostupnost varchar(10) NULL,	#Jer je Status kljucna rec
    
    CONSTRAINT PK_ADMINISTRATOR PRIMARY KEY(ID),
    CONSTRAINT FK_ADMINISTRATOR_KORISNIK FOREIGN KEY(ID) REFERENCES KORISNIK(ID)
		ON DELETE CASCADE
);

ALTER TABLE ADMINISTRATOR
ADD CONSTRAINT CHK_ADMINISTRATOR_DOSTUPNOST
CHECK (Dostupnost IN('Dostupan', 'Nedostupan', 'Zauzet'));
#################################################################################################

#OSOBA
CREATE TABLE OSOBA
(
	ID int unsigned,
    JMBG varchar(13) UNIQUE NOT NULL,
    Ime varchar(25) NOT NULL,
    Prezime varchar(25) NOT NULL,
    DatRodjenja date NOT NULL,
    Pol char(1) NOT NULL,
    BrRacuna char(24) UNIQUE NULL,	#24 jer 4 * 5 cif + 4 razmaka
    
    CONSTRAINT PK_OSOBA PRIMARY KEY(ID),
    CONSTRAINT FK_OSOBA_KORISNIK FOREIGN KEY(ID) REFERENCES KORISNIK(ID)
    	ON DELETE CASCADE
);

ALTER TABLE OSOBA
ADD CONSTRAINT CHK_OSOBA_DATRODJENJA
CHECK (YEAR(DatRodjenja) <= (YEAR(SYSDATE()) - 16));

ALTER TABLE OSOBA
ADD CONSTRAINT CHK_OSOBA_POL
CHECK (Pol IN ('M', 'Z'));
#################################################################################################

#TRENER
CREATE TABLE TRENER
(
	ID int unsigned,
    Zvanje varchar(30) NOT NULL,
    Specijalizacija varchar(20) NOT NULL,
    GodIskustva int unsigned NOT NULL,
    DatZaposlenja date NOT NULL,
    Ocena double NOT NULL DEFAULT 0,
    BrPersTreninga int unsigned NOT NULL,
    RadnoVreme varchar(100) NOT NULL,
    
    CONSTRAINT PK_TRENER PRIMARY KEY(ID),
    CONSTRAINT FK_TRENER_OSOBA FOREIGN KEY(ID) REFERENCES OSOBA(ID)
    	ON DELETE CASCADE
);

ALTER TABLE TRENER
ADD CONSTRAINT CHK_TRENER_DATZAPOSLENJA
CHECK (DatZaposlenja <= SYSDATE());

ALTER TABLE TRENER
ADD CONSTRAINT CHK_TRENER_OCENA
CHECK (Ocena BETWEEN 1.00 AND 5.00);

ALTER TABLE TRENER
ADD CONSTRAINT CHK_TRENER_BRPERSTRENINGA
CHECK (BrPersTreninga BETWEEN 1 AND 5);
#################################################################################################

#PLAN_TRENINGA
CREATE TABLE PLAN_TRENINGA
(
	ID int unsigned AUTO_INCREMENT,
    TrenerID int unsigned NOT NULL,
    Naziv varchar(25) NOT NULL,
    Nivo char(8) NOT NULL,
    Trajanje int unsigned,
    
    CONSTRAINT PK_PLAN_TRENINGA PRIMARY KEY(ID),
    CONSTRAINT FK_PLAN_TRENINGA_TRENER FOREIGN KEY(TrenerID) REFERENCES TRENER(ID)
    	ON DELETE CASCADE
);

ALTER TABLE PLAN_TRENINGA
ADD CONSTRAINT CHK_PLAN_TRENINGA_NIVO
CHECK (Nivo IN('Pocetni', 'Srednji', 'Napredni'));

ALTER TABLE PLAN_TRENINGA
ADD CONSTRAINT CHK_PLAN_TRENINGA_TRAJANJE
CHECK (Trajanje BETWEEN 30 AND 90);
#################################################################################################

#VEZBA
CREATE TABLE VEZBA
(
	ID int unsigned AUTO_INCREMENT, 
    Naziv varchar(30) UNIQUE NOT NULL,
    Opis varchar(1000) NOT NULL,
    VideoLink varchar(50) UNIQUE NOT NULL,
    MisicnaGrupa varchar(20) NOT NULL,
    
	CONSTRAINT PK_VEZBA PRIMARY KEY(ID)
);

ALTER TABLE VEZBA
ADD CONSTRAINT CHK_VEZBA_MISICNAGRUPA
CHECK (MisicnaGrupa IN('Grudi', 'Leđa', 'Ramena', 'Bicepsi', 'Tricepsi', 
'Kvadricepsi', 'Zadnja loža', 'Listovi', 'Trbušnjaci', 'Gluteus'));
#################################################################################################

#PLAN_ISHRANE
CREATE TABLE PLAN_ISHRANE
(
	ID int unsigned AUTO_INCREMENT,
    TrenerID int unsigned,
    Naziv varchar(25) NOT NULL,
    Tip varchar(20) NOT NULL,
    
    CONSTRAINT PK_PLAN_ISHRANE PRIMARY KEY(ID),
    CONSTRAINT FK_PLAN_ISHRANE_TRENER FOREIGN KEY(TrenerID) REFERENCES TRENER(ID)
    	ON DELETE CASCADE
);

ALTER TABLE PLAN_ISHRANE
ADD CONSTRAINT CHK_PLAN_ISHRANE_TIP
CHECK (Tip IN('Vegan', 'Vegeterijanac', 'Svaštojed', 'Pesketerijanac', 'Dijeta'));
#################################################################################################

#OBROK
CREATE TABLE OBROK
(
	ID int unsigned AUTO_INCREMENT,
    Naziv varchar(25) NOT NULL,
    Tip varchar(20) NOT NULL,
    Dan char(3) NOT NULL,
    Sastojci varchar(200) NOT NULL,
    NacinPripreme varchar(750) NOT NULL,
    
    CONSTRAINT PK_OBROK PRIMARY KEY(ID)
);

ALTER TABLE OBROK
ADD CONSTRAINT CHK_OBROK_TIP
CHECK (Tip IN('Doručak', 'Prepodnevna užina', 'Ručak', 'Popodnevna užina', 'Večera'));

ALTER TABLE OBROK
ADD CONSTRAINT CHK_OBROK_DAN
CHECK (Dan IN('PON', 'UTO', 'SRE', 'ČET', 'PET', 'SUB', 'NED'));
#################################################################################################

#GRUPA
CREATE TABLE GRUPA
(
	ID int unsigned AUTO_INCREMENT,
    TrenerID int unsigned NOT NULL,
    Termini varchar(200) NOT NULL, 
    Naziv varchar(25) NOT NULL,
    Kapacitet int unsigned NOT NULL,
    PlanTrID int unsigned NULL,
    PlanIsID int unsigned NULL,
    
    CONSTRAINT PK_GRUPA PRIMARY KEY(ID),
    CONSTRAINT FK_GRUPA_TRENER FOREIGN KEY(TrenerID) REFERENCES TRENER(ID)
    	ON DELETE CASCADE,
    CONSTRAINT FK_GRUPA_PLAN_TRENINGA FOREIGN KEY(PlanTrID) REFERENCES PLAN_TRENINGA(ID)
		ON DELETE SET NULL,
    CONSTRAINT FK_GRUPA_PLAN_ISHRANE FOREIGN KEY(PlanIsID) REFERENCES PLAN_ISHRANE(ID)
    	ON DELETE SET NULL
);

ALTER TABLE GRUPA
ADD CONSTRAINT CHK_GRUPA_KAPACITET
CHECK (Kapacitet BETWEEN 2 AND 5);
#################################################################################################

#CLAN
CREATE TABLE CLAN
(
	ID int unsigned,
    TrenerID int unsigned NULL,
    GrupaID int unsigned NULL,
    Cilj varchar(25) NOT NULL,
    DatUclanjivanja date NOT NULL,
    PlanTrID int unsigned NULL,
    PlanIsID int unsigned NULL,
    
    CONSTRAINT PK_CLAN PRIMARY KEY(ID),
    CONSTRAINT FK_CLAN_OSOBA FOREIGN KEY(ID) REFERENCES OSOBA(ID)
    	ON DELETE CASCADE,
    CONSTRAINT FK_CLAN_TRENER FOREIGN KEY(TrenerID) REFERENCES TRENER(ID)
    	ON DELETE SET NULL,
    CONSTRAINT FK_CLAN_GRUPA FOREIGN KEY(GrupaID) REFERENCES GRUPA(ID)
    	ON DELETE SET NULL,
    CONSTRAINT FK_CLAN_PLAN_TRENINGA FOREIGN KEY(PlanTrID) REFERENCES PLAN_TRENINGA(ID)
		ON DELETE SET NULL,
    CONSTRAINT FK_CLAN_PLAN_ISHRANE FOREIGN KEY(PlanIsID) REFERENCES PLAN_ISHRANE(ID)
		ON DELETE SET NULL
);

ALTER TABLE CLAN
ADD CONSTRAINT CHK_CLAN_CILJ
CHECK (Cilj IN('Mršavljenje', 'Održavanje figure', 'Dobijanje mišićne mase'));

ALTER TABLE CLAN
ADD CONSTRAINT CHK_CLAN_DATUCLANJIVANJA
CHECK (DatUclanjivanja <= SYSDATE());
#################################################################################################

#TRENING
CREATE TABLE TRENING
(
	ID int unsigned AUTO_INCREMENT,
	Kod varchar(4) UNIQUE NOT NULL,
    ClanID int unsigned NOT NULL,
    Termin datetime NOT NULL,
    
    CONSTRAINT PK_TRENING PRIMARY KEY(ID),
    CONSTRAINT FK_TRENING_CLAN FOREIGN KEY(ClanID) REFERENCES CLAN(ID)
		ON DELETE CASCADE
);

ALTER TABLE TRENING
ADD CONSTRAINT CHK_TRENING_TERMIN
CHECK (Termin >= SYSDATE() AND DATE(Termin) <= (SYSDATE() + 6));	#Da li je dovoljan constraint DAY(SYSDATE())? Npr kad se prelazi u sledeci mesec
#################################################################################################

#CLANARINA
CREATE TABLE CLANARINA
(
	ClanID int unsigned,
    Tip char(10) NOT NULL DEFAULT 'Undefined',
    Period tinyint unsigned NOT NULL DEFAULT 1,
    Popust decimal NOT NULL DEFAULT 0.0,
    DatPoslednjegPlacanja date NOT NULL,	#Inicijalno CLAN.DatUclanjivanja
    
    CONSTRAINT PK_CLANARINA PRIMARY KEY(ClanID),
    CONSTRAINT FK_CLANARINA_CLAN FOREIGN KEY(ClanID) REFERENCES CLAN(ID)
		ON DELETE CASCADE
);

ALTER TABLE CLANARINA 
ADD CONSTRAINT CHK_CLANARINA_TIP
CHECK (Tip IN('Samostalni', 'Grupni', 'Personalni', 'Undefined'));	

ALTER TABLE CLANARINA
ADD CONSTRAINT CHK_CLANARINA_PERIOD
CHECK (Period IN(1, 6, 12));

ALTER TABLE CLANARINA 
ADD CONSTRAINT CHK_CLANARINA_POPUST
CHECK (Popust BETWEEN 0.0 AND 0.5);

ALTER TABLE CLANARINA
ADD CONSTRAINT CHK_CLANARINA_DATPOSLEDNJEGPLACANJA
CHECK (DatPoslednjegPlacanja <= SYSDATE());
#################################################################################################

#M:N RELACIJE:
#PLAN_TRENINGA_VEZBA
CREATE TABLE PLAN_TRENINGA_VEZBA
(
	ID int unsigned AUTO_INCREMENT,
	PlanTrID int unsigned NOT NULL,
    VezbaID int unsigned NOT NULL,
    BrSerija int unsigned NULL,
    BrPonavljanja int unsigned NULL,
    BrSekundi int unsigned NULL, 
    Dani varchar(50) NOT NULL,
    RBrVezbe tinyint unsigned NOT NULL,
    
    CONSTRAINT PK_PLAN_TRENINGA_VEZBA PRIMARY KEY(ID),
	CONSTRAINT FK_PLAN_TRENINGA_VEZBA_PLAN_TRENINGA FOREIGN KEY(PlanTrID) REFERENCES PLAN_TRENINGA(ID)
		ON DELETE CASCADE,
    CONSTRAINT FK_PLAN_TRENINGA_VEZBA_VEZBA FOREIGN KEY(VezbaID) REFERENCES VEZBA(ID)
    	ON DELETE CASCADE,

    #UNIQUE CONSTRAINT	
    CONSTRAINT CHK_UN_PLAN_TRENINGA_VEZBA_FKS UNIQUE(PlanTrID, VezbaID)
);

ALTER TABLE PLAN_TRENINGA_VEZBA
ADD CONSTRAINT CHK_PLAN_TRENINGA_VEZBA_BRSERIJA
CHECK (BrSerija BETWEEN 1 AND 10);

ALTER TABLE PLAN_TRENINGA_VEZBA
ADD CONSTRAINT CHK_PLAN_TRENINGA_VEZBA_BRPONAVLJANJA
CHECK (BrPonavljanja BETWEEN 1 AND 50);

ALTER TABLE PLAN_TRENINGA_VEZBA
ADD CONSTRAINT CHK_PLAN_TRENINGA_VEZBA_BRSEKUNDI
CHECK (BrSekundi BETWEEN 1 AND 300);
#################################################################################################

#PLAN_ISHRANE_OBROK
CREATE TABLE PLAN_ISHRANE_OBROK
(
	ID int unsigned AUTO_INCREMENT,
	PlanIsID int unsigned NOT NULL,
    ObrokID int unsigned NOT NULL,
    
    CONSTRAINT PK_PLAN_ISHRANE_OBROK PRIMARY KEY(ID),
	CONSTRAINT FK_PLAN_ISHRANE_OBROK_PLAN_ISHRANE FOREIGN KEY(PlanIsID) REFERENCES PLAN_ISHRANE(ID)
    	ON DELETE CASCADE,
    CONSTRAINT FK_PLAN_ISHRANE_OBROK_OBROK FOREIGN KEY(ObrokID) REFERENCES OBROK(ID)
    	ON DELETE CASCADE,

    #UNIQUE CONSTRAINT	
    CONSTRAINT CHK_UN_PLAN_ISHRANE_OBROK_FKS UNIQUE(PlanIsID, ObrokID)
);
#################################################################################################

#Visevrednosni atributi:
#TELEFON_OSOBA
CREATE TABLE TELEFON_OSOBA
(
	ID int unsigned AUTO_INCREMENT,
	OsobaID int unsigned NOT NULL,
    Telefon varchar(10) UNIQUE NOT NULL,		#Cuvaju se bez znakova
    
    CONSTRAINT PK_TELEFON_OSOBA PRIMARY KEY(ID),
    CONSTRAINT FK_TELEFON_OSOBA_OSOBA FOREIGN KEY(OsobaID) REFERENCES OSOBA(ID)
    	ON DELETE CASCADE,
        
    #UNIQUE CONSTRAINT
	CONSTRAINT CHK_UN_TELEFON_OSOBA UNIQUE(OsobaID, Telefon)
);
#################################################################################################

#SOCMREZA_TRENER
CREATE TABLE SOCMREZA_TRENER
(
	ID int unsigned AUTO_INCREMENT,
	TrenerID int unsigned NOT NULL,
    SocMreza varchar(50) NOT NULL,	#link "http://www(...)"
    
    CONSTRAINT PK_SOCMREZA_TRENER PRIMARY KEY(ID),
    CONSTRAINT FK_SOCMREZA_TRENER_TRENER FOREIGN KEY(TrenerID) REFERENCES TRENER(ID)
    	ON DELETE CASCADE,
	
    #UNIQUE CONSTRAINT
    CONSTRAINT CHK_UN_SOCMREZA_TRENER UNIQUE(TrenerID, SocMreza)
);
#################################################################################################