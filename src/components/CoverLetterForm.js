import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css'; // include styles
import axios from 'axios';
import {
  Button,
  Box,
  Typography,
  Container,
  CircularProgress,
  TextField,
} from '@mui/material';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js'; // Import conversion functions

function CoverLetterForm() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  // State variables for user inputs
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [url, setURL] = useState('');
  const [yourName, setYourName] = useState('');
  const [address, setAddress] = useState('');
  const [cityStateZip, setCityStateZip] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [todayDate, setTodayDate] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyCityStateZip, setCompanyCityStateZip] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [reasons, setReasons] = useState('');
  const [previousPosition, setPreviousPosition] = useState('');
  const [previousCompany, setPreviousCompany] = useState('');
  const [softwarePrograms, setSoftwarePrograms] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('coverLetterDraft');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (
          parsedData &&
          parsedData.blocks &&
          parsedData.entityMap !== undefined
        ) {
          setEditorState(
            EditorState.createWithContent(convertFromRaw(parsedData)),
          );
        } else {
          console.error('Invalid draft content state:', parsedData);
          setEditorState(EditorState.createEmpty());
        }
      } catch (error) {
        console.error('Error parsing draft content state:', error);
        setEditorState(EditorState.createEmpty());
      }
    }
  }, []);

  useEffect(() => {
    // Save the current content to localStorage when editorState changes
    localStorage.setItem(
      'coverLetterDraft',
      JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    );
  }, [editorState]);

  const handleEditorChange = state => {
    setEditorState(state);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const content = convertToRaw(editorState.getCurrentContent());
      console.log(content);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/generate-cover-letter`, // Ensure REACT_APP_API_URL is correct
        {
          content: JSON.stringify(content),
          url,
          yourName,
          address,
          cityStateZip,
          emailAddress,
          todayDate,
          employerName,
          companyName,
          companyAddress,
          companyCityStateZip,
          jobTitle,
          previousPosition,
          previousCompany,
          skills,
          softwarePrograms,
          reasons,
        },
      );
      setCoverLetter(response.data.coverLetter);
    } catch (error) {
      console.error('Failed to generate cover letter:', error);
      setCoverLetter(
        'Failed to generate cover letter. Please try again later.',
      );
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="URL"
            variant="outlined"
            value={url}
            onChange={e => setURL(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            value={yourName}
            onChange={e => setYourName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Your Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={e => setAddress(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="City, State, ZIP"
            variant="outlined"
            fullWidth
            value={cityStateZip}
            onChange={e => setCityStateZip(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={emailAddress}
            onChange={e => setEmailAddress(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Today's Date"
            variant="outlined"
            fullWidth
            value={todayDate}
            onChange={e => setTodayDate(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Employer's Name"
            variant="outlined"
            fullWidth
            value={employerName}
            onChange={e => setEmployerName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Company Address"
            variant="outlined"
            fullWidth
            value={companyAddress}
            onChange={e => setCompanyAddress(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Company City, State, ZIP"
            variant="outlined"
            fullWidth
            value={companyCityStateZip}
            onChange={e => setCompanyCityStateZip(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Job Title"
            variant="outlined"
            fullWidth
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Previous Position"
            variant="outlined"
            fullWidth
            value={previousPosition}
            onChange={e => setPreviousPosition(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Previous Company"
            variant="outlined"
            fullWidth
            value={previousCompany}
            onChange={e => setPreviousCompany(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Skills"
            variant="outlined"
            fullWidth
            value={skills}
            onChange={e => setSkills(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Software/Programs"
            variant="outlined"
            fullWidth
            value={softwarePrograms}
            onChange={e => setSoftwarePrograms(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Reasons for Interest"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={reasons}
            onChange={e => setReasons(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Editor editorState={editorState} onChange={handleEditorChange} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            Generate Cover Letter
          </Button>
        </form>
        {loading ? (
          <CircularProgress />
        ) : (
          coverLetter && (
            <Box>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Your Custom Cover Letter
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {coverLetter}
              </Typography>
            </Box>
          )
        )}
      </Box>
    </Container>
  );
}

export default CoverLetterForm;
