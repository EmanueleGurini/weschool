## Configurazione e Avvio del Progetto

Dopo aver clonato il repository o effettuato un `git pull`, segui i passaggi seguenti per configurare e avviare l'applicazione.

### 1. Creazione del file `.env.local`

All'interno della root del progetto, è necessario creare un file `.env.local` che conterrà le variabili d'ambiente per la connessione a Supabase. Esegui i seguenti passaggi:

1. Nella root del progetto, crea un nuovo file chiamato `.env.local`.
2. Inserisci al suo interno le seguenti stringhe:

```bash
   NEXT_PUBLIC_SUPABASE_URL=https://ihymhmvbzbgzrnlusnxj.supabase.co/
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeW1obXZiemJnenJubHVzbnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4Nzk2MzMsImV4cCI6MjA0MTQ1NTYzM30._mtUPXpudpf1-zMBK2gDk0ddvZJmVch4G3MSd9e6V6E
```

### 2. Installazione delle dipendenze

Prima di avviare il progetto, assicurati di installare tutte le dipendenze necessarie. Nella root del progetto, esegui il seguente comando:

```bash
npm install
```

### 3. Avvio dell'applicazione

Una volta installati i moduli, puoi avviare l'applicazione in modalità di sviluppo con il seguente comando:

```bash
npm run dev
```
