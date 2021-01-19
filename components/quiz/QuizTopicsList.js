import React from 'react';
import TopicQuizSelec from './TopicQuizSelec';

const QuizTopicsList = ({ filters, setFilters }) => {
  return (
    <div className='topics-list'>
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={"Definizioni generali e doveri nell'uso della strada"}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Segnali di pericolo'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Segnali di divieto'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Segnali di obbligo'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Segnali di precedenza'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Segnaletica orizzontale e segni sugli ostacoli'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Segnalazioni semaforiche e degli agenti del traffico'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Segnali di indicazione'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Segnali complementari, segnali temporanei e di cantiere'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Pannelli integrativi dei segnali'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Limiti di velocità, pericolo e intralcio alla circolazione'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Distanza di sicurezza'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Norme sulla circolazione dei veicolio'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Esempi di precedenza (ordine di precedenza agli incroci)'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Fermata, sosta, arresto e partenza'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={
          'Norme varie (ingombro della carreggiata, circolazione su autostrade e strade extraurbane principali, trasporto di persone, pannelli sui veicoli, etc.)'
        }
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Uso delle luci e dei dispositivi acustici, spie e simboli'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={
          'Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza'
        }
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={
          'Patenti di guida, sistema sanzionatorio, documenti di circolazione, obblighi verso agenti, uso di lenti e altri apparecchi'
        }
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={'Incidenti stradali e comportamenti in caso di incidente'}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={
          'Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso'
        }
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={
          'Responsabilità civile, penale e amministrativa, assicurazione r.c.a. e altre forme assicurative legate al veicolo'
        }
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={"Limitazione dei consumi, rispetto dell'ambiente e inquinamento"}
      />
      <TopicQuizSelec
        filters={filters}
        setFilters={setFilters}
        text={
          'Elementi costitutivi del veicolo, manutenzione ed uso, stabilità e tenuta di strada, comportamenti e cautele di guida'
        }
      />
    </div>
  );
};

export default QuizTopicsList;
