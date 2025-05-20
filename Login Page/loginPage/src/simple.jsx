import { Typography, Box } from '@mui/material';

const Simple = () => {
  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      
      <Typography variant="body1" sx={{ mt: 2 }}>
        You successfully logged in.
      </Typography>
    </Box>
  );
};

export default Simple;
