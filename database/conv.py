import codecs

print("Started.")
print("Converting file...")

#apertura files necessari
inFile = codecs.open("ricette.txt", 'r', encoding='utf-8', errors = 'ignore')
outFile = open("ricette.csv", 'w', encoding='utf-8')

#stampa header per importazione in postgres
outFile.write("NOME$ TIPO_PIATTO$ ING_PRINCIPALE$ PERSONE$ NOTE$ INGREDIENTI$ PREPARAZIONE#\n")

#legge riga per riga e formatta testo
riga = inFile.readline().rstrip()
while(riga != "STOP"):
    next_riga = inFile.readline().rstrip() #necessaria per alcuni controlli
    #non scrive i titoli
    if (riga == ":Ricette" or riga == "-Nome" or riga == "-Tipo_Piatto" or riga == "-Ing_Principale" or riga == "-Persone" or riga == "-Note" or riga == "-Preparazione" or riga == " ==== Per Decorare:"):
        riga = next_riga
        continue
    #controllo speciale per ingredienti essendo disposti su più righe e inserimento carattere speciale "+" per separare ingredienti
    elif (riga == "-Ingredienti"):
        riga = next_riga
        while (riga != "-Preparazione"): #si blocca su ultimo ingrediente
            outFile.write(riga+"+")
            riga = inFile.readline().rstrip()
        outFile.write("$")
        next_riga = inFile.readline().rstrip()
    #inserisce carattere speciale "#" per inserire successivamente un "\n" per la formattazione
    elif (next_riga == ":Ricette"):
        outFile.write(riga+"#\n")
    #inserisce "Non disponbile" dove è necessario NULL in SQL
    elif (riga == " -"):
        outFile.write("Non Disponibile"+"$")
    #inserisce delimitatore a fine categoria necessario all'importazione in postgres, tranne nel caso che non sia fine categoria ma un "\n" in una categoria
    else:
        if (next_riga == "-Nome" or next_riga == "-Tipo_Piatto" or next_riga == "-Ing_Principale" or next_riga == "-Persone" or next_riga == "-Note" or next_riga == "-Ingredienti" or next_riga == "-Preparazione"):
            outFile.write(riga+"$")
        else:
            outFile.write(riga)
    riga = next_riga

#chiude files
inFile.close()
outFile.close()

#riapre .csv per eliminare "\n" problematici per l'importazione e per sostituire i "#" con gli unici "\n" necessari
outFile = open("ricette.csv", 'r', encoding='utf-8')
content = outFile.read()
outFile.close()
content = content.replace("\n", "")
content = content.replace("#", "\n")
outFile = open("ricette.csv", 'w', encoding='utf-8')
outFile.write(content)
outFile.close()


print("Finished.")
    


