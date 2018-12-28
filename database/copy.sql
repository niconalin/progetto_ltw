create table Ricette ( NOME varchar, TIPO_PIATTO varchar, ING_PRINCIPALE varchar, PERSONE integer,
NOTE varchar, INGREDIENTI varchar, PREPARAZIONE varchar);

COPY Ricette FROM '/home/biar/Dropbox/Linguaggi e Tecnologie per il Web/Progetto/DATABASE/ricette.csv' WITH CSV DELIMITER AS '$' NULL AS 'Non Disponibile'
HEADER;

