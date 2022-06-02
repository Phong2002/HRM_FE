import { useEffect,useState } from "react";
import axios from "axios";
import { baseUrl } from "./Url";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function Notify(){
    const [data,setData] = useState([])

    async function fetchData() {
        try {
          axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}` ; 
          const result = await axios.get(baseUrl+"notifications/user/"+localStorage.getItem('ID'))
           setData(result.data)
        } catch (error) {
          console.error(error);
        }
    }

    
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


    useEffect(()=>fetchData(),[]);


  return (
    <div>

    {data.map(data=><>
      <Accordion expanded={expanded === 'panel'+data.notifyId} onChange={handleChange('panel'+data.notifyId)} key={data.notifyId}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${data.notifyId}bh-content`}
          id={`panel${data.notifyId}bh-header`}
        
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {data.sentdate}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{data.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           {data.content}
          </Typography>
        </AccordionDetails>
      </Accordion>
    
    </>)}
    </div>
  );
}


export default Notify