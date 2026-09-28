// Dati del gioco in Italiano
export const WORD_DATA = [
  {
    tags: ["Catechismo", "Sacramenti", "Tradizione"],
    category: "Sacramenti [I]",
    dificultad: 1,
    fortext: "Segni efficaci della grazia",
    words: [
      {
        category: "Iniziazione",
        fortext: "Fondamenti della vita cristiana",
        words: ["BATTESIMO", "EUCARISTIA", "CRECIMA"],
        help: ["porta della fede", "corpo di Cristo", "sigillo dello Spirito"]
      },
      {
        category: "Consacrazione & Guarigione",
        fortext: "Vocazione di servizio & Guarigione dell'anima",
        words: ["ORDINE sacerdotale", "MATRIMONIO", "RICONCILIAZIONE", "UNZIONE"],
        help: ["consacrazione sacerdotale" "consagrazione coniugale", "perdono dei peccati", "...degli infermi: sollievo & fortezza",]
      }
    ]
  },
  {
    tags: ["Catechismo","Sacramenti","Tradizione"],
    category: "Sacramenti [II]",
    dificultad: 1,
    fortext: "Segni efficaci di grazia",
    words: [
    {
    categoria: "Una volta nella vita",
    fortext: "può essere rinnovato ma non ripetuto",
    words: ["BATTESIMO", "CRECIMA", "ORDINE sacerdotale", "MATRIMONIO"],
    help: ["porta della fede", "sigillo dello Spirito", "consacrazione sacerdotale", "consacrazione coniugale"]

    },
    {
    categoria: "Periodici",
    fortext: "rafforzano la volontà e la fede",
    words: ["EUCARISTIA", "UNZIONE", "RICONCILIAZIONE"],
    help: ["corpo di Cristo", "...degli infermi: sollievo & forza", "perdono dei peccati"]
    }
    ]
  },
  {
    tags: ["Catechismo","Sacramenti","Tradizione"],
    categoria: "Sacramenti [III]",
    dificultad: 1,
    fortext: "Segni efficaci di grazia",
    words: [
    {
    categoria: "Facoltativo",
    fortext: "per una vita di discepolato",
    words: ["ORDINE sacerdotale", "UNZIONE", "MATRIMONIO", "CRECIMA"],
    help:["Consacrazione sacerdotale", "...degli infermi: sollievo e forza", "Consacrazione coniugale", "Sigillo dello Spirito"]
    },
    {
    categoria: "Minimi",
    fortext: "per una vita cristiana",
    words: ["BATTESIMO", "EUCARISTIA", "RICONCILIAZIONE"],
    help:["Porta della fede", "Corpo di Cristo", "Perdono dei peccati"]
    }
    ]
  },
  {
    tags: ["Bibbia", "A.T.", "Fisica"],
    category: "Genesi in 7 giorni",
    dificultad: 2,
    fortext: "Il racconto della Creazione",
    words: [
      {
        category: "SPAZIO & TEMPO",
        fortext: "Ordinamento del cosmo",
        words: ["GIORNO & NOTTE", "FIRMAMENTO", "TERRA & MARE", "RIPOSO & SANTIFICAZIONE"],
        help: ["ciclo del tempo", "acque sopra & sotto", "superficie solida & acque caotiche", "settimo giorno"]
      },
      {
        category: "CONTENUTO",
        fortext: "Creazione e creature al servizio dell'Uomo",
        words: ["ERBE & ALBERI", "SOLE & LUNA", "UCCELLI & MOSTRI", "RETTILI & UMANI"],
        help: ["...che producano semi e frutti", "luminari", "...del cielo & ...del mare", "terra ferma"]
      }
    ]
  },
  {
    tags: ["Bibbia", "A.T.", "Morale"],
    category: "Decalogo",
    dificultad: 1,
    fortext: "Leggi della 1a Alleanza",
    words: [
      {
        category: "PRECETTI",
        fortext: "Doveri verso i nostri creatori",
        words: ["AMARE", "SANTIFICARE", "RISPETTARE"],
        help: ["...Dio", "...le feste", "...il padre e la madre"]
      },
      {
        category: "DIVIETI",
        fortext: "Limiti che proteggono la sfera privata",
        words: ["proibido UCCIDERE", "proibido RUBARE", "proibido ADULTERARE", "proibido MENTIRE"],
        help: ["attentare alla vita", "prendere ciò che appartiene ad altri", "rompere l'alleanza matrimoniale", "dire falsa testimonianza"]
      }
    ]
  },
  {
    tags: ["Bibbia", "N.T.", "Morale"],
    category: "Amore",
    dificultad: 1,
    fortext: "Il comandamento principale",
    words: [
      {
        category: "Amore Trinitario",
        fortext: "a somiglianza di Dio",
        words: ["amare DIO", "amare il PROSSIMO", "amore PROPRIO"],
        help: ["...con tutto il cuore", "...come te stesso", "autostima e cura personale"]
      },
      {
        category: "Amore Misericordioso",
        fortext: "la miseria muove il cuore",
        words: ["CARITÀ", "PERDONO", "COMPASSIONE", "CLEMENZA"],
        help: ["amore in azione", "cancellare rancore e colpa", "soffrire con/per l'altro", "alleviare la pena"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Morale"],
    category: "Opere di cuore spirituali",
    dificultad: 1,
    fortext: "Risolvere i bisogni interiori",
    words: [
      {
        category: "COMPASSIONEVOLI",
        fortext: "la miseria muove il cuore",
        words: ["INTERCEDERE", "CONSOLARE", "TOLLERARE", "PERDONARE"],
        help: ["pregare per gli altri", "dare conforto", "sopportare con pazienza", "liberare da rancore e colpa"]
      },
      {
        category: "COMPORTAMENTALI",
        fortext: "la miseria muove la parola",
        words: ["INSEGNARE", "CONSIGLIARE", "CORREGGERE"],
        help: ["istruire", "orientare", "indicare l'errore"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Morale"],
    category: "Opere di cuore corporali",
    dificultad: 1,
    fortext: "Risolvere i bisogni urgenti",
    words: [
      {
        category: "ASSISTENZIALI",
        fortext: "soddisfare i bisogni materiali",
        words: ["NUTRIRE", "DISSETARE", "VESTIRE", "ACCOGLIERE"],
        help: ["dare da mangiare", "dare da bere", "dare abiti", "dare un tetto"]
      },
      {
        category: "PRESENZIALI",
        fortext: "soddisfare i bisogni dell'anima",
        words: ["visitare il MALATO", "visitare il CARCERATO", "SEPPELLIRE"],
        help: ["debole di salute", "privato della libertà", "dare sepoltura"]
      }
    ]
  },
  {
    tags: ["Bibbia", "A.T.", "Storia","Nomi"],
    category: "Padri e Figli",
    dificultad: 2,
    fortext: "Nell'Antico Testamento",
    words: [
      {
        category: "Genesi",
        fortext: "I primi eletti di Dio",
        words: ["ADAMO & ABELE", "NOÈ & SEM", "ABRAMO & ISACCO"],
        help: ["il primo Uomo & il primo Santo", "Costruttori dell'arca", "I primi patriarchi"]
      },
      {
        category: "Israeliti",
        fortext: "Dalle 12 tribù al regno unito",
        words: ["GIACOBBE & GIUDA", "SAUL & GIONATA", "DAVIDE & SALOMONE"],
        help: ["Israele & suo figlio il Leone", "il primo Re & l'amico di Davide", "I costruttori del Tempio di Dio"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Vangeli", "N.T.", "Storia","Nomi"],
    category: "Figlio di …",
    dificultad: 2,
    fortext: "Nei Vangeli",
    words: [
      {
        category: "Figli unici",
        fortext: "Vocazioni singolari",
        words: ["GIOVANNI figlio di ZACCARIA", "NATANAELE figlio di TIMEO", "GESÙ figlio di GIUSEPPE"],
        help: ["il più grande tra gli Uomini, figlio del sacerdote", "vero Israelita, figlio dell'onorabile", "vero Dio figlio del falegname"]
      },
      {
        category: "Fratelli Pescatori",
        fortext: "... di uomini",
        words: ["SIMONE figlio di GIOVANNI", "ANDREA figlio di GIOVANNI", "GIOVANNI figlio di ZEBEDEO", "GIACOMO figlio di ZEBEDEO"],
        help: [
          "il discepolo principale, figlio di un pescatore il cui nome significa Dio è misericordioso",
          "fratello di Pietro, figlio di un pescatore il cui nome significa Dio è misericordioso",
          "il discepolo amato, figlio di un pescatore il cui nome significa dono di Dio",
          "fratello di Giovanni, figlio di un pescatore il cui nome significa dono di Dio"
        ]
      }
    ]
  },
  {
    tags: ["Bibbia", "Vangeli", "N.T.", "Storia"],
    category: "Intercessione Paterna",
    dificultad: 3,
    fortext: "Invocare per un 'figlio'",
    words: [
      {
        category: "Per la VITA",
        fortext: "La supplica di fronte alla morte o a un non nato",
        words: ["il SACERDOTE chiede un figlio (PROFETA)", "GIAIRO chiede per la figlia MORTA", "il FUNZIONARIO chiede per il figlio MORIBONDO", "la VEDOVA chiede per il figlio MORTO"],
        help: [
          "«Zaccaria, la tua preghiera è stata esaudita» — L'angelo annuncia la nascita di Giovanni",
          "«Non temere; soltanto abbi fede» — Gesù ridona la vita alla figlia del capo della sinagoga",
          "«Tuo figlio vive» — Il padre supplica Gesù e il figlio guarisce a distanza",
          "«Ragazzo, dico a te, àlzati» — Gesù si intenerisce per la madre e ridona la vita al figlio"
        ]
      },
      {
        category: "Per la SALUTE",
        fortext: "La supplica di fronte alla malattia",
        words: ["la CANANEA chiede per la figlia INDEMONITA", "un UMIILE chiede per il figlio POSSEDUTO", "il CENTURIONE chiede per il suo servo PARALITICO"],
        help: [
          "«Donna, grande è la tua fede!» — La madre intercede e la figlia viene liberata",
          "«Credo; aiuta la mia incredulità» — Il padre si presenta a Gesù e riconosce la fragilità della sua fede",
          "«Signore, io non sono degno che tu entri sotto il mio tetto» — Il soldato romano intercede e il suo servo guarisce"
        ]
      }
    ]
  },
  {
    tags: ["Bibbia", "Vangeli", "N.T.", "Storia","Nomi"],
    category: "Comunità",
    dificultad: 3,
    fortext: "Nei Vangeli",
    words: [
      {
        category: "Giudei",
        fortext: "Gerusalemme come Città Santa",
        words: ["FARISEI & SADDUCEI", "SCRIBI & PUBBLICANI", "ZELOTI & ERODIANI", "LEVITI & SACERDOTI"],
        help: ["esistono gli angeli & la risurrezione?", "la Legge & le tasse", "gruppi politici", "discendenti di Levi"]
      },
      {
        category: "Gentili",
        fortext: "Nazioni / popoli stranieri",
        words: ["PAGANI & SAMARITANI", "ROMANI & GRECI", "CANANEI & FENICI"],
        help: ["culti diversi & popolo rivale", "impero dominatore & cultura ellenica", "antichi popoli di Canaan e della costa"]
      }
    ]
  },
  {
    tags: ["N.T.", "Bibbia", "Storia","Nomi"],
    category: "Scrittori",
    dificultad: 1,
    fortext: "Del Nuovo Testamento",
    words: [
      {
        category: "Vangeli",
        fortext: "Il Verbo si è fatto carne e ha posto la sua dimora in mezzo a noi",
        words: ["MATTEO", "MARCO", "LUCA", "GIOVANNI"],
        help: ["discepolo di Gesù", "discepolo di Pietro", "discepolo di Paolo", "il discepolo amato"]
      },
      {
        category: "Atti, lettere & profezie",
        fortext: "La formazione della Chiesa e la spiegazione dei Vangeli",
        words: ["PAOLO & PIETRO", "GIACOMO & GIUDA", "LUCA & GIOVANNI"],
        help: ["lettere apostoliche principali", "lettere cattoliche", "Atti degli Apostoli & Apocalisse"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Gesù"],
    category: "EGLI È Uomo",
    dificultad: 2,
    fortext: "Vocazioni ad immagine di Gesù",
    words: [
      {
        category: "Ministeri (Battesimali)",
        fortext: "Cristo l'unto compie la sua missione divina",
        words: ["SACERDOTE", "PROFETA", "RE"],
        help: ["... altare & vittima", "annuncia la verità", "... d'Israele & del Cielo"]
      },
      {
        category: "Professioni (Reali & Simboliche)",
        fortext: "Gesù lavora per il corpo e per l'anima degli Uomini",
        words: ["FALEGNAME & AGRICOLTORE", "AVVOCATO & GIUDICE", "MAESTRO & LEGISLATORE", "MEDICO & MILITARE"],
        help: ["lavora il legno & semina la parola", "intercede & amministra la giustizia", "insegna & detta precetti", "... dell'anima & dello spirito"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Antropologia", "Liturgia", "Tradizione"],
    category: "Bisogni",
    dificultad: 2,
    fortext: "Dell'anima: tentazioni o benedizioni",
    words: [
      {
        category: "Cordiali",
        fortext: "Desideri di pienezza: una vita orientata a Dio o al mondo",
        words: ["PIACERE", "POSSEDERE", "POTERE"],
        help: ["desiderio di benessere e gioia", "desiderio di creazione e crescita", "desiderio di autorità e libertà"]
      },
      {
        category: "Psicofisiche",
        fortext: "Pentimento liturgico: cammino quotidiano sul cornicione",
        words: ["PAROLA", "PENSIERO", "OPERA", "OMISSIONE"],
        help: ["espressione sociale del linguaggio", "elaborazione di stimoli e informazioni", "agire e fare", "non fare - lasciar passare"]
      }
    ]
  },
  {
    tags: ["Preghiera", "Maria", "Tradizione"],
    category: "Rosario",
    dificultad: 3,
    fortext: "Preghiera Mariana",
    words: [
      {
        category: "Misteri",
        fortext: "Struttura principale di meditazione",
        words: ["GAUDIOSI", "LUMINOSI", "DOLOROSI", "GLORIOSI"],
        help: ["incarnazione e infanzia", "vita pubblica di Gesù", "passione e morte", "risurrezione e gloria"]
      },
      {
        category: "Chiusura",
        fortext: "Invocazioni e preghiere finali",
        words: ["BENEDETTA la tua PUREZZA", "SALVE & REGINA", "LITANIE della VERGINE"],
        help: [
          "«e sia benedetta in eterno, giacché un Dio si ricrea in sì bella maestà»",
          "«Madre di misericordia, vita, dolcezza e speranza nostra»",
          "alla fine del Rosario"
        ]
      }
    ]
  },
  {
    tags: ["Preghiera", "Maria", "Gesù", "Tradizione"],
    category: "Misteri [I]",
    dificultad: 3,
    fortext: "Del Rosario",
    words: [
      {
        category: "Gaudiosi",
        fortext: "La nascita e l'infanzia",
        words: ["ANNUNCIAZIONE & GABRIELE", "VISITAZIONE & MAGNIFICAT", "NASCITA & PRESEPE", "PRESENTAZIONE & TEMPIO", "ADOLESCENZA & DOTTORI"],
        help: ["«L'Angelo del Signore portò l'annuncio a Maria»", "«Casa di Elisabetta e Giovanni. Maria canta.»", "«Partirono per Betlemme»", "«Simeone: i miei occhi hanno visto la salvezza»", "«Il Bambino smarrito e ritrovato»"]
      },
      {
        category: "Luminosi",
        fortext: "La manifestazione del Regno",
        words: ["GIORDANO & BATTESIMO", "NOZZE & VINO", "REGNO & CONVERSIONE", "TRASFIGURAZIONE & MONTAGNA", "EUCARISTIA & CENA"],
        help: ["«Inizio della vita pubblica di Gesù»", "«Il primo miracolo a Cana»", "«L'annuncio di Giovanni e Gesù»", "«Signore, è bello per noi essere qui; facciamo tre tende»", "«Pane, vino, calice»"]
      }
    ]
  },
  {
    tags: ["Preghiera", "Maria", "Gesù", "Tradizione"],
    category: "Misteri [II]",
    dificultad: 3,
    fortext: "Del Rosario",
    words: [
      {
        category: "Dolorosi",
        fortext: "La Passione di Cristo",
        words: ["PREGHIERA & ORTO", "FLAGELLAZIONE & FLAGELLI", "INCORONAZIONE & SPINE", "CROCE & CAMMINO", "CROCE & MORTE"],
        help: ["«Padre, se vuoi, allontana da me questo calice»", "«Lo legarono a una colonna»", "«Il re dei giudei»", "«Gesù cade esausto»", "«Padre, nelle tue mani consegno il mio Spirito»"]
      },
      {
        category: "Gloriosi",
        fortext: "La vittoria e la gloria",
        words: ["SEPOLCRO & RISURREZIONE", "CIELO & ASCENSIONE", "PENTECOSTE & LINGUE", "CORPO & ANIMA", "CORONA & REGINA"],
        help: ["«Il terzo giorno...»", "«Salì al Padre»", "«50 giorni dopo la Pasqua»", "«L'Assunzione di Maria»", "«L'Incoronazione di Maria»"]
      }
    ]
  },
  {
    tags: ["Bibbia", "N.T.", "Vangeli", "Simboli", "Fisica"],
    category: "Animali",
    dificultad: 1,
    fortext: "Nei Vangeli",
    words: [
      {
        category: "Dio e i suoi amici",
        fortext: "esempi di docilità e vulnerabilità",
        words: ["PECORA & ASINO", "AGNELLO & VERME", "GALLINA & COLOMBA"],
        help: ["docile & resistente", "innocente & insignificante", "...protettrice & ...della pace"]
      },
      {
        category: "Il nemico e i suoi amici",
        fortext: "esempi di ribellione e male",
        words: ["MAIALE & CANE", "LUPO & SCORPIONE", "SERPENTE & VOLPE", "CAPRA & AVVOLTOIO"],
        help: ["impuro & vorace", "predatore & velenoso", "astuto & approfittatore", "...di montagna & spazzino"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Catechismo", "Vie"],
    category: "Consigli",
    dificultad: 2,
    fortext: "Vie di perfezione cristiana",
    words: [
      {
        category: "Evangelici",
        fortext: "Voti di abnegazione, rinuncia e dono di sé",
        words: ["CASTITÀ", "POVERTÀ", "OBBEDIENZA"],
        help: ["rinuncia all'unione carnale", "rinuncia ai beni materiali", "rinuncia alla propria volontà"]
      },
      {
        category: "Quaresimali",
        fortext: "Pratiche ascetiche per predisporsi a Dio",
        words: ["ELEMOSINA", "PREGHIERA", "DIGIUNO", "CONVERSIONE"],
        help: ["condividere i beni", "dialogo con Dio", "privazione", "cambio di vita"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Ruaj", "Morale"],
    category: "Doni",
    dificultad: 2,
    fortext: "dello Spirito Santo",
    words: [
      {
        category: "Intellettuali (di discernimento)",
        fortext: "La coscienza si riempie di Dio",
        words: ["SAPIENZA", "INTELLETTO", "SCIENZA", "CONSIGLIO"],
        help: ["sapere di / discernere Dio, assaporare Dio", "sapere/discernere le leggi/i pensieri di Dio", "sapere/discernere la presenza di Dio", "sapere/discernere la volontà di Dio"]
      },
      {
        category: "Cordiali (del cuore)",
        fortext: "L'anima si riempie di Dio",
        words: ["PIETÀ", "FORTEZZA", "TIMORE"],
        help: ["devozione, clemenza e fervore", "sopportare la prova", "rispetto verso Dio"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Storia", "Vie"],
    category: "Storia",
    dificultad: 2,
    fortext: "della Salvezza",
    words: [
      {
        category: "Tappe universali",
        fortext: "per tutti - non si possono rifiutare",
        words: ["CREAZIONE", "REDENZIONE", "PARUSIA"],
        help: ["alfa - opera del Padre nel Figlio", "tau - il Figlio ha pagato per i nostri peccati", "omega - il Figlio torna a condannare e salvare"]
      },
      {
        category: "Processi particolari",
        fortext: "ancora di più per chi lo sceglie",
        words: ["PROVVIDENZA","PEDAGOGIA", "CO-PARTECIPAZIONE", "RIVELAZIONE"],
        help: ["Dio assiste","Dio guida e insegna", "Dio invia, unge, ascolta",  "Dio toglie progressivamente i veli"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Morale", "Antropologia", "Società"],
    category: "Virtù",
    dificultad: 1,
    fortext: "Capacità che ci avvicinano a Dio",
    words: [
      {
        category: "Teologali",
        fortext: "punti cardinali di ogni cristiano",
        words: ["FEDE", "SPERANZA", "CARITÀ"],
        help: ["credere in Dio", "confidare nelle promesse", "donare la vita"]
      },
      {
        category: "Cardinali",
        fortext: "punti cardinali di ogni uomo (Sant'Ambrogio)",
        words: ["PRUDENZA", "GIUSTIZIA", "TEMPERANZA", "FORTEZZA"],
        help: ["discernimento", "dare a ciascuno il suo", "autocontrollo", "forza interiore"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Morale"],
    category: "Peccati",
    dificultad: 2,
    fortext: "Azioni e intenzioni che ci allontanano da Dio",
    words: [
      {
        category: "Religiosi",
        fortext: "Offese contro la santità divina",
        words: ["IDOLATRIA", "PROFANAZIONE", "BESTEMMIA"],
        help: ["adorare ciò che è creato", "trattare in modo irrispettoso ciò che è sacro", "parola ingiuriosa"]
      },
      {
        category: "Capitali",
        fortext: "Radici delle tendenze disordinate",
        words: ["GOLA & AVARIZIA", "INVIDIA & IRA", "ACCIDIA & LUSSURIA", "EGOCENTRISMO"],
        help: ["smodatezza nel cibo e nel possesso", "tristezza per il bene altrui e furia", "svogliatezza e sfrenatezza sensuale", "eccesso di sé"]
      }
    ]
  },
  {
    tags: ["Bibbia", "N.T.", "Vangeli", "Gesù", "Simboli"],
    category: "IO SONO",
    dificultad: 1,
    fortext: "Gesù si è auto-definito con questi simboli",
    words: [
      {
        category: "del CIELO eterno",
        fortext: "Attributi eterni e di salvezza",
        words: ["RISURREZIONE & VITA", "VIA & VERITÀ","PANE"],
        help: ["...gloriosa & ...eterna", "...e vita","...di vita"]
      },
      {
        category: "in il MONDO",
        fortext: "Simboli del campo",
        words: ["LUCE", "VITE", "PASTORE", "PORTA"],
        help: ["...del mondo", "...vera", "il buon...", "...del recinto"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Maria", "Tradizione", "Liturgia"],
    category: "Feste Mariane",
    dificultad: 3,
    fortext: "celebrazioni nel calendario",
    words: [
      {
        category: "TITOLI",
        fortext: "Benedetta fra tutte le donne",
        words: ["MADRE", "SPOSA", "REGINA"],
        help: ["...della Chiesa", "...dello Spirito Santo", "...della Creazione"]
      },
      {
        category: "DOGMI",
        fortext: "verità di fede definitive",
        words: ["MADRE", "VERGINE", "IMMACOLATA", "ASSUNTA"],
        help: ["...di Dio (Theotokos)", "...perpetua", "...concezione", "...in cielo"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Preghiera", "Maria", "Tradizione"],
    category: "Litanie Mariane",
    dificultad: 3,
    fortext: "Titoli e Virtù",
    words: [
      {
        category: "MADRE di Dio",
        fortext: "Invocazioni alla dimora del Salvatore",
        words: ["ARCA", "TABERNACOLO", "CASA & SEDE"],
        help: ["...dell'alleanza", "...della gloria eterna", "...d'oro & ...della sapienza"]
      },
      {
        category: "REGINA della Creazione",
        fortext: "Invocazioni all'intercettrice celeste",
        words: ["SPECCHIO", "ROSA", "STELLA", "RIFUGIO & PORTA"],
        help: ["...di Giustizia, ...della santità divina", "...mistica", "...del mattino", "...dei peccatori & ...del cielo"]
      }
    ]
  },
  {
    tags: ["Vangeli", "Storia", "Tradizione","Nomi"],
    category: "Apostoli",
    dificultad: 2,
    fortext: "I 14 eletti",
    words: [
      {
        category: "I primi 6",
        fortext: "4 fratelli e 2 amici",
        words: ["PIETRO & ANDREA", "GIACOMO & GIOVANNI", "FILIPPO & BARTOLOMEO"],
        help: ["pescatori di uomini", "figli del tuono", "(Gv 1) vieni e vedrai"]
      },
      {
        category: "I ultimì 8",
        fortext: "Diversità di carismi",
        words: ["TOMMASO & MATTEO", "GIACOMO & TADDEO", "SIMONE & GIUDA", "PAOLO & MATTIA"],
        help: ["l'incredulo & il pubblicano (ricco)", "il minore (discreto) & Giuda (riflessivo)", "lo zelota (nazionalista) & il tesoriere (traditore)", "persecutore di cristiani & l'eletto a sorte"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Liturgia", "Storia", "Vie", "Tradizione"],
    category: "Tempo Liturgico",
    dificultad: 1,
    fortext: "Il calendario della Chiesa",
    words: [
      {
        category: "Feste",
        fortext: "Grandi solennità della salvezza",
        words: ["NATALE", "PASQUA", "PENTECOSTE"],
        help: ["nascita di Gesù", "risurrezione del Signore", "discesa dello Spirito Santo"]
      },
      {
        category: "Preparazione",
        fortext: "Tempi di attesa",
        words: ["ORDINARIO", "AVVENTO", "QUARESIMA", "SETTIMANA Santa"],
        help: ["tempo ordinario", "attesa della venuta", "quaranta giorni di preparazione", "passione & morte"]
      }
    ]
  },
  {
    tags: ["Bibbia", "N.T.", "Vangeli", "Gesù", "Morale"],
    category: "Beatitudini",
    dificultad: 1,
    fortext: "Beati quelli che (hanno) …",
    words: [
      {
        category: "Cuore",
        fortext: "Atteggiamenti interiori benedetti",
        words: ["cuore PURO", "cuore POVERO", "cuore MITE"],
        help: ["perché vedranno Dio", "perché di essi è il Regno dei Cieli", "perché erediteranno la terra"]
      },
      {
        category: "Giustizia",
        fortext: "Impegno e prova per la pace",
        words: ["FAME di giustizia", "PERDONANO le in-giustizie", "LAVORANO per la giustizie", "SOFFRONO in-giustizie"],
        help: ["...e sete", "misericordiosi", "... e la pace", "...a causa del mio nome"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Simboli", "Fisica", "Bibbia", "N.T."],
    category: "Natura",
    dificultad: 1,
    fortext: "Simboli di Dio",
    words: [
      {
        category: "Animali",
        fortext: "Creature con valore teologico",
        words: ["COLOMBA", "LEONE", "AGNELLO"],
        help: ["...della pace", "...di Giuda", "...che toglie il peccato del mondo"]
      },
      {
        category: "Elementi",
        fortext: "Simboli fisici che rivelano l'immersione di Dio nel mondo",
        words: ["PIETRA & ROCCIA", "ACQUA & ARIA", "LUCE & FUOCO"],
        help: ["...angolare & ...spirituale", "idrata & ossigena", "illumina & trasforma"],
        PN: false
      }
    ]
  },
  {
    tags: ["Chiesa", "Società", "Morale"],
    category: "Giudizio Civile",
    dificultad: 3,
    fortext: "Variabili da cui dipende il giudizio",
    words: [
      {
        category: "Punibilità",
        fortext: "Condizioni di imputabilità morale",
        words: ["COSCIENZA", "GRAVITÀ", "CONSENSO"],
        help: ["intelletto", "veniale o mortale", "intenzione"]
      },
      {
        category: "Aggravamento o Aiuto",
        fortext: "Elementi modificatori della colpa",
        words: ["CONTESTO", "CONTRIZIONE", "CONDOTTA", "CONVERSIONE"],
        help: ["circostanza", "pentimento", "premio", "trasformazione"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Storia","Nomi"],
    category: "Gravidanze Miracolose",
    dificultad: 2,
    fortext: "Nomi di madri e/o figli",
    words: [
      {
        category: "N.T.",
        fortext: "Nascite dell'annuncio del Regno",
        words: ["ELISABETTA & GIOVANNI", "MARIA & GESÙ"],
        help: ["Famiglia di Zaccaria", "Famiglia di Giuseppe"]
      },
      {
        category: "A.T.",
        fortext: "Nascite straordinarie dell'Alleanza",
        words: ["ANNA & SAMUELE", "SARA & ISACCO", "REBECCA & GIACOBBE", "RACHELE & GIUSEPPE", "SANSONE"],
        help: ["Consacrato al tempio", "Famiglia di Abramo", "Famiglia di Isacco", "Famiglia di Giacobbe", "non gli si può tagliare i capelli"]
      }
    ]
  },
  {
    tags: ["Logos", "Catechismo", "Gesù"],
    category: "EGLI È Dio",
    dificultad: 2,
    fortext: "2a persona della Trinità",
    words: [
      {
        category: "LOGOS",
        fortext: "Traduzioni dell'infinito (Gv 1,1-14)",
        words: ["PRINCIPIO & FINE", "SAPIENZA", "VERBO", "PAROLA"],
        help: ["alfa & omega", "(Gv 1,3) senza di lei nulla è stato fatto di ciò che esiste", "(Gv 1,14) ...si è fatto carne e ha posto la sua dimora in mezzo a noi", "(Gv 1,9) ...era la luce vera che illumina ogni uomo"]
      },
      {
        category: "Dio & Uomo",
        fortext: "Qualcuno ha mai visto Dio? (Gv 1,17-18)",
        words: ["GESÙ CRISTO", "figlio UNIGENITO", "DIO"],
        help: ["Dio ha 1 nome e 1 volto", "unico genito che ha rivelato Dio", "nessuno l'ha mai visto"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Vangeli", "N.T.", "Gesù"],
    category: "TU SEI",
    dificultad: 3,
    fortext: "Vero Dio & Vero Uomo",
    words: [
      {
        category: "Figlio di Dio",
        fortext: "Confessioni di FEDE",
        words: ["mio SIGNORE & mio DIO", "AGNELLO di Dio & SANTO di Dio", "SALVATORE & CRISTO"],
        help: ["confessato da Tommaso l'incredulo", "confessato da Giovanni Battista & Pietro & i demoni", "confessato dai samaritani & Pietro & Andrea"]
      },
      {
        category: "Figlio dell'Uomo",
        fortext: "Riconoscimento storico",
        words: ["Figlio di MARIA & Figlio del FALEGNAME", "MAESTRO & PROFETA", "Figlio di ABRAMO & Figlio di DAVIDE", "NAZARENO & RE d'Israele"],
        help: ["detto dai Nazareni", "detto da Natanaele & la folla", "detto da Matteo & la folla", "detto da Natanaele & i demoni"]
      }
    ]
  },
  {
    tags: ["Liturgia", "Preghiera", "Catechismo", "Bibbia", "N.T."],
    category: "Padre Nostro",
    dificultad: 1,
    fortext: "richieste per Dio o per l'Uomo",
    words: [
      {
        category: "TEOCENTRICHE",
        fortext: "Orientate alla gloria divina",
        words: ["NOME", "REGNO", "VOLONTÀ"],
        help: ["sia santificato il tuo...", "venga il tuo...", "sia fatta la tua..."]
      },
      {
        category: "ANTROPOCENTRICHE",
        fortext: "Orientate ai bisogni umani",
        words: ["PANE", "DEBITI", "TENTAZIONE", "MALE"],
        help: ["...quotidiano", "rimetti a noi i nostri...", "non abbandonarci alla...", "liberaci dal..."]
      }
    ]
  },
  {
    tags: ["Chiesa", "Catechismo"],
    category: "1 Chiesa",
    dificultad: 2,
    fortext: "Corpo mistico di Cristo (1 sposa)",
    words: [
      {
        category: "1 solo",
        fortext: "Unicità & Unità",
        words: ["SIGNORE & BATTESIMO & FEDE", "CORPO & SPIRITO", "ANIMA", "CARNE"],
        help: ["Credo lungo - Efesini 4 - Si crede in 1 solo Dio e si nasce 1 sola volta", "la Chiesa e Dio (Efesini 4)", "...tra i credenti (Atti)", "...tra uomo e donna"]
      },
      {
        category: "diversità",
        fortext: "Varietà di doni comunitari",
        words: ["LINGUE", "CARISMI", "MINISTERI"],
        help: ["lingue", "doni spirituali", "servizi nella comunità"]
      }
    ]
  },
  {
    tags: ["Logos", "Bibbia", "N.T.", "Vangeli"],
    category: "Greco",
    dificultad: 3,
    fortext: "La lingua dei vangeli",
    words: [
      {
        category: "DIVINO & UMANO",
        fortext: "Termini filosofici e teologici",
        words: ["LOGOS & LOGICA", "THEOS & ANTHROPOS", "URANOS & KOSMOS", "KAIROS & CHRONOS"],
        help: ["sapienza di Dio & dell'uomo", "Dio & uomo", "cielo & mondo", "tempo denso & ciclico"]
      },
      {
        category: "VECCHIO & NUOVO",
        fortext: "Concetti dell'esistenza e della vita",
        words: ["SARX & SOMA", "BIOS & ZOE", "PSICHE & PNEUMA"],
        help: ["carne & corpo", "vita corruttibile & eterna", "anima (psiche) & spirito (soffio)"]
      }
    ]
  },
  {
    tags: ["Vie", "Logos", "Catechesi"],
    category: "Theosis",
    dificultad: 3,
    fortext: "Vie di partecipazione alla natura divina",
    words: [
      {
        category: "Tappe Universali",
        fortext: "Lettura biblica della salvezza",
        words: ["GENESI", "KENOSI", "APOCALISSE"],
        help: ["nascita-origine", "svuotamento", "rivelazione"]
      },
      {
        category: "Processi Particolari",
        fortext: "Conversione nel cammino spirituale",
        words: ["GNOSI", "CATARSI","PRASSI", "ASCESI"],
        help: [ "PENSIERO, conoscenza per contemplazione""PAROLA, purificazione, purgatorio","OPERA, fare la volontà di Dio",  "OMISIONE, disciplina"]
      }
    ]
  },
  {
    tags: ["Liturgia", "Chiesa"],
    category: "Offerte",
    dificultad: 2,
    fortext: "doni dell'Uomo a Dio",
    words: [
      {
        category: "Presepe",
        fortext: "Doni dei Re Magi",
        words: ["ORO", "INCENSO", "MIRRA"],
        help: ["perché Gesù è Re", "perché Gesù è Dio e salirà al Cielo", "perché Gesù è Uomo e soffrirà la morte."]
      },
      {
        category: "Messa",
        fortext: "Doni nell'Eucaristia",
        words: ["TEMPO & DENARO", "LAVORO & FATICA", "CORPO & SANGUE", "GIOIA & SOFFERENZA"],
        help: ["ciò che è prezioso in questo mondo", "...della giornata", "...di Cristo - Memoriale del Sacrificio incruento", "canti & pianti"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Logos", "Simboli", "Catechesi"],
    category: "UNO",
    dificultad: 2,
    fortext: "Espressioni dell'intero",
    words: [
      {
        category: "CREATORE & CREATURA",
        fortext: "Unicità nella Creazione e nel Figlio",
        words: ["UNICO", "UNIGENITO", "UNIVERSO"],
        help: ["Dio uno e trino...", "(1Gv 4,9) Dio ha mandato il suo Figlio…", "L'unica versione della Creazione"]
      },
      {
        category: "CHIESA",
        fortext: "Popolo radunato, Corpo mistico",
        words: ["UNANIME", "UNIVERSITÀ", "UNIVERSALE", "UNITÀ"],
        help: ["(At 4,32) Erano un cuore solo e un'anima sola", "Istituzione di studi superiori", "cattolico", "... nella diversità rappresentata dal capo"]
      }
    ]
  },
  {
    tags: ["Catechismo", "Morale", "Antropologia"],
    category: "Facoltà",
    dificultad: 3,
    fortext: "e caratteristiche costitutive dell'essere umano",
    words: [
      {
        category: "Teologiche",
        fortext: "dei figli di Dio (immagine & somiglianza)",
        words: ["INTELLIGENZA", "COSCIENZA", "VOLONTÀ", "DIGNITÀ"],
        help: [
          "immagine & somiglianza dell'OMNIScienza di Dio",
          "immagine & somiglianza dell'OMNIPresenza di Dio",
          "immagine & somiglianza dell'OMNIPotenza di Dio",
          "immagine & somiglianza di Dio Figlio"
        ]
      },
      {
        category: "Antropologiche",
        fortext: "dei figli di Adamo (frutti del peccato)",
        words: ["DIPENDENZA", "ERRANZA", "CONCUPISCENZA"],
        help: [
          "senza l'aiuto altrui non possiamo fare nulla",
          "Peccatori",
          "Debolezza"
        ]
      }
    ]
  },
  {
    tags: ["Bibbia", "A.T.", "N.T."],
    category: "Geografia",
    dificultad: 2,
    fortext: "nella Terra Promessa",
    words: [
      {
        category: "Accoglienti",
        fortext: "Luoghi di benedizione e vita",
        words: ["GIARDINO", "BOSCO", "CAMPO", "FIUME"],
        help: ["...dell'Eden", "...del Libano", "...di grano", "...Giordano"]
      },
      {
        category: "Ostili",
        fortext: "Luoghi di prova e ritiro",
        words: ["DESERTO", "MARE", "MONTAGNA"],
        help: ["...di Giudea", "...di Galilea (lago)", "...Tabor"]
      }
    ]
  },
  {
    tags: ["Bibbia", "Vangeli", "N.T.", "Gesù"],
    category: "Luoghi",
    dificultad: 2,
    fortext: "visitati da Gesù",
    words: [
      {
        category: "Terra",
        fortext: "Costruzioni recintate che simboleggiano protezione",
        words: ["CITTÀ", "TEMPIO", "CASA", "ORTO"],
        help: ["...murata, fortificata. Luogo del popolo.", "...di Gerusalemme. Luogo santo.", "...della suocera di Pietro. Luogo familiare, di guarigione e servizio.", "...degli ulivi (Getsemani). Luogo di ritiro, riposo, tradimento."]
      },
      {
        category: "Acqua",
        fortext: "Costruzioni che simboleggiano la vita",
        words: ["POZZO", "BARCA", "PISCINA"],
        help: ["...di Giacobbe. Fonte d'acqua dolce.", "...dei pescatori.", "...di Betesda. Luogo di purificazione."]
      }

    ]
  },
  {
    tags: ["Catechismo", "Ruaj", "Morale"],
    category: "Frutti",
    dificultad: 3,
    fortext: "dello Spirito Santo",
    words: [
      {
        category: "Vita interiore",
        fortext: "Dio dentro di noi",
        words: ["CONTINENZA & TEMPERANZA", "MODESTIA & UMILTÀ", "MAGNANIMITÀ & LONGANIMITÀ", "PACE & GIOIA"],
        help: [
          "dominio di sé",
          "Non ostentare le proprie capacità e riconoscere i propri limiti",
          "anima grande & perseverante",
          "armonia & felicità"
        ]
      },
      {
        category: "Vincolo fraterno",
        fortext: "riflesso divino nella relazione con il prossimo",
        words: ["BONTÀ & BENEVOLENZA", "AFFABILITÀ & GENEROSITÀ", "MITEZZA & GIOIA", "FEDELTÀ & PAZIENZA"],
        help: [
          "fare & volere il bene",
          "buone maniere & dono disinteressato",
          "non genera problemi & contagia un sorriso",
          "costanza & tolleranza"
        ]
      }
    ]
  },
  {
    tags: ["Società", "Storia", "Ruaj","Nomi"],
    category: "Religioni",
    dificultad: 1,
    fortext: "e filosofie di vita",
    words: [
      {
        category: "Monoteiste",
        fortext: "Fede nel Dio di Abramo",
        words: ["CRISTIANESIMO", "EBRAISMO", "ISLAM"],
        help: ["✝️ Dio uno & trino", "✡️ popolo eletto", "☪️ servi di Dio"]
      },
      {
        category: "Pre-cristiane",
        fortext: "Tradizioni antiche e spiritualità",
        words: ["TAOISMO", "BUDDHISMO", "INDUISMO", "POLITEISMO greco"],
        help: ["☯️ parte del tutto", "☸️ nirvana", "🕉️ intimità con Dio", "🏛️ dramma mitologico"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Catechismo", "Preghiera", "Ruaj", "Liturgia", "Tradizione"],
    category: "Credo nello Spirito Santo",
    dificultad: 2,
    fortext: "Professione di fede",
    words: [
      {
        category: "Credo Niceno-Costantinopolitano",
        fortext: "Affermazioni teologici",
        words: ["PROCEDE", "stessa ADORAZIONE & GLORIA", "ha PARLATO"],
        help: ["...dal Padre e dal Figlio (Filioque)", "...che con il Padre e il Figlio", "...per mezzo dei Profeti"]
      },
      {
        category: "Credo degli Apostoli",
        fortext: "Sintesi della fede",
        words: ["santa CHIESA", "COMUNIONE", "PERDONO", "RISURREZIONE"],
        help: ["Cattolica", "...dei Santi", "...dei peccatti", "...della carne"]
      }
    ]
  },
  {
    tags: ["Chiesa", "Catechismo", "Gesù", "Preghiera", "Liturgia", "Tradizione"],
    category: "Credo in Gesù Cristo",
    dificultad: 2,
    fortext: "Professione di fede",
    words: [
      {
        category: "Credo Niceno-Costantinopolitano",
        fortext: "Teologia sul Figlio",
        words: ["GENERATO", "si è INCARNATO", "sostanza NATURA"],
        help: ["non creato", "nel grembo di Maria", "del Padre"]
      },
      {
        category: "Credo degli Apostoli",
        fortext: "Sintesi della fede",
        words: ["fu CROCEFISSO", "È RISUSCITATO", "SIEDE", "verrà a GIUDICARE"],
        help: ["...morì e fu sepolto", "...dai morti", "...alla destra di Dio Padre", "...i vivi e i morti"]
      }
    ]
  },
  {
    tags: ["Bibbia", "A.T.", "Storia","Nomi"],
    category: "Ebrei eletti",
    dificultad: 2,
    fortext: "per preparare la venuta del Messia",
    words: [
      {
        category: "Antenati",
        fortext: "Dio sceglie per suo Figlio un popolo, un lignaggio, una terra",
        words: ["ABRAMO", "DAVIDE", "ZOROBABELE"],
        help: [
          "da Pastore a Patriarca - 1° Altare - prefigurò il sacerdozio di Gesù",
          "da Pastore a Re - 1° Tempio - prefiguró la regalità di Gesù",
          "da esiliato a governatore - 2° Tempio - prefigurò la risurrezione di Gesù"
        ]
      },
      {
        category: "Profeti",
        fortext: "Dio sceglie per il suo popolo annunciatori della Sua Parola",
        words: ["MOISÈ", "ELIA", "GEREMIA", "GIOVANNI"],
        help: [
          "annunciò la liberazione d'Israele & prefigurò la Legge di Gesù",
          "annunciò il vero Dio & prefigurò l'Ascensione di Gesù",
          "annunció la condanna di Giuda & prefigurò la sofferenza di Gesù",
          "annunciò l'arrivo del Messia & prefigurò la parresia di Gesù"
        ]
      }
    ]
  },
  {
    tags: ["Catechesi", "Sacramenti", "Vie", "Tradizione"],
    category: "Sviluppo Cristiano",
    dificultad: 1,
    fortext: "tappe evolutive nella vita di fede",
    words: [
      {
        category: "Cattolico",
        fortext: "tappe sacramentali con la chiesa",
        words: [
          "BATTESIMO",
          "COMUNIONE",
          "CRECIMA",
          "CONSACRAZIONE"
        ],
        help: [
          "Morire sulla croce - nascere in Cristo",
          "Cibo della fede - Sacrificio pasquale",
          "Espressione di parole e opere - Vita pentecostale",
          "Alleanza con Dio - Vita limitata nel mondo, aperta in cielo"
        ]
      },
      {
        category: "Personale",
        fortext: "crescita nella santità",
        words: ["CONVERSIONE", "FORMAZIONE", "MISSIONE"],
        help: [
          "cambiamenti che ci avvicinano al vivere secondo Dio",
          "contemplazione dei misteri di Dio",
          "vivere per Dio - servirlo"
        ]
      }
    ]
  },
  {
    tags: ["Catechesi", "Antropologia", "Sacramenti", "Tradizione","Vie"],
    category: "Sviluppo Umano",
    dificultad: 2,
    fortext: "Biologico & Spirituale",
    words: [
      {
        category: "Crescita universale/iniziale",
        fortext: "Sviluppo del corpo (fisico) & Sacramenti dell'iniziazione",
        words: [
          "BAMBINO & BATTESIMO",
          "FANCIULLO & 1a COMUNIONE",
          "ADOLESCENTE & CRESIMA"
        ],
        help: [
          "sviluppo della motricità, ascolto e linguaggio & primo sacramento",
          "sviluppo della lettura, scrittura e consuetudini & nutrimento della fede",
          "sviluppo della sessualità, moralità e amicizia & fervore dello spirito"
        ]
      },
      {
        category: "Maturazione individuale/volitiva",
        fortext: "Sviluppo dell'intelletto (testa) & Sacramenti di servizio e guarigione",
        words: [
          "GIOVANE & CONSACRAZIONE",
          "ADULTO & RICONCILIAZIONE",
          "ANZIANO & UNZIONE"
        ],
        help: [
          "fase di decisioni ed emancipazione",
          "fase di lavoro e servizio & sacramento per ricominciare quando si sbaglia",
          "fase di riposo & riflessione & sacramento di forza"
        ]
      }
    ]
  },
  {
    tags: ["Catechesi", "Fisica", "Simboli"],
    category: "Acqua Dolce",
    dificultad: 1,
    fortext: "Fonti di vita",
    words: [
      {
        category: "Aria",
        fortext: "Si muovono in alto",
        words: ["NEVE", "PIOGGIA", "NUBE"],
        help: ["Bianca come lana", "Fa germogliare la terra", "Vapore concentrato"]
      },
      {
        category: "Terra",
        fortext: "Risotai naturali",
        words: ["GHIACCIAIO", "FIUME", "LAGO", "SORGENTE"],
        help: ["Imponente massa di ghiaccio", "Scende verso il mare", "Acqua circondata dalla terra", "Sorgente che sgorga dalla terra"]
      }
    ]
  },
  {
    tags: ["Catechesi", "Fisica", "Simboli"],
    category: "Solare",
    dificultad: 2,
    fortext: "Un segno grandioso apparve nel cielo: una donna vestita di Sole",
    words: [
      {
        category: "Elementi della fissione",
        fortext: "Energia illimitata",
        words: ["PLASMA", "RADIAZIONE", "MASSA"],
        help: ["Più del fuoco", "Onde di luce invisibile", "Attira i pianeti"]
      },
      {
        category: "Effetti sulla Terra",
        fortext: "Ciò che vediamo/sentiamo a causa del Sole",
        words: ["GIORNO", "CALORE", "LUCE", "SPLENDORE"],
        help: ["Quando sorge il Sole", "Vibrazione termica", "Illumina le tenebre", "Luminosità"]
      }
    ]
  },
  {
    tags: ["Catechesi", "Fisica", "Simboli", "Bibbia", "A.T.", "N.T."],
    category: "Aereo",
    dificultad: 2,
    fortext: "Lo Spirito è come il vento",
    words: [
      {
        category: "Ruaj",
        fortext: "Ciò che si muove",
        words: ["VENTO", "BREZZA", "PNEUMA"],
        help: ["Non sai da dove viene né dove va", "…leggera", "Spirito"]
      },
      {
        category: "Esce dalla bocca",
        fortext: "Bisogna respirare",
        words: ["SOFFIO", "ALITO", "LODE", "VOCE"],
        help: [
          "… di Dio aleggiava sulle acque",
          "Alito di vita animica",
          "Chi canta prega due volte",
          "…che grida nel deserto: Preparate la via del Signore"
        ]
      }
    ]
  },
  {
    tags: ["Catechesi", "Fisica", "Simboli", "Bibbia"],
    category: "Terra",
    dificultad: 2,
    fortext: "Elemento e luogo di lavoro",
    words: [
      {
        category: "Materia (In)Organica",
        fortext: "solida, utile, contenitore",
        words: ["POZZO & ORTO", "ROCCIA & SALE", "FANGHO & HUMUS"],
        help: ["Acqua nascosta & terra fertile", "…minerali", "Umano: polvere + acqua"]
      },
      {
        category: "Geografia",
        fortext: "Il suolo e le sue forme",
        words: ["CAVERNA & SEPOLCRO", "CAMPO & PRATO", "MONTAGNA & VALLE", "DESERTO & OASI"],
        help: ["Luoghi oscuri & di riposo", "…di coltivazione & erbe", "Elevazione & pendio", "Sabbia & vita"]
      }
    ]
  },
  {
    tags: ["Catechesi", "Fisica", "Simboli", "Bibbia", "N.T.", "Vangeli"],
    category: "Agricoltura",
    dificultad: 1,
    fortext: "Nei Vangeli",
    words: [
      {
        category: "Generici",
        fortext: "La vita che nasce dalla terra",
        words: ["SEME & FRUTTO", "RADICE & ALBERO", "CAMPO & PRATO"],
        help: ["Ciò che si semina & ciò che si raccoglie", "Ciò che sostiene & ciò che cresce", "«…di coltivazione & erbe»"]
      },
      {
        category: "Specifici",
        fortext: "Piante delle parabole e della vita di Gesù",
        words: ["VITE & TRALCIO", "GRANO & ZIZZANIA", "ULIVO & SENAPE", "SICOMORO & FIGO"],
        help: [
          "Rimanete in me",
          "Cresceranno insieme fino al mietitura",
          "Olio & il seme più piccolo",
          "L'albero di Zaccheo & l'albero che non dà frutto"
        ]
      }
    ]
  },
  {
    tags: ["Vie", "Catechesi", "Bibbia", "Logos"],
    category: "-α & ω+",
    dificultad: 3,
    fortext: "Prima e dopo il tempo",
    words: [
      {
        category: "Genesi",
        fortext: "In principio…",
        words: ["PENSIERO", "DECISIONE", "CREAZIONE"],
        help: ["...con senso - Logos", "...libera & sempiterna - Fiat - Il 'sì' di Dio", "opera di Dio"]
      },
      {
        category: "Rivelazione",
        fortext: "Ciò che è nascosto viene alla luce",
        words: ["MATRIMONIO", "GNOSI", "LODE", "RIPOSO"],
        help: ["Le nozze dell'Agnello", "«Lo vedremo così come egli è» — 1 Gv 3,2", "Alleluia! Osanna!", "Vado a prepararvi un posto nella casa del Padre mio"]
      }
    ]
  },
  {
    tags: ["Vie", "Bibbia", "N.T."],
    category: "Croce",
    dificultad: 2,
    fortext: "L'albero della vita",
    words: [
      {
        category: "Pasqua",
        fortext: "dell'Agnello",
        words: ["PASSIONE", "MORTE", "RISURREZIONE"],
        help: ["«Padre, se è possibile, passi da me questo calice»", "«Padre, nelle tue mani consegno il mio Spirito»", "«dite ai miei fratelli che vadano in Galilea»"]
      },
      {
        category: "Salvezza",
        fortext: "dell'Uomo",
        words: ["REDENZIONE", "SANTIFICAZIONE", "GIUDIZIO", "ASCENSIONE"],
        help: ["l'Agnello che toglie i peccati del mondo", "«se me ne vado vi manderò il Paraclito»", "«separerà le pecore alla sua destra, i capri alla sua sinistra»", "«Maria ci apre la via»"]
      }
    ]
  },
  {
    tags: ["Liturgia", "Chiesa", "Preghiera"],
    category: "GLORIA",
    dificultad: 1,
    fortext: "nella Messa",
    words: [
      {
        category: "Al PADRE",
        fortext: "Onnipotente",
        words: ["Ti LODIAMO", "Ti BENEDICIAMO", "Ti ADORIAMO", "Ti RINGRAZIAMO"],
        help: ["«…con il nostro canto»", "«…con le nostre parole»", "«..nel nostro cuore»", "«…per la tua gloria immensa»"]
      },
      {
        category: "Al FIGLIO",
        fortext: "nostro Signore",
        words: ["PIETÀ", "PECCATO", "PREGHIERA"],
        help: ["«abbi ...di noi»", "«Tu che togli il...»", "«Accogli la nostra...»"]
      }
    ]
  },
  {
    tags: ["Simboli", "catechesi", "fisica"],
    category: "Infinito",
    dificultad: 3,
    fortext: "che non ha fine",
    words: [
      {
        category: "temporale",
        fortext: "chronos",
        words: ["ETERNO", "SEMPITERNO", "PERPETUO"],
        help: ["«né inizio né fine, fuori dal tempo»", "«con inizio, senza fine»", "«nel tempo per sempre»"]
      },
      {
        category: "spaziale",
        fortext: "kosmos",
        words: ["ABISSO", "IMMENSO", "INESAURIBILE", "INCOMMENSURABILE"],
        help: ["«la terra era informe e deserta e le tenebre ricoprivano l'...»", "che non ha misura", "che non si esaurisce", "che non si può scandagliare"]
      }
    ]
  },
  {
    tags: ["Storia", "A.T.", "Bibbia","Nomi"],
    category: "FRATELLI",
    dificultad: 2,
    fortext: "Nell'Antico Testamento",
    words: [
      {
        category: "Uniti",
        fortext: "Con lievi conflitti",
        words: ["ISMAELE & ISACCO", "GIUDA & BENIAMINO", "ARONNE & MOISÈ"],
        help: ["Figli di Abramo", "Figli di Giacobbe", "Fratelli dell'Esodo"]
      },
      {
        category: "Fratricidio",
        fortext: "Tentativo o esecuzione",
        words: ["ABELE & CAINO", "ESAU & GIACOBBE", "LEVI & GIUSEPPE", "SALOMONE & ADONIA"],
        help: ["Gelosia per l'offerta. Primo omicidio", "Inganno per la benedizione del padre", "Gelosia per l'affetto del padre. Il pozzo e i mercanti di schiavi", "Tradimento, Potere, Lussuria. Il trono di Giuda"]
      }
    ]
  },
  {
    tags: ["Catechismo"],
    category: "Grazie",
    dificultad: 2,
    fortext: "Sia lodato il mio Signore",
    words: [
      {
        category: "All'inizio",
        fortext: "Genesi - alfa",
        words: ["mi hai PENSATO", "mi hai SCELTO", "mi hai CREATO"],
        help: ["...con senso & missione", "...liberamente ed eternamente", "...a tua immagine e somiglianza"]
      },
      {
        category: "Alla fine",
        fortext: "Parusia - omega",
        words: ["mi GIUDICHERAI", "mi SALVERAI", "mi SANTIFICHERAI", "ti RIVELERAI"],
        help: ["...con la tua misericordia o con le mie opere", "...dal nemico e dall'inferno", "purificando la mia anima e riempiendomi del tuo spirito", "...e ti vedrò così come sei"]
      }
    ]
  },
  {
    tags: ["Liturgia", "Bibbia"],
    category: "NATALE",
    dificultad: 1,
    fortext: "Il Verbo si è fatto carne",
    words: [
      {
        category: "Avvento",
        fortext: "Liturgia di Preparazione",
        words: ["SPERANZA", "PACE", "GIOIA", "AMORE"],
        help: [
          "... non delude (Rm 5,5)",
          "«...agli uomini che Dio ama» (Lc 2,14)",
          "«Vi annuncio una grande ...» (Lc 2,10)",
          "«Dio ha mandato nel mondo il suo Figlio unico» (1Gv 4,9)"
        ]
      },
      {
        category: "Epifania",
        fortext: "Manifestazione di Cristo",
        words: ["BETLEMME", "PRESEPE", "OFFERTE"],
        help: [
          "Casa del pane",
          "«non c'era posto per loro nell'alloggio»",
          "«Oro, incenso e mirra» (Mt 2,11)"
        ]
      }
    ]
  },
  {
    tags: ["Bibbia", "N.T.", "Vangeli", "Tradizione"],
    category: "EPIFANIA",
    dificultad: 1,
    fortext: "La manifestazione del Signore",
    words: [
      {
        category: "Re",
        fortext: "Simboli dei poipoli pagani",
        words: ["MELCHIORRE", "GASPARE", "BALDASSARRE", "ERODE"],
        help: [
          "Il vecchio con la barba bianca; porta l'oro",
          "Il giovane; porta l'incenso",
          "Quello di età matura; porta la mirra",
          "Voleva sapere dove fosse il Re dei Giudei"
        ]
      },
      {
        category: "Presepe",
        fortext: "L'umile dimora del nostro cuore",
        words: ["PASTORI", "ANGELI", "BUE", "ASINO"],
        help: [
          "«C'erano in quella regione alcuni ...» (Lc 2,8)",
          "«Apparve una moltitudine dell'esercito celeste» (Lc 2,13)",
          "«Il ... conosce il suo proprietario» (Is 1,3)",
          "«L'... la greppia del suo padrone» (Is 1,3)"
        ]
      }
    ]
  },
  {
    tags: ["Vie", "Bibbia", "Tradizione"],
    category: "Vecchio",
    dificultad: 1,
    fortext: "non ci sarà più",
    words: [
      {
        category: "sulla TERRA",
        fortext: "città salda, santa e illuminata",
        words: ["MARE & SETE", "TEMPIO & PORTE chiuse", "NOTTE & TENEBRE"],
        help: [
          "È finita la pesca (Ap 21,1) - «A chi ha sete darò gratuitamente della fonte dell'acqua della vita» — (Ap 21,6)",
          "Dimora di Dio (Ap 21,22)",
          "«La città non ha bisogno della luce del sole, né della luce della luna» (Ap 21,23)"
        ]
      },
      {
        category: "nell'ANIMA",
        fortext: "Cielo",
        words: ["MALIZIA & MENZOGNA","MORTE & LAMENTO", "PIANTO & DOLORE",  "IMPURITÀ & MACCHIA"],
        help: [
          "solo benedizione (Ap 22,3)",
          "corruzione & lamento (Ap 21,4)",
          "lacrime & sofferenza (Ap 21,4)",
          "tutto bianco come la neve (Ap 21,8;27)"
        ]
      }
    ]
  },
  {
    tags: ["Catechesi", "Simboli", "Ruaj", "Tradizione"],
    category: "3a Persona",
    dificultad: 2,
    fortext: "della Trinità",
    words: [
      {
        category: "Nomi",
        fortext: "Ciò che si muove e non si vede",
        words: [
          "AMORE & SPIRITO",
          "DONO & PROMESSA",
          "PARACLITO & CONSOLATORE"
        ],
        help: [
          "«L'... di Dio è stato riversato per mezzo dello ... Santo» (Rm 5,5)",
          "Regalo oggi e domani - «Riceverete il ... dello Spirito Santo» (At 2,38)",
          "Avvocato difensore & abbraccio dell'anima (Gv 14,16.26)"
        ]
      },
      {
        category: "Elementi",
        fortext: "Segni visibili dello Spirito",
        words: [
          "VENTO & SOFFIO",
          "ACQUA & FUOCO",
          "DITO & MANO"
        ],
        help: [
          "«Lo Spirito di Dio aleggiava sulle acque» (Gen 1,2)",
          "«Nascere da .. e da ...» (Gv 3,5)",
          "«Io scaccio i demoni con il ... di Dio» (Lc 11,20). «La tua destra, o Signore, ha spezzato il nemico.» (Es 15,6)"
        ]
      }
    ]
  },
  {
    tags: ["Bibbia"],
    category: "NOME",
    dificultad: 1,
    fortext: " di Dio",
    words: [
      {
        category: "Antico Testamento",
        fortext: "Il Dio d'Israele",
        words: ["YAHWEH", "GEOVA", "EL"],
        help: [
          "«Io sono colui che sono» — Es 3,14",
          "Traslitterazione tradizionale di YHWH",
          "Emanuele, Israele, Ismaele, Gabriele, Michele, Raffaele"
        ]
      },
      {
        category: "Nuovo Testamento",
        fortext: "Il nome del Figlio",
        words: ["GESÙ-CRISTO", "GESÙ", "EMANUELE", "NAZARENO"],
        help: [
          "«Genealogia di ..., figlio di Davide, figlio di Abramo» (Mt 1,1) - L'unto",
          "«Essa Partorirà un figlio e tu lo chiamerai ...» (Mt 1,21) - Il salvatore",
          "«Dio con noi» — Mt 1,23",
          "«Così si compì ciò che era stato detto per mezzo dei profeti: sarà chiamato ...» (Mt 2,23)"
        ]
      }
    ]
  }
];