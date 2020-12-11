import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import firebase from 'firebase';

import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function questions() {
  const [searchQuestionTitle, setSearchQuestionTitle] = useState('');
  const [searchQuestionsCategory, setSearchQuestionsCategory] = useState('');
  const [resultQuestions, setResultQuestions] = useState([]);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      width: 220,
    },
  }));
  const classes = useStyles();

  const searchQuestions = () => {
    if (searchQuestionTitle) {
      firebase
        .firestore()
        .collection('questions')
        .where('question', '==', searchQuestionTitle)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(function (doc) {
            setResultQuestions((resultQuestions) => [
              ...resultQuestions,
              {
                id: doc.id,
                data: doc.data(),
              },
            ]);
          });
        });
    }
  };

  return (
    <>
      <Head>
        <title>Admin Area - Domande</title>
        <link rel='shortcut icon' href='/patenteragazzi.ico' />
      </Head>
      <Navbar isAdminNav={true} />
      <div className='container admin-ui'>
        <h2>Cerca Domande Per Titolo</h2> <br />
        <TextField
          id='outlined-basic'
          label='Cerca domanda...'
          variant='outlined'
          value={searchQuestionTitle}
          onChange={(e) => setSearchQuestionTitle(e.target.value)}
        />
        <FormControl variant='filled' className={classes.formControl}>
          <InputLabel id='demo-simple-select-filled-label'>
            Categoria
          </InputLabel>
          <Select
            labelId='demo-simple-select-filled-label'
            id='demo-simple-select-filled'
            value={searchQuestionsCategory}
            onChange={(e) => setSearchQuestionsCategory(e.target.value)}
          >
            <MenuItem value=''>None</MenuItem>
            <MenuItem
              value={"Definizioni generali e doveri nell'uso dell strada"}
            >
              Definizioni generali e doveri nell'uso dell strada
            </MenuItem>
            <MenuItem value={'Segnali di pericolo'}>
              Segnali di pericolo
            </MenuItem>
            <MenuItem value={'Segnali di obbligo'}>Segnali di obbligo</MenuItem>
            <MenuItem value={'Segnali di divieto'}>Segnali di divieto</MenuItem>
            <MenuItem value={'Segnali di precedenza'}>
              Segnali di precedenza
            </MenuItem>
            <MenuItem value='Segnaletica orizzontale e segni sugli ostacoli'>
              Segnaletica orizzontale e segni sugli ostacoli
            </MenuItem>
            <MenuItem value='Segnalazioni semaforiche e degli agenti del traffico'>
              Segnalazioni semaforiche e degli agenti del traffico
            </MenuItem>
            <MenuItem value='Segnali di indicazione'>
              Segnali di indicazione
            </MenuItem>
            <MenuItem value='Segnali complementari, segnali temporanei e di cantiere'>
              Segnali complementari, segnali temporanei e di cantiere
            </MenuItem>
            <MenuItem value='Pannelli integrativi dei segnali'>
              Pannelli integrativi dei segnali
            </MenuItem>
            <MenuItem value='Limiti di velocità, pericolo e intralcio alla circolazione'>
              Limiti di velocità, pericolo e intralcio alla circolazione
            </MenuItem>
            <MenuItem value='Distanza di sicurezza'>
              Distanza di sicurezza
            </MenuItem>
            <MenuItem value='Norme sulla circolazione dei veicoli'>
              Norme sulla circolazione dei veicoli
            </MenuItem>
            <MenuItem value='Ordine di precedenza agli incroci'>
              Ordine di precedenza agli incroci
            </MenuItem>
            <MenuItem value='Norme sul sorpasso'>Norme sul sorpasso</MenuItem>
            <MenuItem value='Fermata, sosta, arresto'>
              Fermata, sosta, arresto
            </MenuItem>
            <MenuItem value='Norme varie'>Norme varie</MenuItem>
            <MenuItem value='Uso delle luci e dei dispositivi acustici, spie e simboli'>
              Uso delle luci e dei dispositivi acustici, spie e simboli
            </MenuItem>
            <MenuItem value='Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza'>
              Dispositivi di equipaggiamento, funzione ed uso: cinture di
              sicurezza, sistemi di ritenuta per bambini, casco protettivo e
              abbigliamento di sicurezza
            </MenuItem>
            <MenuItem value='Patenti di guida, sistema sanzionatorio, documenti di circolazione, obblighi verso agenti'>
              Patenti di guida, sistema sanzionatorio, documenti di
              circolazione, obblighi verso agenti
            </MenuItem>
            <MenuItem value='Incidenti stradali e comportamenti in caso di incidente'>
              Incidenti stradali e comportamenti in caso di incidente
            </MenuItem>
            <MenuItem value='Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso'>
              Guida in relazione alle qualità e condizioni fisiche e psichiche,
              alcool, droga, farmaci e primo soccorso
            </MenuItem>
            <MenuItem value='Responsabilità civile, penale e amministrativa, assicurazione r.c.a. e altre forme assicurative legate al veicolo'>
              Responsabilità civile, penale e amministrativa, assicurazione
              R.C.A. e altre forme assicurative legate al veicolo
            </MenuItem>
            <MenuItem value="Limitazione dei consumi, rispetto dell'ambiente e inquinamento">
              Limitazione dei consumi, rispetto dell'ambiente e inquinamento
            </MenuItem>
            <MenuItem value='Elementi costitutivi del veicolo, manutenzione ed uso, stabilità e tenuta di strada, comportamenti e cautele di guida'>
              Elementi costitutivi del veicolo, manutenzione ed uso, stabilità e
              tenuta di strada, comportamenti e cautele di guida
            </MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button variant='contained' onClick={searchQuestions}>
          Cerca
        </Button>
      </div>
    </>
  );
}

export default questions;
