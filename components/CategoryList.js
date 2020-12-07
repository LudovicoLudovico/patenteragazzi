import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const CategoryList = ({ category, setCategory }) => {
  return (
    <FormControl>
      <InputLabel htmlFor='age-native-simple'>Categoria</InputLabel>
      <Select
        native
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        inputProps={{
          name: 'Categoria',
          id: 'age-native-simple',
        }}
      >
        <option value={"Definizioni generali e doveri nell'uso dell strada"}>
          Definizioni generali e doveri nell'uso dell strada
        </option>
        <option value={'Segnali di pericolo'}>Segnali di pericolo</option>
        <option value={'Segnali di obbligo'}>Segnali di obbligo</option>
        <option value={'Segnali di divieto'}>Segnali di divieto</option>
        <option value={'Segnali di precedenza'}>Segnali di precedenza</option>
        <option value='Segnaletica orizzontale e segni sugli ostacoli'>
          Segnaletica orizzontale e segni sugli ostacoli
        </option>
        <option value='Segnalazioni semaforiche e degli agenti del traffico'>
          Segnalazioni semaforiche e degli agenti del traffico
        </option>
        <option value='Segnali di indicazione'>Segnali di indicazione</option>
        <option value='Segnali complementari, segnali temporanei e di cantiere'>
          Segnali complementari, segnali temporanei e di cantiere
        </option>
        <option value='Pannelli integrativi dei segnali'>
          Pannelli integrativi dei segnali
        </option>
        <option value='Limiti di velocità, pericolo e intralcio alla circolazione'>
          Limiti di velocità, pericolo e intralcio alla circolazione
        </option>
        <option value='Distanza di sicurezza'>Distanza di sicurezza</option>
        <option value='Norme sulla circolazione dei veicoli'>
          Norme sulla circolazione dei veicoli
        </option>
        <option value='Ordine di precedenza agli incroci'>
          Ordine di precedenza agli incroci
        </option>
        <option value='Norme sul sorpasso'>Norme sul sorpasso</option>
        <option value='Fermata, sosta, arresto'>Fermata, sosta, arresto</option>
        <option value='Norme varie'>Norme varie</option>
        <option value='Uso delle luci e dei dispositivi acustici, spie e simboli'>
          Uso delle luci e dei dispositivi acustici, spie e simboli
        </option>
        <option value='Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza'>
          Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza,
          sistemi di ritenuta per bambini, casco protettivo e abbigliamento di
          sicurezza
        </option>
        <option value='Patenti di guida, sistema sanzionatorio, documenti di circolazione, obblighi verso agenti'>
          Patenti di guida, sistema sanzionatorio, documenti di circolazione,
          obblighi verso agenti
        </option>
        <option value='Incidenti stradali e comportamenti in caso di incidente'>
          Incidenti stradali e comportamenti in caso di incidente
        </option>
        <option value='Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso'>
          Guida in relazione alle qualità e condizioni fisiche e psichiche,
          alcool, droga, farmaci e primo soccorso
        </option>
        <option value='Responsabilità civile, penale e amministrativa, assicurazione r.c.a. e altre forme assicurative legate al veicolo'>
          Responsabilità civile, penale e amministrativa, assicurazione R.C.A. e
          altre forme assicurative legate al veicolo
        </option>
        <option value="Limitazione dei consumi, rispetto dell'ambiente e inquinamento">
          Limitazione dei consumi, rispetto dell'ambiente e inquinamento
        </option>
        <option value='Elementi costitutivi del veicolo, manutenzione ed uso, stabilità e tenuta di strada, comportamenti e cautele di guida'>
          Elementi costitutivi del veicolo, manutenzione ed uso, stabilità e
          tenuta di strada, comportamenti e cautele di guida
        </option>
      </Select>
    </FormControl>
  );
};

export default CategoryList;
