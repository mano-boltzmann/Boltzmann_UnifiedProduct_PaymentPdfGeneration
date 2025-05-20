import {
  Box,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import { useEffect } from 'react';

const SessionDialog = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Young+Serif&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f9f9f9"
      sx={{ fontFamily: '"Young Serif", serif' }}
    >
      <Card
        variant="outlined"
        sx={{
          border: '1px solid #ccc',
          borderRadius: '12px',
          textAlign: 'center',
          p: 3,
          fontFamily: '"Young Serif", serif',
        }}
      >
        <CardContent>
          <img
            src="/boltzmann_logo.png"
            alt="Boltzmann Logo"
            style={{ width: '270px', marginBottom: '1rem' }}
          />
          <Typography
            variant="h6"
            
            sx={{ color: 'black', fontFamily: '"Young Serif", serif' }}
          >
            Session Expired, Redirecting you to the login screen.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SessionDialog;
