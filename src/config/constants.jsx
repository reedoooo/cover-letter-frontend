/* eslint-disable import/no-anonymous-default-export */
import { Document, Page, pdfjs } from 'react-pdf';

const constants = {
  // Add your global constants here
  // API_URL: 'https://api.example.com',
  PDF_WORKER_SRC: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`,
  DEFAULT_LINKEDIN_URL:
    // eslint-disable-next-line max-len
    'https://www.linkedin.com/jobs/search/?currentJobId=3917250167&geoId=103644278&keywords=developer%20tcgplayer&location=United%20States&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true',
};

export default constants;
