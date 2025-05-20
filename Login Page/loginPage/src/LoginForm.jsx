import  { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, IconButton, styled, Card, CardContent } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
const Banner = styled(Box)`
  background-color: #d4b3f5;
  padding: 4.5rem 0;
  text-align: center;
  border-radius: 6px;
`;
const BannerText = styled(Typography)`
  color: #4b4082;
  font-weight: bold;
  font-size: 35px;
`;
const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 205px);
  background-color: #f4f6f8;
`;
const FormWrapper = styled(Box)`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled('img')`
  max-width: 200px;
  margin-bottom: 1.5rem;
`;
const StyledButton = styled(Button)`
  margin-top: 1.5rem;
  background-color: #4b0082;

  &:hover {
    background-color: #360062;
  }
`;
const FooterLink = styled('a')`
  margin-top: 1rem;
  transform: translateX(170px);
  display: block;
  color: #3f51b5;
  text-decoration: underline;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
`;
const StyledTypography = styled(Typography)`
  font-weight: 500;
  color: #4b0082;
  transform: translate(-170px);
`;
const ErrorText = styled(Typography)`
  color: #d32f2f;
  font-weight: 500;
  margin-top: 1rem;
  animation: fadeIn 0.5s ease-in-out;
`;
const LoaderContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  z-index: 9999;
`;
const Illusion = styled(Box)`
  background: linear-gradient(90deg, #6a1b9a, rgb(251, 0, 205));
  width: 150px;
  height: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  border-radius: 50%;
  animation: rotation 5s linear infinite;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 0 rgba(255, 0, 230, 0.8);
`;
const IllusionBefore = styled(Box)`
  background: linear-gradient(270deg, #6a1b9a, rgb(251, 0, 197));
  width: 130px;
  height: 130px;
  position: absolute;
  top: 10px;
  right: 0;
  border-radius: 50%;
`;
const IllusionAfter = styled(Box)`
  background: #fff;
  width: 110px;
  height: 110px;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 50%;
  box-shadow: 0 0 rgba(255, 0, 255, 0.7);
`;
const CenterImage = styled('img')`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90px;
  height: 90px;
  transform: translate(-50%, -50%);
  z-index: 2;
`;
const GlobalStyle = styled('style')`
  @keyframes rotation {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
const Loader = () => (
  <LoaderContainer>
    <Illusion>
      <IllusionBefore />
      <IllusionAfter />
    </Illusion>
    <CenterImage src="/bg.png" alt="Center Icon" />
  </LoaderContainer>
);
const AlertDialog = ({ onClose }) => {
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
          overflow: 'hidden',
          height: 185,
          textAlign: 'center',
          p: 3,
          fontFamily: '"Young Serif", serif',
          position: 'relative', 
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'black',
          }}
        >
        </IconButton>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ color: 'black', fontFamily: '"Young Serif", serif' }}
          >
            Alert !!
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 3, color: 'black', fontWeight: 500, fontFamily: '"Young Serif", serif' }}
          >
            You're on the Free Plan. Upgrade to the Premium Plan to unlock all tools and features.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#800080',
              borderRadius: '20px',
              px: 4,
              mt: 4,
              textTransform: 'none',
              fontFamily: '"Young Serif", serif',
              '&:hover': {
                backgroundColor: '#6a006a',
              },
            }}
            onClick={() => alert('Upgrade button clicked')}
          >
            Upgrade Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = (e) => {
  e.preventDefault();
  const correctEmail = 'test@bolt.co';
  const correctPassword = 'test@123';

  if (email === correctEmail && password === correctPassword) {
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowAlert(true); // Show alert without navigation
    }, 9000);
  } else {
    setErrorMessage('Invalid credentials. Please try again.');
  }
};

  if (isLoading) {
    return (
      <>
        <GlobalStyle />
        <Loader />
      </>
    );
  }
  if (showAlert) {
    return <AlertDialog open={showAlert} onClose={() => setShowAlert(false)} />;
  }
  return (
    <>
      <GlobalStyle />
      <Banner>
        <BannerText>A one-stop solution for Life Science Research</BannerText>
      </Banner>
      <Container>
        <FormWrapper component="form" onSubmit={handleSubmit}>
          <Logo src="/boltzmann_logo1.webp" alt="Company Logo" />
          <StyledTypography variant="h5">Login</StyledTypography>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          <TextField
            label="Email"
            placeholder="Email"
            fullWidth
            required
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            placeholder='Password'
            fullWidth
            required
            margin="normal"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <StyledButton type="submit" fullWidth variant="contained">
            Login
          </StyledButton>
          <hr style={{ width: '100%', marginTop: '2rem', borderTop: '1px solid #eee' }} />
          <FooterLink href="#">Contact Us</FooterLink>
        </FormWrapper>
      </Container>
    </>
  );
};
export default LoginForm;