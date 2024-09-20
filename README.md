# 🎓 **We School** 📚

**We School** è un CMS sviluppato per la gestione di voti e assenze all'interno di un bootcamp di programmazione. Sia i professori che gli studenti possono accedere alla loro dashboard tramite login. L'applicazione è costruita con **Tailwind CSS**, **Next.js**, **TypeScript**, e **Supabase**, per offrire un'interfaccia moderna, responsiva e funzionalità avanzate di gestione dati tramite operazioni CRUD e autenticazione sicura.

---

## 🚪 **Dashboard Insegnante**

![screenshot teacher page](https://github.com/giadantioco/weschool/blob/main/public/img/screenshot-teacher.png)

---

## 📝 **Dettaglio Classe Insegnante**

![screenshot teacher detail page](https://github.com/giadantioco/weschool/blob/main/public/img/screenshot-teacher-detail.png)

---

## 🧑‍🎓 **Dashboard Studente**

![screenshot student page](https://github.com/giadantioco/weschool/blob/main/public/img/screenshot-stuent.png)

---

## 💬 **Sezione Chat**

![screenshot chat page](https://github.com/giadantioco/weschool/blob/main/public/img/screenshot-chat.png)

---

## 📖 **Descrizione dell'App**

### 👩‍🏫 **Parte insegnante**:

- I professori possono accedere alla loro home, dove trovano una tabella dei corsi.
- Cliccando su una classe, il professore può vedere il dettaglio degli studenti del corso.
- Funzionalità chiave per i professori:
  - ✅ Segnalare la presenza o l'assenza di un alunno.
  - ✏️ Aggiungere e modificare le votazioni per i vari linguaggi di programmazione.
  - 🔍 Filtrare gli studenti per giorno e accedere ai loro profili personali.
  - 📋 Sezione comunicazioni dedicata agli insegnanti per lasciare note interne.

### 👨‍🎓 **Parte studente**:

- Gli studenti accedono con un login personalizzato per visualizzare il proprio profilo.
- Gli studenti possono visualizzare le informazioni inserite dai professori nella loro pagina personalizzata attraverso un grafico.
- **AI Assistant:** Gli studenti hanno accesso a un assistente basato su intelligenza artificiale che analizza la loro media dei voti. L'AI suggerisce aree di studio specifiche per migliorare i risultati, fornendo anche link a risorse online rilevanti.
- 💬 È anche disponibile una chat aperta a tutti gli studenti di ogni classe.

---

## 🔧 **Funzionalità**

1. **Autenticazione Utente (Supabase)**

   - Funzionalità di registrazione e login per gli utenti (studenti e insegnanti).
   - Autenticazione tramite email e password.
   - Mantiene la sessione dell'utente anche dopo il ricaricamento della pagina.

2. **Gestione del Profilo**

   - Gli utenti possono aggiornare il proprio profilo.
   - I dati del profilo vengono memorizzati e recuperati da Supabase.

3. **Operazioni CRUD**

   - Creazione, Lettura, Modifica e Cancellazione (CRUD) dei dati per la gestione delle informazioni di studenti e corsi.
   - I dati vengono dinamicamente recuperati da Supabase e visualizzati nell'interfaccia utente.

4. **Routing Dinamico con App Router**

   - Routing dinamico di Next.js per transizioni fluide tra le pagine.
   - Rotte protette: le pagine sono accessibili solo previa autenticazione.

5. **Interfaccia Responsiva (Tailwind CSS)**

   - Design completamente responsivo grazie a Tailwind CSS.
   - Componenti UI moderni e accessibili per un'esperienza utente ottimale.

6. **Dashboard e Visualizzazione Dati**

   - Panoramica dei dati degli studenti attraverso un'interfaccia dashboard.
   - Barre di progresso visive per mostrare metriche come la presenza e il progresso delle classi.

7. **Chat Studenti**

   - Sezione di chat aperta agli studenti di tutte le classi per la comunicazione interna.

8. **AI Assistant per Studenti**

   - Suggerimenti personalizzati per migliorare i risultati accademici.
   - Collegamenti a risorse esterne utili basate sulla media dei voti individuale.

---

## 👥 **Il nostro TEAM**

- **Chiara Rapisarda** [GitHub](https://github.com/Ciaranatalie) | [LinkedIn](https://www.linkedin.com/in/chiara-rapisarda/)
- **Erica Caruso** [GitHub](https://github.com/Ericaruso) | [LinkedIn](https://www.linkedin.com/in/erica-caruso-680883284/)
- **Giada Antioco** [GitHub](https://github.com/giadantioco) | [LinkedIn](https://www.linkedin.com/in/giada-antioco/)
- **Giulia Gabriele** [GitHub](https://github.com/Jiyuunn) | [LinkedIn](https://www.linkedin.com/in/giuliagabriele97/)
- **Nicola Marmugi** [GitHub](https://github.com/nmarmugi) | [LinkedIn](https://www.linkedin.com/in/nicola-marmugi-2860b022a/)
- **Simone Grillo** [GitHub](https://github.com/SimonJ933) | [LinkedIn](https://www.linkedin.com/in/simone-grillo/)
