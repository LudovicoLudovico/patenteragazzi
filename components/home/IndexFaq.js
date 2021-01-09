import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import MDEditor from '@uiw/react-md-editor';

const IndexFaq = ({ faq }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      fontFamily: 'Montserrat',
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: 'Montserrat',
      padding: 10,
    },
    item: {
      backgroundColor: '#011328',
      color: 'white',
      borderBottom: '4px solid  #00408b',
    },
    icon: {
      color: 'white',
    },
    text: {
      fontFamily: 'Montserrat',
    },
  }));

  const classes = useStyles();

  return (
    <div className='index_faq index_section'>
      <div className='container-full'>
        <div className='index_faq_top' id='faq'>
          <h2>FAQ</h2>
        </div>

        <div className={classes.root}>
          {faq.map((faqItem) => {
            return (
              <Accordion key={faqItem.id}>
                <AccordionSummary
                  className={classes.item}
                  expandIcon={<ExpandMoreIcon className={classes.icon} />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography className={classes.heading}>
                    {faqItem.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <MDEditor.Markdown
                    source={faqItem.answer}
                    className={classes.text}
                  />
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IndexFaq;
