import { FormControlLabel, Checkbox, Button } from '@material-ui/core';
import Image from 'next/image';

const ReportPopup = ({
  canReport,
  hasProblemImage,
  hasProblemAnswer,
  hasProblemQuestion,
  setProblem,
  setHasProblemImage,
  setHasProblemAnswer,
  setHasProblemQuestion,
}) => {
  return (
    <div
      className='report_popup'
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'white',
        padding: 20,
        width: '100%',
        height: '50%',
        maxWidth: 500,
        maxHeight: 300,
      }}
    >
      <h2>Segnale errore nella domanda:</h2>
      <FormControlLabel
        control={
          <Checkbox
            name='image'
            checked={hasProblemImage}
            onChange={() => {
              setHasProblemImage(!hasProblemImage);
            }}
          />
        }
        label='Immagine'
      />
      <FormControlLabel
        control={
          <Checkbox
            name='question'
            checked={hasProblemQuestion}
            onChange={() => {
              setHasProblemQuestion(!hasProblemQuestion);
            }}
          />
        }
        label='Domanda'
      />
      <FormControlLabel
        control={
          <Checkbox
            name='answer'
            checked={hasProblemAnswer}
            onChange={() => {
              setHasProblemAnswer(!hasProblemAnswer);
            }}
          />
        }
        label='Risposta'
      />

      <br />
      <br />

      <Button
        className={`quiz_problem active`}
        onClick={setProblem}
        disabled={!canReport}
        variant='contained'
        style={{
          background: 'red',
          color: 'white',
        }}
      >
        <p style={{ marginRight: 20 }}>Invia segnalazione</p>

        <Image src={'/danger.svg'} height={24} width={24} />
      </Button>
    </div>
  );
};

export default ReportPopup;
